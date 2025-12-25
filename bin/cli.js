#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.resolve(__dirname, '../template');

// 2. Get the project name from the command line argument
const projectName = process.argv[2] || 'my-easy-extension';
const targetDir = path.join(process.cwd(), projectName);

console.log("-------------------------------------------------");
console.log("🚀  Welcome to EasyExtension!  🚀");
console.log("    Building your modern extension...");
console.log("-------------------------------------------------");

try {
  // 3. Create the new project folder
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  } else {
    console.error(`❌ Error: Folder "${projectName}" already exists.`);
    process.exit(1);
  }

  // 4. Read and copy files recursively
  const copyRecursive = (src, dest) => {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursive(sourceDir, targetDir);

  console.log(`\n✅ Created ${projectName} successfully!`);
  console.log("-------------------------------------------------");
  console.log("To get started:");
  console.log(`   cd ${projectName}`);
  console.log("   npm install");
  console.log("   npm run dev");
  console.log("-------------------------------------------------");

} catch (error) {
  console.error("❌ Error:", error.message);
}