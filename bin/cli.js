#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the current path of this specific file (cli.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Define Source and Destination
// We step back (..) from 'bin' to get to the root, then into 'template'
const srcDir = path.join(__dirname, '..', 'template');
const destDir = process.cwd(); // The folder where the user runs the command

console.log(`\n📦 Creating a new Chrome Extension in: ${destDir}...`);

// 3. Check if template exists before copying
if (!fs.existsSync(srcDir)) {
  console.error(`❌ Error: Template folder not found at ${srcDir}`);
  process.exit(1);
}

// 4. Copy the files
try {
  fs.copySync(srcDir, destDir, {
    overwrite: false,
    errorOnExist: true // Prevents overwriting user's existing files
  });
  console.log('✅ Done! Project created successfully.');
  console.log('\nNow run:\n  npm install\n  npm run dev\n');
} catch (err) {
  console.error('❌ Error copying files:', err.message);
}