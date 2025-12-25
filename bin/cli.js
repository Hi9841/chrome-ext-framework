#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.resolve(__dirname, '../template');

// 2. Get the project name from the command line argument
// Example: "create-ext my-app" -> projectName will be "my-app"
const projectName = process.argv[2] || 'my-chrome-extension';
const targetDir = path.join(process.cwd(), projectName);

console.log("-------------------------------------------------");
console.log(`🚀  Creating project in: ${projectName} ...`);
console.log("-------------------------------------------------");

try {
  // 3. Create the new project folder if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  } else {
    console.error(`❌ Error: Folder "${projectName}" already exists.`);
    process.exit(1);
  }

  // 4. Read files and copy them
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    const srcFile = path.join(sourceDir, file);
    const destFile = path.join(targetDir, file);
    
    // Copy recursively
    fs.cpSync(srcFile, destFile, { recursive: true });
  }

  console.log("\n✅ Done! To get started:");
  console.log(`   cd ${projectName}`);
  console.log("   npm install");

} catch (error) {
  console.error("❌ Error:", error.message);
}