#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the current path of this specific file (cli.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Define Source
// We step back (..) from 'bin' to get to the root, then into 'template'
const srcDir = path.join(__dirname, '..', 'template');

// 3. Define Destination
// Check if the user provided a project name (e.g., "create-extension my-app")
const projectName = process.argv[2];
const currentDir = process.cwd();

let destDir;

if (projectName) {
  // If name provided, create that folder inside the current directory
  destDir = path.join(currentDir, projectName);
  console.log(`\n📦 Creating a new Chrome Extension in: ./${projectName}...`);
  fs.ensureDirSync(destDir); // Ensure the folder exists
} else {
  // If no name, use the current folder
  destDir = currentDir;
  console.log(`\n📦 Creating a new Chrome Extension in current directory...`);
}

// 4. Check if template exists before copying
if (!fs.existsSync(srcDir)) {
  console.error(`❌ Error: Template folder not found at ${srcDir}`);
  process.exit(1);
}

// 5. Copy the files
try {
  fs.copySync(srcDir, destDir, {
    overwrite: false,
    errorOnExist: false, // Fixed: Allows writing to existing folder
    filter: (src) => {
      // Filter out node_modules or .git just in case they are in the template
      return !src.includes('node_modules') && !src.includes('.git');
    }
  });

  console.log('✅ Done! Project created successfully.');
  
  // Custom instructions depending on if they created a new folder or not
  console.log('\nNow run:');
  if (projectName) {
    console.log(`  cd ${projectName}`);
  }
  console.log('  npm install');
  console.log('  npm run dev\n');

} catch (err) {
  console.error('❌ Error copying files:', err.message);
  process.exit(1);
}