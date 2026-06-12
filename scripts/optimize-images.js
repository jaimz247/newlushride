import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, '../src/components');

// Recursively get all files in a directory
function getAllFiles(dirPath, filesArray = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, filesArray);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      filesArray.push(fullPath);
    }
  });

  return filesArray;
}

const fileList = getAllFiles(COMPONENTS_DIR);

let totalChanged = 0;

fileList.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace Unsplash image URLs to ensure they use &fm=webp and &q=80
  // e.g., https://images.unsplash.com/photo-123?... -> ensure q=80&fm=webp
  content = content.replace(/(https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+)(\?([^"']*))?/g, (match, p1, p2, p3) => {
    let params = new URLSearchParams(p3 || '');
    if (!params.has('auto')) params.set('auto', 'format');
    params.set('fm', 'webp');
    params.set('q', '80');
    // Ensure we keep the existing width (w) or fit if provided
    return `${p1}?${params.toString()}`;
  });

  // 2. Replace local static images (.jpg, .jpeg, .png) with .webp
  // Looks for string literals like "/image.jpg" or "/image.png"
  content = content.replace(/(["'])((\/[^"']+)\.(jpg|jpeg|png))\1/gi, (match, quote, fullPath, basePath, ext) => {
    return `${quote}${basePath}.webp${quote}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanged++;
    console.log(`Updated images in: ${path.relative(path.join(__dirname, '..'), filePath)}`);
  }
});

console.log(`\nOptimization script completed. Modified ${totalChanged} component files.`);
console.log(`\nNOTE: You MUST also convert the actual physical image files in the /public folder to .webp format for the local paths to resolve correctly.`);
