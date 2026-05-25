import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function getFiles(dir: string, fileList: string[] = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const name = join(dir, file);
    if (statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      fileList.push(name);
    }
  }
  return fileList;
}

const files = getFiles('src');

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  
  content = content.replace(/font-serif/g, 'font-display');
  
  content = content.replace(/bg-obsidian/g, 'bg-charcoal');
  content = content.replace(/from-obsidian/g, 'from-charcoal');
  content = content.replace(/to-obsidian/g, 'to-charcoal');
  content = content.replace(/via-obsidian/g, 'via-charcoal');
  content = content.replace(/bg-slate-gray\/5/g, 'bg-[#111111]');
  content = content.replace(/bg-slate-gray\/10/g, 'bg-charcoal border-white/5');
  
  content = content.replace(/text-obsidian/g, 'text-charcoal');
  content = content.replace(/text-marble/g, 'text-white');
  content = content.replace(/bg-marble/g, 'bg-white');
  
  content = content.replace(/bg-platinum/g, 'bg-lush-yellow');
  content = content.replace(/hover:bg-platinum/g, 'hover:bg-lush-yellow');
  content = content.replace(/border-platinum\/10/g, 'border-white/10');
  content = content.replace(/border-platinum\/20/g, 'border-white/20');
  content = content.replace(/border-platinum\/30/g, 'border-white/30');
  content = content.replace(/border-platinum\/40/g, 'border-white/40');
  content = content.replace(/border-platinum\/50/g, 'border-white/50');
  content = content.replace(/hover:border-platinum/g, 'hover:border-lush-yellow');
  content = content.replace(/border-platinum/g, 'border-lush-yellow');
  
  content = content.replace(/text-platinum\/80/g, 'text-muted-2');
  content = content.replace(/text-platinum\/70/g, 'text-muted-2');
  content = content.replace(/text-platinum\/60/g, 'text-muted-1');
  content = content.replace(/text-platinum\/50/g, 'text-muted-1');
  content = content.replace(/text-platinum\/40/g, 'text-muted-1');
  content = content.replace(/text-platinum\/30/g, 'text-muted-1');
  content = content.replace(/text-platinum\/20/g, 'text-muted-1');
  content = content.replace(/text-platinum\/10/g, 'text-muted-1');
  
  content = content.replace(/text-platinum/g, 'text-lush-yellow');
  
  writeFileSync(file, content);
}
