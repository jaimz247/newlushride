import fs from 'fs';
import path from 'path';

const files = [
  'src/components/sections/Hubs.tsx',
  'src/components/sections/AppDownload.tsx',
  'src/components/sections/ServiceAreas.tsx',
  'src/components/sections/Insights.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/LushAcademy.tsx',
  'src/components/layout/Navbar.tsx',
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\?auto=format&fit=crop&w=([0-9]*)&q=80/g, '?auto=format&fit=crop&w=$1&q=60&fm=webp');
    fs.writeFileSync(filePath, content, 'utf8');
  }
}
console.log("Done");
