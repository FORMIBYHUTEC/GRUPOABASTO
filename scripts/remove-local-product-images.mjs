import fs from "fs"
import path from "path"

const PUBLIC_DIR = "./public"

const content = fs.readFileSync("./components/products/products-data.ts", "utf-8")
const match = content.match(/export const products = (\[.*?\]);?\s*$/s)
if (!match) {
  console.error("Could not parse products-data.ts")
  process.exit(1)
}

const products = eval(match[1])
const filenames = new Set()

for (const product of products) {
  if (product.image) {
    try {
      const url = new URL(product.image)
      const filename = path.basename(url.pathname)
      if (filename) filenames.add(filename)
    } catch {
      // Local path
      const filename = path.basename(product.image)
      if (filename) filenames.add(filename)
    }
  }
}

let removed = 0
let missing = 0

for (const filename of filenames) {
  const filePath = path.join(PUBLIC_DIR, filename)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    console.log(`🗑️  Removed ${filename}`)
    removed++
  } else {
    console.log(`⚠️  Not found: ${filename}`)
    missing++
  }
}

console.log("\nDone!")
console.log(`Removed: ${removed}`)
console.log(`Missing: ${missing}`)
