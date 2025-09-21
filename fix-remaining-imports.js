const fs = require('fs');
const path = require('path');

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 修正パターン
    const patterns = [
      // "components/ -> "./ui/ (components/フォルダ内の場合)
      { from: /from ['"]components\/ui\//g, to: 'from "./ui/' },
      { from: /from ['"]hooks\//g, to: 'from "../hooks/' },
      { from: /from ['"]lib\//g, to: 'from "../lib/' },
      { from: /from ['"]app\//g, to: 'from "../app/' }
    ];
    
    patterns.forEach(pattern => {
      const newContent = content.replace(pattern.from, pattern.to);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function getAllFiles(dir, pattern) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, pattern));
    } else if (pattern.test(file)) {
      results.push(filePath);
    }
  });
  
  return results;
}

// 実行
console.log('Starting remaining import path fixes...');
const allFiles = getAllFiles('.', /\.(ts|tsx)$/);
allFiles.forEach(fixImportsInFile);
console.log('Import path fixes completed!');
