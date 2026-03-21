#!/usr/bin/env node

// index.ts
import { Command, InvalidArgumentError as InvalidArgumentError2 } from "commander";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { dirname, join as join2 } from "path";
import { fileURLToPath } from "url";

// commands/brands.ts
import { InvalidArgumentError } from "commander";
import ora from "ora";
import pc2 from "picocolors";

// core/formatters.ts
import Table from "cli-table3";
import pc from "picocolors";
var truncate = (value, maxLength) => {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}...`;
};
var withColor = (context, style, text) => context.colorEnabled ? style(text) : text;
var summarizeBrand = (brand) => ({
  categories: brand.categories,
  colorCount: brand.colors.length,
  industry: brand.industry,
  name: brand.name,
  slug: brand.slug,
  tags: brand.tags ?? [],
  typographyCount: brand.typography.length
});
var renderJson = (value) => `${JSON.stringify(value, null, 2)}
`;
var renderNdjson = (value) => {
  if (Array.isArray(value)) {
    return `${value.map((entry) => JSON.stringify(entry)).join("\n")}
`;
  }
  return `${JSON.stringify(value)}
`;
};
var renderBrandListTable = (brands, context) => {
  if (brands.length === 0) {
    return `${withColor(context, pc.yellow, "No brands found.")}
`;
  }
  const table = new Table({
    head: ["Slug", "Name", "Industry", "Categories", "Tags", "Colors", "Type"],
    style: { head: [] },
    wordWrap: true
  });
  for (const summary of brands.map(summarizeBrand)) {
    table.push([
      summary.slug,
      summary.name,
      summary.industry,
      truncate(summary.categories.join(", "), 28),
      truncate(summary.tags.join(", "), 24),
      String(summary.colorCount),
      String(summary.typographyCount)
    ]);
  }
  const caption = withColor(
    context,
    pc.dim,
    `${brands.length} brand${brands.length === 1 ? "" : "s"}`
  );
  return `${table.toString()}
${caption}
`;
};
var renderBrandDetailTable = (brand, context) => {
  const details = new Table({
    colWidths: [22, 90],
    style: { head: [] },
    wordWrap: true
  });
  details.push(
    ["Slug", brand.slug],
    ["Name", brand.name],
    ["Industry", brand.industry],
    ["Categories", brand.categories.join(", ")],
    ["Tags", (brand.tags ?? []).join(", ")],
    ["Website", brand.url ?? "-"],
    ["Date added", brand.dateAdded],
    ["Founded", brand.founded ? String(brand.founded) : "-"],
    ["Headquarters", brand.headquarters ?? "-"],
    ["Description", brand.description]
  );
  const colors = new Table({
    head: ["Color", "Hex", "Usage"],
    style: { head: [] },
    wordWrap: true
  });
  for (const color of brand.colors) {
    colors.push([color.name, color.hex, color.usage ?? "-"]);
  }
  const typography = new Table({
    head: ["Font", "Role", "Category", "Weights"],
    style: { head: [] },
    wordWrap: true
  });
  for (const font of brand.typography) {
    typography.push([
      font.name,
      font.role,
      font.category ?? "-",
      (font.weights ?? []).join(", ") || "-"
    ]);
  }
  const title = withColor(context, pc.bold, `${brand.name} (${brand.slug})`);
  return `${title}
${details.toString()}

${withColor(context, pc.bold, "Colors")}
${colors.toString()}

${withColor(context, pc.bold, "Typography")}
${typography.toString()}
`;
};
var renderPaletteTable = (slug, palette, context) => {
  if (palette.length === 0) {
    return `${withColor(context, pc.yellow, `No colors found for "${slug}".`)}
`;
  }
  const table = new Table({
    head: ["Name", "Hex", "Usage"],
    style: { head: [] },
    wordWrap: true
  });
  for (const entry of palette) {
    table.push([entry.name, entry.hex, entry.usage ?? "-"]);
  }
  return `${table.toString()}
`;
};
var renderFacetsTable = (facets, context) => {
  const table = new Table({
    head: ["Facet", "Values"],
    style: { head: [] },
    wordWrap: true
  });
  table.push(
    ["industries", facets.industries.join(", ")],
    ["tags", facets.tags.join(", ")],
    ["colorFamilies", facets.colorFamilies.join(", ")],
    ["typographyStyles", facets.typographyStyles.join(", ")]
  );
  const caption = withColor(
    context,
    pc.dim,
    "Values are derived from loaded brands"
  );
  return `${table.toString()}
${caption}
`;
};
var renderSimilarBrandsTable = (sourceSlug, brands, context) => {
  if (brands.length === 0) {
    return `${withColor(context, pc.yellow, `No similar brands found for "${sourceSlug}".`)}
