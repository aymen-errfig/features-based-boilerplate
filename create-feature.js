#!/usr/bin/env node

/**
 * Feature scaffolding script for Next.js + Atomic Design
 * Usage:
 *   node create-feature.js featureName
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const featureName = process.argv[2];

if (!featureName) {
    console.error("❌ Please provide a feature name.");
    console.log("Example: node create-feature.js auth");
    process.exit(1);
}

const baseDir = path.join(__dirname, "src", "features", featureName);

const folders = [
    "components/atoms",
    "components/molecules",
    "components/organisms",
    "hooks",
    "services",
    "stores",
    "types",
    "utils",
];

folders.forEach((folder) => {
    const dirPath = path.join(baseDir, folder);
    fs.mkdirSync(dirPath, { recursive: true });
});

const indexFile = path.join(baseDir, "index.ts");
if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(
        indexFile,
        `// ${featureName} feature entry\nexport {};`
    );
}

console.log(`✅ Feature '${featureName}' created successfully!`);
console.log(`📂 Location: ${baseDir}`);
