import { readdir } from "node:fs/promises"
import { join, relative } from "node:path"
import { pathToFileURL } from "node:url"
import type { Brand, LoadedBrands, LoaderOptions } from "@/cli/core/contracts"
import { CliError, EXIT_CODE } from "@/cli/core/errors"
import { buildSidebarBrand } from "@/cli/core/search-index"
import { getBrandValidationErrors, isBrandLike } from "@/cli/core/validator"

interface ResolvedBrandExport {
  brand: Brand | null
  warning?: string
}

const resolveBrandExport = (
  moduleExports: Record<string, unknown>,
  fileRelativePath: string
): ResolvedBrandExport => {
  const exportedValues = Object.entries(moduleExports)
  const brandEntries = exportedValues.filter(([, value]) => isBrandLike(value))

  if (brandEntries.length === 0) {
    return {
      brand: null,
      warning: `${fileRelativePath}: no valid Brand export found`,
    }
  }

  if (brandEntries.length > 1) {
    return {
      brand: brandEntries[0][1] as Brand,
      warning: `${fileRelativePath}: multiple Brand exports found, using "${brandEntries[0][0]}"`,
    }
  }

  return { brand: brandEntries[0][1] as Brand }
}

const discoverBrandFiles = async (rootDir: string): Promise<string[]> => {
  const brandsDir = join(rootDir, "data", "brands")
  const entries = await readdir(brandsDir, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith(".ts") && name !== "index.ts")
    .toSorted((a, b) => a.localeCompare(b))
    .map((name) => join(brandsDir, name))
}

interface RemoteApiBrandData {
  brands: Brand[]
}

interface ErrorWithCode {
  code?: unknown
}

const withBuiltSearchIndex = (brands: Brand[]): LoadedBrands => {
  const sortedBrands = brands.toSorted((a, b) => a.name.localeCompare(b.name))
  return {
    brands: sortedBrands,
    sidebarBrands: sortedBrands.map(buildSidebarBrand),
    warnings: [],
  }
}

const parseRemoteBaseUrl = (input?: string): string => {
  if (!input || input.trim().length === 0) {
    return "https://loftlyy.com"
  }

  const normalized = input.trim().replace(/\/+$/, "")
  try {
    const url = new URL(normalized)
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("unsupported protocol")
    }

    return normalized
  } catch {
    throw new CliError(
      `Invalid base URL "${input}". Use an absolute URL like https://loftlyy.com`,
      EXIT_CODE.ARGUMENT_ERROR
    )
  }
}

const loadRemoteBrands = async (
  baseUrlInput?: string
): Promise<LoadedBrands> => {
  const baseUrl = parseRemoteBaseUrl(baseUrlInput)
  const endpoint = `${baseUrl}/api/cli`

  let response: Response
  try {
    response = await fetch(endpoint, {
      headers: {
        accept: "application/json",
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "network failure"
    throw new CliError(
      `Failed to fetch ${endpoint} (${message})`,
      EXIT_CODE.RUNTIME_ERROR
    )
  }

  if (!response.ok) {
    throw new CliError(
      `Remote API ${endpoint} returned ${response.status} ${response.statusText}`,
      EXIT_CODE.RUNTIME_ERROR
    )
  }

  let json: unknown
  try {
    json = (await response.json()) as unknown
  } catch {
    throw new CliError(
      `Remote API ${endpoint} returned invalid JSON`,
      EXIT_CODE.RUNTIME_ERROR
    )
  }

  const record = json as Partial<RemoteApiBrandData>
  if (!record || !Array.isArray(record.brands)) {
    throw new CliError(
      `Remote API ${endpoint} response is missing a brands array`,
      EXIT_CODE.RUNTIME_ERROR
    )
  }

  const warnings: string[] = []
  const validBrands: Brand[] = []

  for (const entry of record.brands) {
    if (!isBrandLike(entry)) {
      const errors = getBrandValidationErrors(entry)
      const warning = `Remote brand entry rejected: ${errors.join("; ")}`
      warnings.push(warning)
      continue
    }

    validBrands.push(entry)
  }

  if (warnings.length > 0) {
    return {
      ...withBuiltSearchIndex(validBrands),
      warnings,
    }
  }

  return withBuiltSearchIndex(validBrands)
}

const isUnsupportedTsImportError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false
  }

  if (error.message.includes('Unknown file extension ".ts"')) {
    return true
  }

  const errorWithCode = error as ErrorWithCode
  return errorWithCode.code === "ERR_UNKNOWN_FILE_EXTENSION"
}

export const loadBrands = async (
  options: LoaderOptions
): Promise<LoadedBrands> => {
  if (options.source === "remote") {
    return loadRemoteBrands(options.baseUrl)
  }

  const rootDir = options.rootDir ?? process.cwd()
  const files = await discoverBrandFiles(rootDir)

  const brands: Brand[] = []
  const slugToFile = new Map<string, string>()
  const warnings: string[] = []

  for (const filePath of files) {
    const fileRelativePath = relative(rootDir, filePath)

    let importedModule: Record<string, unknown>
    try {
      importedModule = (await import(pathToFileURL(filePath).href)) as Record<
        string,
        unknown
      >
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown import failure"

      if (isUnsupportedTsImportError(error) && !options.strict) {
        try {
          const fallbackData = await loadRemoteBrands(options.baseUrl)
          return {
            ...fallbackData,
            warnings: [
              ...warnings,
              "Local TypeScript brand files cannot be imported in this runtime; using remote API data instead.",
              ...fallbackData.warnings,
            ],
          }
        } catch (fallbackError) {
          const fallbackMessage =
            fallbackError instanceof Error
              ? fallbackError.message
              : "Unknown remote fallback failure"
          warnings.push(
            `Local TypeScript brand files cannot be imported in this runtime and remote fallback failed (${fallbackMessage}).`
          )

          return {
            ...withBuiltSearchIndex(brands),
            warnings,
          }
        }
      }

      const warning = `${fileRelativePath}: failed to import (${message})`
      if (options.strict) {
        throw new CliError(warning, EXIT_CODE.DATA_FAILURE)
      }

      warnings.push(warning)
      continue
    }

    const { brand, warning } = resolveBrandExport(
      importedModule,
      fileRelativePath
    )
    if (warning) {
      warnings.push(warning)
    }

    if (!brand) {
      if (options.strict) {
        throw new CliError(
          `${fileRelativePath}: strict mode requires a valid Brand export`,
          EXIT_CODE.DATA_FAILURE
        )
      }

      continue
    }

    const validationErrors = getBrandValidationErrors(brand)
    if (validationErrors.length > 0) {
      const details = validationErrors.join("; ")
      const errorMessage = `${fileRelativePath}: ${details}`
      if (options.strict) {
        throw new CliError(errorMessage, EXIT_CODE.DATA_FAILURE)
      }

      warnings.push(errorMessage)
      continue
    }

    const duplicateSource = slugToFile.get(brand.slug)
    if (duplicateSource) {
      const duplicateMessage = `${fileRelativePath}: duplicate slug "${brand.slug}" (already loaded from ${duplicateSource})`
      if (options.strict) {
        throw new CliError(duplicateMessage, EXIT_CODE.DATA_FAILURE)
      }

      warnings.push(duplicateMessage)
      continue
    }

    slugToFile.set(brand.slug, fileRelativePath)
    brands.push(brand)
  }

  const sortedBrands = brands.toSorted((a, b) => a.name.localeCompare(b.name))

  return {
    brands: sortedBrands,
    sidebarBrands: sortedBrands.map(buildSidebarBrand),
    warnings,
  }
}