`;
  }
  const table = new Table({
    head: ["Rank", "Slug", "Name", "Industry", "Categories"],
    style: { head: [] },
    wordWrap: true
  });
  for (const [index, brand] of brands.entries()) {
    table.push([
      String(index + 1),
      brand.slug,
      brand.name,
      brand.industry,
      truncate(brand.categories.join(", "), 36)
    ]);
  }
  return `${table.toString()}
`;
};

// core/loader.ts
import { readdir } from "fs/promises";
import { join, relative } from "path";
import { pathToFileURL } from "url";

// core/errors.ts
var EXIT_CODE = {
  ARGUMENT_ERROR: 2,
  DATA_FAILURE: 1,
  RUNTIME_ERROR: 3
};
var CliError = class extends Error {
  constructor(message, exitCode) {
    super(message);
    this.name = "CliError";
    this.exitCode = exitCode;
  }
};

// core/filters.ts
var emptyFilters = {
  colorFamilies: [],
  industries: [],
  query: "",
  tags: [],
  typographyStyles: []
};
var HEX_TOKEN_RE = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;
var WHITESPACE_RE = /\s+/g;
var normalizeText = (value) => value.trim().toLowerCase().replace(WHITESPACE_RE, " ");
var normalizeHex = (input) => {
  const match = input.trim().match(HEX_TOKEN_RE);
  if (!match) {
    return null;
  }
  const value = match[1].toUpperCase();
  if (value.length === 3) {
    return `#${[...value].map((char) => char.repeat(2)).join("")}`;
  }
  return `#${value}`;
};
var matchesQuery = (brand, query) => {
  const tokens = normalizeText(query).split(" ").filter(Boolean);
  if (tokens.length === 0) {
    return true;
  }
  return tokens.every((token) => {
    const normalizedHex = normalizeHex(token);
    if (normalizedHex) {
      return brand.searchIndex.hexes.includes(normalizedHex);
    }
    return brand.searchIndex.text.includes(token);
  });
};
var hexToColorFamily = (hex) => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const delta = Math.max(r, g, b) - Math.min(r, g, b);
  const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness / 255 - 1)) / 255;
  if (saturation < 0.15 || delta < 30) {
    return "neutral";
  }
  let hue = 0;
  if (delta !== 0) {
    const max = Math.max(r, g, b);
    if (max === r) {
      hue = 60 * ((g - b) / delta % 6);
    } else if (max === g) {
      hue = 60 * ((b - r) / delta + 2);
    } else {
      hue = 60 * ((r - g) / delta + 4);
    }
  }
  if (hue < 0) {
    hue += 360;
  }
  if (hue < 15 || hue >= 345) {
    return "red";
  }
  if (hue < 45) {
    return "orange";
  }
  if (hue < 70) {
    return "yellow";
  }
  if (hue < 170) {
    return "green";
  }
  if (hue < 260) {
    return "blue";
  }
  if (hue < 300) {
    return "purple";
  }
  return "pink";
};
var getBrandColorFamilies = (brand) => [
  ...new Set(brand.colors.map((color) => hexToColorFamily(color.hex)))
];
var getAvailableFilters = (brands) => {
  const colorFamilies = /* @__PURE__ */ new Set();
  const industries = /* @__PURE__ */ new Set();
  const tags = /* @__PURE__ */ new Set();
  const typographyStyles = /* @__PURE__ */ new Set();
  for (const brand of brands) {
    industries.add(brand.industry);
    for (const tag of brand.tags ?? []) {
      tags.add(tag);
    }
    for (const color of brand.colors) {
      colorFamilies.add(hexToColorFamily(color.hex));
    }
    for (const typo of brand.typography) {
      if (typo.category) {
        typographyStyles.add(typo.category);
      }
    }
  }
  return {
    colorFamilies: [...colorFamilies].toSorted(),
    industries: [...industries].toSorted(),
    tags: [...tags].toSorted(),
    typographyStyles: [...typographyStyles].toSorted()
  };
};
var filterBrands = (brands, filters) => brands.filter((brand) => {
  if (filters.query && !matchesQuery(brand, filters.query)) {
    return false;
  }
  if (filters.industries.length > 0 && !filters.industries.includes(brand.industry)) {
    return false;
  }
  if (filters.tags.length > 0 && !filters.tags.some((tag) => brand.tags?.includes(tag))) {
    return false;
  }
  if (filters.colorFamilies.length > 0) {
    const brandFamilies = getBrandColorFamilies(brand);
    if (!filters.colorFamilies.some((family) => brandFamilies.includes(family))) {
      return false;
    }
  }
  if (filters.typographyStyles.length > 0) {
    const brandStyles = brand.typography.map((entry) => entry.category).filter(Boolean);
    if (!filters.typographyStyles.some((style) => brandStyles.includes(style))) {
      return false;
    }
  }
  return true;
});
var getSimilarBrands = (current, allBrands, limit = 5) => {
  const currentColorFamilies = getBrandColorFamilies(current);
  const currentTypoCategories = current.typography.map((entry) => entry.category).filter(Boolean);
  const scored = allBrands.filter((brand) => brand.slug !== current.slug).map((brand) => {
    let score = 0;
    const sharedCategories = brand.categories.filter(
      (category) => current.categories.includes(category)
    );
    score += sharedCategories.length * 3;
    if (brand.industry === current.industry) {
      score += 1;
    }
    const sharedTags = (brand.tags ?? []).filter(
      (tag) => current.tags?.includes(tag)
    );
    score += sharedTags.length * 2;
    const brandFamilies = getBrandColorFamilies(brand);
    const sharedColors = brandFamilies.filter(
      (family) => currentColorFamilies.includes(family)
    );
    score += sharedColors.length * 2;
    const brandTypoCategories = brand.typography.map((entry) => entry.category).filter(Boolean);
    const sharedTypography = brandTypoCategories.filter(
      (category) => currentTypoCategories.includes(category)
    );
    score += sharedTypography.length;
    return { brand, score };
  }).filter((entry) => entry.score > 0).toSorted(
    (a, b) => b.score - a.score || a.brand.name.localeCompare(b.brand.name)
  ).slice(0, limit);
  return scored.map((entry) => entry.brand);
};

