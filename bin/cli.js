#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Setup Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '..', 'template');

const projectName = process.argv[2];
const currentDir = process.cwd();
const destDir = projectName ? path.join(currentDir, projectName) : currentDir;

console.log(`\n🚀 Creating Chrome Extension in: ${destDir}`);

// 2. Validate Template
if (!fs.existsSync(srcDir)) {
  console.error(`❌ Error: Template not found at ${srcDir}`);
  process.exit(1);
}

// 3. Create Destination Directory
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 4. Native Node.js Copy (Recursive)
try {
  fs.cpSync(srcDir, destDir, { 
    recursive: true, 
    filter: (src) => !src.includes('node_modules') && !src.includes('.git')
  });

  // 5. Rename gitignore (if it exists)
  const gitignorePath = path.join(destDir, 'gitignore');
  if (fs.existsSync(gitignorePath)) {
    fs.renameSync(gitignorePath, path.join(destDir, '.gitignore'));
  }

  // 6. Update package.json name
  const pkgPath = path.join(destDir, 'package.json');
  if (fs.existsSync(pkgPath) && projectName) {
    const pkgData = fs.readFileSync(pkgPath, 'utf-8');
    const pkg = JSON.parse(pkgData);
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }

  console.log(`✅ Done! Project created.`);
  console.log(`\nRun these commands:\n  cd ${projectName || '.'}\n  npm install\n  npm run dev\n`);

} catch (err) {
  console.error(`❌ Copy failed: ${err.message}`);
}