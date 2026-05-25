import fs from 'fs';
import path from 'path';

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('bg-[#050505]')) {
        fs.writeFileSync(full, content.replace(/bg-\[#050505\]/g, 'bg-theme transition-colors duration-500'));
      }
    }
  }
}
walk('./src');
