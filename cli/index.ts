#!/usr/bin/env node

import { Command, InvalidArgumentError } from "commander"
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { registerBrandsCommand } from "@/cli/commands/brands"
import type { OutputMode } from "@/cli/core/contracts"
import { CliError, EXIT_CODE } from "@/cli/core/errors"
import { writeStderr } from "@/cli/core/stdio"

const getCliVersion = async (): Promise<string> => {
  const cliPackageName = "@loftlyy/cli"
  const cliDir = dirname(fileURLToPath(import.meta.url))

  const readVersion = async (
    packageJsonPath: string
  ): Promise<string | null> => {
    try {
      const raw = await readFile(packageJsonPath, "utf8")
      const parsed = JSON.parse(raw) as { name?: unknown; version?: unknown }

      if (parsed.name !== cliPackageName) {
        return null
      }

      if (typeof parsed.version === "string" && parsed.version.length > 0) {
        return parsed.version
      }
    } catch {
      // try next candidate
    }

    return null
  }

  const candidates = [
    join(cliDir, "package.json"),
    join(cliDir, "..", "package.json"),
    join(process.cwd(), "package.json"),
  ]

  for (const packageJsonPath of candidates) {
    const version = await readVersion(packageJsonPath)
    if (version) {
      return version
    }
  }

  return "0.1.0"
}

const parseOutputMode = (value: string): OutputMode => {
  if (value === "table" || value === "json" || value === "ndjson") {
    return value
  }

  throw new InvalidArgumentError(
    `Invalid output mode "${value}". Use table, json, or ndjson.`
  )
}

const detectDefaultSource = (): "local" | "remote" => {
  const localBrandsDir = join(process.cwd(), "data", "brands")
  return existsSync(localBrandsDir) ? "local" : "remote"
}

const main = async () => {
  const version = await getCliVersion()
  const defaultSource = detectDefaultSource()
  const program = new Command()

  program
    .name("loftlyy")
    .description("Loftlyy brand data CLI")
    .version(version)
    .showHelpAfterError()
    .option(
      "--source <source>",
      "Data source: local | remote",
      (value: string) => {
        if (value === "local" || value === "remote") {
          return value
        }

        throw new InvalidArgumentError(
          `Invalid source "${value}". Use local or remote.`
        )
      },
      defaultSource
    )
    .option(
      "--base-url <url>",
      "Optional remote API base URL override, e.g. https://loftlyy.com"
    )
    .option(
      "-o, --output <mode>",
      "Output mode: table | json | ndjson",
      parseOutputMode
    )
    .option("--strict", "Fail fast on invalid brand files")
    .option("--no-color", "Disable colorized output")

  registerBrandsCommand(program)

  program.configureOutput({
    outputError: (text) => writeStderr(text),
  })

  try {
    await program.parseAsync(process.argv)
  } catch (error) {
    if (error instanceof CliError) {
      writeStderr(error.message)
      process.exit(error.exitCode)
    }

    if (error instanceof Error) {
      writeStderr(error.message)
    } else {
      writeStderr("Unexpected CLI failure")
    }

    process.exit(EXIT_CODE.RUNTIME_ERROR)
  }
}

await main()
