const fs = require('fs');
const path = require('path');

// 修正対象のファイルパターン
const filesToFix = [
  'app/**/*.tsx',
  'components/**/*.tsx',
  'lib/**/*.ts'
];

// パス置換ルール
const replacements = [
  // @/components -> 相対パス
  { from: /@\/components\//g, to: (filePath) => {
    const depth = filePath.split('/').length - 1;
    return '../'.repeat(depth) + 'components/';
  }},
  // @/lib -> 相対パス
  { from: /@\/lib\//g, to: (filePath) => {
    const depth = filePath.split('/').length - 1;
    return '../'.repeat(depth) + 'lib/';
  }},
  // @/hooks -> 相対パス
  { from: /@\/hooks\//g, to: (filePath) => {
    const depth = filePath.split('/').length - 1;
    return '../'.repeat(depth) + 'hooks/';
  }},
  // @/app -> 相対パス
  { from: /@\/app\//g, to: (filePath) => {
    const depth = filePath.split('/').length - 1;
    return '../'.repeat(depth) + 'app/';
  }}
];

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

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // パス置換を実行
    replacements.forEach(replacement => {
      const newContent = content.replace(replacement.from, replacement.to(filePath));
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

// 実行
console.log('Starting import path fixes...');
const allFiles = getAllFiles('.', /\.(ts|tsx)$/);
allFiles.forEach(fixImportsInFile);
console.log('Import path fixes completed!');