// core/search-index.ts
var WHITESPACE_RE2 = /\s+/g;
var normalizeSearchText = (values) => values.filter(Boolean).join(" ").trim().toLowerCase().replace(WHITESPACE_RE2, " ");
var buildSidebarBrand = (brand) => ({
  categories: brand.categories,
  colors: brand.colors.map((color) => ({ hex: color.hex })),
  description: brand.description,
  industry: brand.industry,
  name: brand.name,
  searchIndex: {
    hexes: brand.colors.map((color) => normalizeHex(color.hex)).filter((color) => color !== null),
    text: normalizeSearchText([
      brand.name,
      brand.description,
      brand.industry,
      ...brand.categories,
      ...brand.tags ?? [],
      ...brand.colors.map((color) => color.name),
      ...brand.typography.flatMap((font) => [font.name, font.category])
    ])
  },
  slug: brand.slug,
  tags: brand.tags,
  thumbnail: {
    height: brand.thumbnail.height,
    label: brand.thumbnail.label,
    src: brand.thumbnail.src,
    width: brand.thumbnail.width
  },
  thumbnailDark: brand.thumbnailDark ? {
    height: brand.thumbnailDark.height,
    src: brand.thumbnailDark.src,
    width: brand.thumbnailDark.width
  } : void 0,
  typography: brand.typography.map((font) => ({
    category: font.category,
    name: font.name
  }))
});

// core/validator.ts
var isRecord = (value) => typeof value === "object" && value !== null;
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var isStringArray = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
var hasValidColor = (value) => {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyString(value.name) || !isNonEmptyString(value.hex)) {
    return false;
  }
  return normalizeHex(value.hex) !== null;
};
var hasValidTypography = (value) => {
  if (!isRecord(value)) {
    return false;
  }
  return isNonEmptyString(value.name) && isNonEmptyString(value.role);
};
var hasValidAsset = (value) => {
  if (!isRecord(value)) {
    return false;
  }
  const widthIsValid = typeof value.width === "number" && Number.isFinite(value.width) && value.width > 0;
  const heightIsValid = typeof value.height === "number" && Number.isFinite(value.height) && value.height > 0;
  return isNonEmptyString(value.label) && isNonEmptyString(value.src) && widthIsValid && heightIsValid && isNonEmptyString(value.format);
};
var collectRequiredFieldErrors = (value) => {
  const errors = [];
  if (!isNonEmptyString(value.slug)) {
    errors.push("Missing string field: slug");
  }
  if (!isNonEmptyString(value.name)) {
    errors.push("Missing string field: name");
  }
  if (!isNonEmptyString(value.description)) {
    errors.push("Missing string field: description");
  }
  if (!isNonEmptyString(value.industry)) {
    errors.push("Missing string field: industry");
  }
  if (!isStringArray(value.categories)) {
    errors.push("Missing array field: categories");
  }
  if (!isNonEmptyString(value.dateAdded)) {
    errors.push("Missing string field: dateAdded");
  }
  return errors;
};
var collectTypedArrayErrors = (value) => {
  const errors = [];
  if (!Array.isArray(value.colors) || value.colors.length === 0) {
    errors.push("Missing array field: colors");
  } else if (!value.colors.every(hasValidColor)) {
    errors.push("Invalid color entry (requires name + valid hex)");
  }
  if (!Array.isArray(value.typography) || value.typography.length === 0) {
    errors.push("Missing array field: typography");
  } else if (!value.typography.every(hasValidTypography)) {
    errors.push("Invalid typography entry (requires name + role)");
  }
  if (!Array.isArray(value.assets) || value.assets.length === 0) {
    errors.push("Missing array field: assets");
  } else if (!value.assets.every(hasValidAsset)) {
    errors.push("Invalid asset entry (requires label/src/width/height/format)");
  }
  if (!hasValidAsset(value.thumbnail)) {
    errors.push("Invalid thumbnail entry");
  }
  return errors;
};
var isBrandLike = (value) => {
  if (!isRecord(value)) {
    return false;
  }
  return isNonEmptyString(value.slug) && isNonEmptyString(value.name) && isNonEmptyString(value.description) && isNonEmptyString(value.industry) && isStringArray(value.categories) && Array.isArray(value.colors) && value.colors.every(hasValidColor) && Array.isArray(value.typography) && value.typography.every(hasValidTypography) && Array.isArray(value.assets) && value.assets.every(hasValidAsset) && hasValidAsset(value.thumbnail) && isNonEmptyString(value.dateAdded);
};
var getBrandValidationErrors = (value) => {
  if (!isRecord(value)) {
    return ["Brand export is not an object"];
  }
  return [
    ...collectRequiredFieldErrors(value),
    ...collectTypedArrayErrors(value)
  ];
};

