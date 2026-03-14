import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const RAW_DIR = path.resolve("_raw-assets")
const OUTPUT_DIR = path.resolve("public/brands")

const SIZES = {
  thumb: 64,
  card: 200,
  full: 800,
} as const

async function optimizeImage(
  inputPath: string,
  outputDir: string,
  baseName: string
) {
  const image = sharp(inputPath)
  const metadata = await image.metadata()
  const hasAlpha = metadata.hasAlpha ?? false

  const results: Array<{
    label: string
    fileName: string
    width: number
    height: number
  }> = []

  for (const [sizeName, targetWidth] of Object.entries(SIZES)) {
    const suffix = sizeName === "card" ? "" : `-${sizeName}`
    const fileName = `${baseName}${suffix}.webp`
    const outputPath = path.join(outputDir, fileName)

    const resized = sharp(inputPath).resize(targetWidth, undefined, {
      fit: "inside",
      withoutEnlargement: true,
    })

    const buffer = hasAlpha
      ? await resized.webp({ lossless: true }).toBuffer()
      : await resized.webp({ quality: 85 }).toBuffer()

    fs.writeFileSync(outputPath, buffer)

    const outputMeta = await sharp(buffer).metadata()
    results.push({
      label: sizeName,
      fileName,
      width: outputMeta.width ?? targetWidth,
      height: outputMeta.height ?? targetWidth,
    })
  }

  const blurBuffer = await sharp(inputPath)
    .resize(10, undefined, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer()

  const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`

  return { results, blurDataURL }
}

async function processBrand(slug: string) {
  const inputDir = path.join(RAW_DIR, slug)
  const outputDir = path.join(OUTPUT_DIR, slug)

  if (!fs.existsSync(inputDir)) {
    console.error(`No raw assets found at ${inputDir}`)
    process.exit(1)
  }

  fs.mkdirSync(outputDir, { recursive: true })

  const files = fs.readdirSync(inputDir).filter((f) => {
    const ext = path.extname(f).toLowerCase()
    return [".png", ".jpg", ".jpeg", ".webp", ".tiff", ".avif"].includes(ext)
  })

  if (files.length === 0) {
    console.error(`No image files found in ${inputDir}`)
    process.exit(1)
  }

  console.log(`\nProcessing ${files.length} image(s) for "${slug}"...\n`)

  const assetSnippets: string[] = []

  for (const file of files) {
    const baseName = path.basename(file, path.extname(file))
    const inputPath = path.join(inputDir, file)

    console.log(`  Processing: ${file}`)
    const { results, blurDataURL } = await optimizeImage(
      inputPath,
      outputDir,
      baseName
    )

    for (const r of results) {
      console.log(`    → ${r.fileName} (${r.width}×${r.height})`)
    }

    const cardResult = results.find((r) => r.label === "card")!
    const fullResult = results.find((r) => r.label === "full")!
    const thumbResult = results.find((r) => r.label === "thumb")!

    assetSnippets.push(`{
  label: "${baseName}",
  src: "/brands/${slug}/${cardResult.fileName}",
  srcFull: "/brands/${slug}/${fullResult.fileName}",
  width: ${cardResult.width},
  height: ${cardResult.height},
  blurDataURL: "${blurDataURL}",
  format: "webp",
}`)

    console.log(`    → blur placeholder generated`)
    console.log(`    → thumb: /brands/${slug}/${thumbResult.fileName}`)
  }

  console.log(`\n--- TypeScript snippet for data/brands/${slug}.ts ---\n`)
  console.log(`assets: [`)
  console.log(assetSnippets.join(",\n"))
  console.log(`],`)
  console.log(`\n--- Done! ---\n`)
}

const brandArg = process.argv[2]

if (!brandArg) {
  if (!fs.existsSync(RAW_DIR)) {
    console.error(
      `No _raw-assets directory found. Create it and add brand folders.`
    )
    process.exit(1)
  }

  const slugs = fs
    .readdirSync(RAW_DIR)
    .filter((f) => fs.statSync(path.join(RAW_DIR, f)).isDirectory())

  if (slugs.length === 0) {
    console.log("No brand folders found in _raw-assets/")
    process.exit(0)
  }

  for (const slug of slugs) {
    await processBrand(slug)
  }
} else {
  await processBrand(brandArg)
}
