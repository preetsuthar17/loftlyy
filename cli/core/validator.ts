import { normalizeHex } from "@/cli/core/filters"
import type { Brand } from "@/cli/core/contracts"

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string")

const hasValidColor = (value: unknown): boolean => {
  if (!isRecord(value)) {
    return false
  }

  if (!isNonEmptyString(value.name) || !isNonEmptyString(value.hex)) {
    return false
  }

  return normalizeHex(value.hex) !== null
}

const hasValidTypography = (value: unknown): boolean => {
  if (!isRecord(value)) {
    return false
  }

  return isNonEmptyString(value.name) && isNonEmptyString(value.role)
}

const hasValidAsset = (value: unknown): boolean => {
  if (!isRecord(value)) {
    return false
  }

  const widthIsValid =
    typeof value.width === "number" &&
    Number.isFinite(value.width) &&
    value.width > 0
  const heightIsValid =
    typeof value.height === "number" &&
    Number.isFinite(value.height) &&
    value.height > 0

  return (
    isNonEmptyString(value.label) &&
    isNonEmptyString(value.src) &&
    widthIsValid &&
    heightIsValid &&
    isNonEmptyString(value.format)
  )
}

const collectRequiredFieldErrors = (
  value: Record<string, unknown>
): string[] => {
  const errors: string[] = []

  if (!isNonEmptyString(value.slug)) {
    errors.push("Missing string field: slug")
  }

  if (!isNonEmptyString(value.name)) {
    errors.push("Missing string field: name")
  }

  if (!isNonEmptyString(value.description)) {
    errors.push("Missing string field: description")
  }

  if (!isNonEmptyString(value.industry)) {
    errors.push("Missing string field: industry")
  }

  if (!isStringArray(value.categories)) {
    errors.push("Missing array field: categories")
  }

  if (!isNonEmptyString(value.dateAdded)) {
    errors.push("Missing string field: dateAdded")
  }

  return errors
}

const collectTypedArrayErrors = (value: Record<string, unknown>): string[] => {
  const errors: string[] = []

  if (!Array.isArray(value.colors) || value.colors.length === 0) {
    errors.push("Missing array field: colors")
  } else if (!value.colors.every(hasValidColor)) {
    errors.push("Invalid color entry (requires name + valid hex)")
  }

  if (!Array.isArray(value.typography) || value.typography.length === 0) {
    errors.push("Missing array field: typography")
  } else if (!value.typography.every(hasValidTypography)) {
    errors.push("Invalid typography entry (requires name + role)")
  }

  if (!Array.isArray(value.assets) || value.assets.length === 0) {
    errors.push("Missing array field: assets")
  } else if (!value.assets.every(hasValidAsset)) {
    errors.push("Invalid asset entry (requires label/src/width/height/format)")
  }

  if (!hasValidAsset(value.thumbnail)) {
    errors.push("Invalid thumbnail entry")
  }

  return errors
}

export const isBrandLike = (value: unknown): value is Brand => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isNonEmptyString(value.slug) &&
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.description) &&
    isNonEmptyString(value.industry) &&
    isStringArray(value.categories) &&
    Array.isArray(value.colors) &&
    value.colors.every(hasValidColor) &&
    Array.isArray(value.typography) &&
    value.typography.every(hasValidTypography) &&
    Array.isArray(value.assets) &&
    value.assets.every(hasValidAsset) &&
    hasValidAsset(value.thumbnail) &&
    isNonEmptyString(value.dateAdded)
  )
}

export const getBrandValidationErrors = (value: unknown): string[] => {
  if (!isRecord(value)) {
    return ["Brand export is not an object"]
  }

  return [
    ...collectRequiredFieldErrors(value),
    ...collectTypedArrayErrors(value),
  ]
}