// core/loader.ts
var resolveBrandExport = (moduleExports, fileRelativePath) => {
  const exportedValues = Object.entries(moduleExports);
  const brandEntries = exportedValues.filter(([, value]) => isBrandLike(value));
  if (brandEntries.length === 0) {
    return {
      brand: null,
      warning: `${fileRelativePath}: no valid Brand export found`
    };
  }
  if (brandEntries.length > 1) {
    return {
      brand: brandEntries[0][1],
      warning: `${fileRelativePath}: multiple Brand exports found, using "${brandEntries[0][0]}"`
    };
  }
  return { brand: brandEntries[0][1] };
};
var discoverBrandFiles = async (rootDir) => {
  const brandsDir = join(rootDir, "data", "brands");
  const entries = await readdir(brandsDir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile()).map((entry) => entry.name).filter((name) => name.endsWith(".ts") && name !== "index.ts").toSorted((a, b) => a.localeCompare(b)).map((name) => join(brandsDir, name));
};
var withBuiltSearchIndex = (brands) => {
  const sortedBrands = brands.toSorted((a, b) => a.name.localeCompare(b.name));
  return {
    brands: sortedBrands,
    sidebarBrands: sortedBrands.map(buildSidebarBrand),
    warnings: []
  };
};
var parseRemoteBaseUrl = (input) => {
  if (!input || input.trim().length === 0) {
    return "https://loftlyy.com";
  }
  const normalized = input.trim().replace(/\/+$/, "");
  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("unsupported protocol");
    }
    return normalized;
  } catch {
    throw new CliError(
      `Invalid base URL "${input}". Use an absolute URL like https://loftlyy.com`,
      EXIT_CODE.ARGUMENT_ERROR
    );
  }
};
var loadRemoteBrands = async (baseUrlInput) => {
  const baseUrl = parseRemoteBaseUrl(baseUrlInput);
  const endpoint = `${baseUrl}/api/cli`;
  let response;
  try {
    response = await fetch(endpoint, {
      headers: {
        accept: "application/json"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "network failure";
    throw new CliError(
      `Failed to fetch ${endpoint} (${message})`,
      EXIT_CODE.RUNTIME_ERROR
    );
  }
  if (!response.ok) {
    throw new CliError(
      `Remote API ${endpoint} returned ${response.status} ${response.statusText}`,
      EXIT_CODE.RUNTIME_ERROR
    );
  }
  let json;
  try {
    json = await response.json();
  } catch {
    throw new CliError(
      `Remote API ${endpoint} returned invalid JSON`,
      EXIT_CODE.RUNTIME_ERROR
    );
  }
  const record = json;
  if (!record || !Array.isArray(record.brands)) {
    throw new CliError(
      `Remote API ${endpoint} response is missing a brands array`,
      EXIT_CODE.RUNTIME_ERROR
    );
  }
  const warnings = [];
  const validBrands = [];
  for (const entry of record.brands) {
    if (!isBrandLike(entry)) {
      const errors = getBrandValidationErrors(entry);
      const warning = `Remote brand entry rejected: ${errors.join("; ")}`;
      warnings.push(warning);
      continue;
    }
    validBrands.push(entry);
  }
  if (warnings.length > 0) {
    return {
      ...withBuiltSearchIndex(validBrands),
      warnings
    };
  }
  return withBuiltSearchIndex(validBrands);
};
var loadBrands = async (options) => {
  if (options.source === "remote") {
    return loadRemoteBrands(options.baseUrl);
  }
  const rootDir = options.rootDir ?? process.cwd();
  const files = await discoverBrandFiles(rootDir);
  const brands = [];
  const slugToFile = /* @__PURE__ */ new Map();
  const warnings = [];
  for (const filePath of files) {
    const fileRelativePath = relative(rootDir, filePath);
    let importedModule;
    try {
      importedModule = await import(pathToFileURL(filePath).href);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown import failure";
      const warning2 = `${fileRelativePath}: failed to import (${message})`;
      if (options.strict) {
        throw new CliError(warning2, EXIT_CODE.DATA_FAILURE);
      }
      warnings.push(warning2);
      continue;
    }
    const { brand, warning } = resolveBrandExport(
      importedModule,
      fileRelativePath
    );
    if (warning) {
      warnings.push(warning);
    }
    if (!brand) {
      if (options.strict) {
        throw new CliError(
          `${fileRelativePath}: strict mode requires a valid Brand export`,
          EXIT_CODE.DATA_FAILURE
        );
      }
      continue;
    }
    const validationErrors = getBrandValidationErrors(brand);
    if (validationErrors.length > 0) {
      const details = validationErrors.join("; ");
      const errorMessage = `${fileRelativePath}: ${details}`;
      if (options.strict) {
        throw new CliError(errorMessage, EXIT_CODE.DATA_FAILURE);
      }
      warnings.push(errorMessage);
      continue;
    }
    const duplicateSource = slugToFile.get(brand.slug);
    if (duplicateSource) {
      const duplicateMessage = `${fileRelativePath}: duplicate slug "${brand.slug}" (already loaded from ${duplicateSource})`;
      if (options.strict) {
        throw new CliError(duplicateMessage, EXIT_CODE.DATA_FAILURE);
      }
      warnings.push(duplicateMessage);
      continue;
    }
    slugToFile.set(brand.slug, fileRelativePath);
    brands.push(brand);
  }
  const sortedBrands = brands.toSorted((a, b) => a.name.localeCompare(b.name));
  return {
    brands: sortedBrands,
    sidebarBrands: sortedBrands.map(buildSidebarBrand),
    warnings
  };
};

// core/query.ts
var normalizeSlug = (slug) => slug.trim().toLowerCase();
var getSuggestions = (input, candidates, limit = 3) => {
  const normalizedInput = input.trim().toLowerCase();
  if (!normalizedInput) {
    return [];
  }
  const includesMatches = [];
  const others = [];
  const startsWithMatches = [];
  for (const candidate of candidates) {
    const normalizedCandidate = candidate.toLowerCase();
    if (normalizedCandidate.startsWith(normalizedInput)) {
      startsWithMatches.push(candidate);
      continue;
    }
    if (normalizedCandidate.includes(normalizedInput) || normalizedInput.includes(normalizedCandidate)) {
      includesMatches.push(candidate);
      continue;
    }
    others.push(candidate);
  }
  const ordered = [
    ...startsWithMatches.toSorted((a, b) => a.localeCompare(b)),
    ...includesMatches.toSorted((a, b) => a.localeCompare(b)),
    ...others.toSorted((a, b) => a.localeCompare(b))
  ];
  return ordered.slice(0, limit);
};
var getFacetValidationMessage = (label, invalidValues, allowedValues) => {
  const invalidSection = `Invalid ${label}: ${invalidValues.join(", ")}.`;
  const suggestions = invalidValues.map((invalidValue) => {
    const candidateSuggestions = getSuggestions(
      invalidValue,
      allowedValues,
      2
    );
    if (candidateSuggestions.length === 0) {
      return "";
    }
    return `${invalidValue} -> ${candidateSuggestions.join(", ")}`;
  }).filter(Boolean);
  const suggestionSection = suggestions.length > 0 ? ` Suggestions: ${suggestions.join(" | ")}.` : "";
  return `${invalidSection}${suggestionSection} Allowed values: ${allowedValues.join(", ")}`;
};
var findBrandBySlug = (brands, slug) => {
  const normalizedSlug = normalizeSlug(slug);
  const exactMatch = brands.find((brand) => brand.slug === slug.trim());
  if (exactMatch) {
    return exactMatch;
  }
  return brands.find((brand) => normalizeSlug(brand.slug) === normalizedSlug);
};
var requireBrandBySlug = (brands, slug) => {
  const brand = findBrandBySlug(brands, slug);
  if (brand) {
    return brand;
  }
  const availableSlugs = brands.map((item) => item.slug);
  const suggestions = getSuggestions(slug, availableSlugs);
  const suffix = suggestions.length > 0 ? ` Did you mean: ${suggestions.map((item) => `"${item}"`).join(", ")}?` : "";
  throw new CliError(
    `Brand with slug "${slug}" was not found.${suffix}`,
    EXIT_CODE.DATA_FAILURE
  );
};
var getBrandFacets = (sidebarBrands) => getAvailableFilters(sidebarBrands);
var searchSidebarBrands = (sidebarBrands, query) => filterBrands(sidebarBrands, {
  ...emptyFilters,
  query
});
var validateFilterInput = (input, facets) => {
  const checks = [
    {
      allowed: facets.industries,
      label: "industry values",
      selected: input.industries
    },
    {
      allowed: facets.tags,
      label: "tag values",
      selected: input.tags
    },
    {
      allowed: facets.colorFamilies,
      label: "color-family values",
      selected: input.colorFamilies
    },
    {
      allowed: facets.typographyStyles,
      label: "typography-style values",
      selected: input.typographyStyles
    }
  ];
  for (const check of checks) {
    if (check.selected.length === 0) {
      continue;
    }
    const allowedSet = new Set(check.allowed);
    const invalid = check.selected.filter((item) => !allowedSet.has(item));
    if (invalid.length === 0) {
      continue;
    }
    throw new CliError(
      getFacetValidationMessage(check.label, invalid, check.allowed),
      EXIT_CODE.ARGUMENT_ERROR
    );
  }
};
var filterSidebarBrands = (sidebarBrands, input) => filterBrands(sidebarBrands, {
  colorFamilies: input.colorFamilies,
  industries: input.industries,
  query: input.query,
  tags: input.tags,
  typographyStyles: input.typographyStyles
});
var getSimilarBrandsForSlug = (brands, slug, limit) => {
  const current = requireBrandBySlug(brands, slug);
  return getSimilarBrands(current, brands, limit);
};
var getBrandPalette = (brand) => brand.colors.map((color) => ({
  hex: color.hex,
  name: color.name,
  ...color.usage ? { usage: color.usage } : {}
}));

// core/stdio.ts
var writeStderr = (message) => {
  process.stderr.write(message.endsWith("\n") ? message : `${message}
`);
};
var writeStdout = (message) => {
  process.stdout.write(message.endsWith("\n") ? message : `${message}
`);
};

// commands/brands.ts
var parsePositiveInt = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new InvalidArgumentError("value must be a positive integer");
  }
  return parsed;
};
var collectValues = (input, previous) => {
  const values = input.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
  return [...previous, ...values];
};
var getRuntimeContext = (command, defaultOutputMode) => {
  const globalOptions = command.optsWithGlobals();
  const outputMode = globalOptions.output ?? defaultOutputMode;
  const source = globalOptions.source ?? "local";
  return {
    baseUrl: globalOptions.baseUrl,
    colorEnabled: globalOptions.color !== false && outputMode === "table" && process.stdout.isTTY === true,
    outputMode,
    source,
    strict: Boolean(globalOptions.strict)
  };
};
var normalizeSelectionValues = (values) => {
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  for (const value of values) {
    const normalized = value.trim();
    if (!normalized) {
      continue;
    }
    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(normalized);
  }
  return result;
};
var canonicalizeAgainstAllowed = (values, allowed) => {
  const normalizedValues = normalizeSelectionValues(values);
  const byLowerCase = new Map(allowed.map((item) => [item.toLowerCase(), item]));
  return normalizedValues.map(
    (value) => byLowerCase.get(value.toLowerCase()) ?? value
  );
};
var printWarnings = (warnings, runtime) => {
  if (warnings.length === 0) {
    return;
  }
  const warningLabel = runtime.colorEnabled ? pc2.yellow("Warnings") : "Warnings";
  writeStderr(`${warningLabel} (${warnings.length}):`);
  for (const warning of warnings) {
    writeStderr(`- ${warning}`);
  }
};
var loadCommandContext = async (command, defaultOutputMode, spinnerText) => {
  const runtime = getRuntimeContext(command, defaultOutputMode);
  const shouldShowSpinner = runtime.outputMode === "table" && process.stderr.isTTY === true;
  if (!shouldShowSpinner) {
    const loaded = await loadBrands({
      baseUrl: runtime.baseUrl,
      source: runtime.source,
      strict: runtime.strict
    });
    printWarnings(loaded.warnings, runtime);
    return { ...runtime, loaded };
  }
  const spinner = ora(spinnerText).start();
  try {
    const loaded = await loadBrands({
      baseUrl: runtime.baseUrl,
      source: runtime.source,
      strict: runtime.strict
    });
    spinner.succeed(`Loaded ${loaded.brands.length} brands`);
    printWarnings(loaded.warnings, runtime);
    return { ...runtime, loaded };
  } catch (error) {
    spinner.fail("Failed to load brand data");
    throw error;
  }
};
var printByMode = (mode, value, tableOutput) => {
  if (mode === "json") {
    writeStdout(renderJson(value));
    return;
  }
  if (mode === "ndjson") {
    writeStdout(renderNdjson(value));
    return;
  }
  writeStdout(tableOutput);
};
var registerListCommand = (target) => {
  target.command("list").description("Return all brands in summary view").option("--limit <n>", "Limit number of rows", parsePositiveInt).addHelpText(
    "after",
    "\nExamples:\n  loftlyy list\n  loftlyy list --limit 10 --output json"
  ).action(async function listAction(options) {
    const context = await loadCommandContext(
      this,
      "table",
      "Discovering brand files"
    );
    const results = options.limit && options.limit > 0 ? context.loaded.sidebarBrands.slice(0, options.limit) : context.loaded.sidebarBrands;
    printByMode(
      context.outputMode,
      results,
      renderBrandListTable(results, context)
    );
  });
};
var registerGetCommand = (target) => {
  target.command("get [slug]").description("Return full brand data for one brand").option("--slug <slug>", "Brand slug").addHelpText(
    "after",
    "\nExamples:\n  loftlyy get apple\n  loftlyy get --slug stripe --output table"
  ).action(async function getAction(slugArg) {
    const command = this;
    const options = command.opts();
    const slug = slugArg ?? options.slug;
    if (!slug) {
      throw new InvalidArgumentError("Provide a slug: loftlyy get <slug>");
    }
    const context = await loadCommandContext(command, "json", "Loading brand");
    const brand = requireBrandBySlug(context.loaded.brands, slug);
    printByMode(
      context.outputMode,
      brand,
      renderBrandDetailTable(brand, context)
    );
  });
};
var registerSearchCommand = (target) => {
  target.command("search [query...]").description("Search brands by text and hex tokens").option("--q <query>", "Search query").addHelpText(
    "after",
    '\nExamples:\n  loftlyy search apple\n  loftlyy search "#ff0000 ai"\n  loftlyy search --q "design system"'
  ).action(async function searchAction(queryArgs) {
    const command = this;
    const options = command.opts();
    const positionalQuery = (queryArgs ?? []).join(" ").trim();
    const query = options.q?.trim() || positionalQuery;
    if (!query) {
      throw new InvalidArgumentError(
        'Provide a query: loftlyy search "apple"'
      );
    }
    const context = await loadCommandContext(
      command,
      "table",
      "Searching brands"
    );
    const results = searchSidebarBrands(context.loaded.sidebarBrands, query);
    printByMode(
      context.outputMode,
      results,
      renderBrandListTable(results, context)
    );
  });
};
var registerFilterCommand = (target) => {
  target.command("filter").description("Filter brands by facets and optional query").option("--industry <value>", "Industry slug", collectValues, []).option("--tag <value>", "Tag", collectValues, []).option("--color-family <value>", "Color family", collectValues, []).option("--typography-style <value>", "Typography style", collectValues, []).option("--q <query>", "Optional text/hex query", "").addHelpText(
    "after",
    '\nExamples:\n  loftlyy filter --industry technology --tag innovation\n  loftlyy filter --color-family blue --typography-style sans-serif --q "ai"'
  ).action(async function filterAction(options) {
    const context = await loadCommandContext(
      this,
      "table",
      "Applying brand filters"
    );
    const facets = getBrandFacets(context.loaded.sidebarBrands);
    const input = {
      colorFamilies: canonicalizeAgainstAllowed(
        options.colorFamily,
        facets.colorFamilies
      ),
      industries: canonicalizeAgainstAllowed(
        options.industry,
        facets.industries
      ),
      query: options.q,
      tags: canonicalizeAgainstAllowed(options.tag, facets.tags),
      typographyStyles: canonicalizeAgainstAllowed(
        options.typographyStyle,
        facets.typographyStyles
      )
    };
    validateFilterInput(input, facets);
    const results = filterSidebarBrands(context.loaded.sidebarBrands, input);
    printByMode(
      context.outputMode,
      results,
      renderBrandListTable(results, context)
    );
  });
};
var registerSimilarCommand = (target) => {
  target.command("similar <slug>").description("Find brands similar to a given slug").option("--limit <n>", "Limit number of results", parsePositiveInt, 5).addHelpText(
    "after",
    "\nExamples:\n  loftlyy similar apple\n  loftlyy similar apple --limit 10 --output json"
  ).action(async function similarAction(slug, options) {
    const context = await loadCommandContext(
      this,
      "table",
      "Calculating similar brands"
    );
    const similarBrands = getSimilarBrandsForSlug(
      context.loaded.brands,
      slug,
      options.limit
    );
    const jsonRows = similarBrands.map((brand, index) => ({
      categories: brand.categories,
      industry: brand.industry,
      name: brand.name,
      rank: index + 1,
      slug: brand.slug,
      tags: brand.tags ?? []
    }));
    printByMode(
      context.outputMode,
      jsonRows,
      renderSimilarBrandsTable(slug, similarBrands, context)
    );
  });
};
var registerPaletteCommand = (target) => {
  target.command("palette <slug>").description("Output brand palette as JSON list").addHelpText(
    "after",
    "\nExamples:\n  loftlyy palette apple\n  loftlyy palette stripe --output table"
  ).action(async function paletteAction(slug) {
    const context = await loadCommandContext(
      this,
      "json",
      "Loading brand palette"
    );
    const brand = requireBrandBySlug(context.loaded.brands, slug);
    const palette = getBrandPalette(brand);
    printByMode(
      context.outputMode,
      palette,
      renderPaletteTable(slug, palette, context)
    );
  });
};
var registerFacetsCommand = (target) => {
  target.command("facets").description(
    "Return available industries, tags, color families, typography styles"
  ).addHelpText(
    "after",
    "\nExamples:\n  loftlyy facets\n  loftlyy facets --output json"
  ).action(async function facetsAction() {
    const context = await loadCommandContext(
      this,
      "table",
      "Collecting brand facets"
    );
    const facets = getBrandFacets(context.loaded.sidebarBrands);
    printByMode(
      context.outputMode,
      facets,
      renderFacetsTable(facets, context)
    );
  });
};
var registerBrandsCommand = (program) => {
  const aliases = ["brands", "b"];
  registerListCommand(program);
  registerGetCommand(program);
  registerSearchCommand(program);
  registerFilterCommand(program);
  registerSimilarCommand(program);
  registerPaletteCommand(program);
  registerFacetsCommand(program);
  const legacyNamespace = program.command("brands").alias("b").description("Legacy namespace. You can call commands directly now.");
  registerListCommand(legacyNamespace);
  registerGetCommand(legacyNamespace);
  registerSearchCommand(legacyNamespace);
  registerFilterCommand(legacyNamespace);
  registerSimilarCommand(legacyNamespace);
  registerPaletteCommand(legacyNamespace);
  registerFacetsCommand(legacyNamespace);
  program.addHelpText(
    "after",
    `
Short usage:
  loftlyy list
  loftlyy search apple
  loftlyy get apple

Legacy namespace still works:
  ${aliases.map((alias) => `loftlyy ${alias} list`).join("\n  ")}`
  );
};

// index.ts
var getCliVersion = async () => {
  const packageJsonPath = join2(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "package.json"
  );
  try {
    const raw = await readFile(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw);
    if (typeof parsed.version === "string" && parsed.version.length > 0) {
      return parsed.version;
    }
  } catch {
    const cwdPackageJsonPath = join2(process.cwd(), "package.json");
    try {
      const raw = await readFile(cwdPackageJsonPath, "utf8");
      const parsed = JSON.parse(raw);
      if (typeof parsed.version === "string" && parsed.version.length > 0) {
        return parsed.version;
      }
    } catch {
    }
  }
  return "0.1.0";
};
var parseOutputMode = (value) => {
  if (value === "table" || value === "json" || value === "ndjson") {
    return value;
  }
  throw new InvalidArgumentError2(
    `Invalid output mode "${value}". Use table, json, or ndjson.`
  );
};
var detectDefaultSource = () => {
  const localBrandsDir = join2(process.cwd(), "data", "brands");
  return existsSync(localBrandsDir) ? "local" : "remote";
};
var main = async () => {
  const version = await getCliVersion();
  const defaultSource = detectDefaultSource();
  const program = new Command();
  program.name("loftlyy").description("Loftlyy brand data CLI").version(version).showHelpAfterError().option(
    "--source <source>",
    "Data source: local | remote",
    (value) => {
      if (value === "local" || value === "remote") {
        return value;
      }
      throw new InvalidArgumentError2(
        `Invalid source "${value}". Use local or remote.`
      );
    },
    defaultSource
  ).option(
    "--base-url <url>",
    "Optional remote API base URL override, e.g. https://loftlyy.com"
  ).option(
    "-o, --output <mode>",
    "Output mode: table | json | ndjson",
    parseOutputMode
  ).option("--strict", "Fail fast on invalid brand files").option("--no-color", "Disable colorized output");
  registerBrandsCommand(program);
  program.configureOutput({
    outputError: (text) => writeStderr(text)
  });
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    if (error instanceof CliError) {
      writeStderr(error.message);
      process.exit(error.exitCode);
    }
    if (error instanceof Error) {
      writeStderr(error.message);
    } else {
      writeStderr("Unexpected CLI failure");
    }
    process.exit(EXIT_CODE.RUNTIME_ERROR);
  }
};
await main();
//# sourceMappingURL=index.js.map