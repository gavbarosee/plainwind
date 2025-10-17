/**
 * Fix TypeScript path aliases in compiled JavaScript files
 * 
 * This script converts @src/* imports to relative paths so they work at runtime.
 * It processes all .js files in the out directory.
 */

const fs = require('fs');
const path = require('path');

/**
 * Recursively get all .js files in a directory
 */
function getJsFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      getJsFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Convert @src/* path to relative path
 */
function convertPathAlias(filePath, importPath) {
  // Get the directory of the current file relative to 'out'
  const fileDir = path.dirname(filePath);
  const outDir = path.join(__dirname, 'out');
  
  // Calculate relative path from file to out directory
  const relativeToOut = path.relative(fileDir, outDir);
  
  // Remove '@src/' prefix and construct the target path
  const targetPath = importPath.replace('@src/', '');
  
  // Combine relative path to out with target path
  let relativePath = path.join(relativeToOut, targetPath);
  
  // Normalize path separators for require() (use forward slashes)
  relativePath = relativePath.split(path.sep).join('/');
  
  // Ensure path starts with './' or '../'
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  
  return relativePath;
}

/**
 * Process a single JavaScript file
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Match require('@src/...') patterns
  const requirePattern = /require\(["']@src\/([^"']+)["']\)/g;
  
  content = content.replace(requirePattern, (match, importPath) => {
    modified = true;
    const fullImportPath = '@src/' + importPath;
    const relativePath = convertPathAlias(filePath, fullImportPath);
    return `require("${relativePath}")`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed imports in: ${path.relative(__dirname, filePath)}`);
  }
}

/**
 * Main execution
 */
function main() {
  const outDir = path.join(__dirname, 'out');
  
  if (!fs.existsSync(outDir)) {
    console.log('No out directory found. Run tsc first.');
    return;
  }
  
  console.log('Fixing path aliases in compiled JavaScript files...');
  
  const jsFiles = getJsFiles(outDir);
  
  for (const file of jsFiles) {
    processFile(file);
  }
  
  console.log(`\nProcessed ${jsFiles.length} files.`);
}

main();

