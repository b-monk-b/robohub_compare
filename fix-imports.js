const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components');

// Files to rename (from PascalCase to kebab-case)
const filesToRename = [
  'AspectRatio.tsx',
  'Badge.tsx',
  'Card.tsx',
  'Dialog.tsx',
  'Image.tsx',
  'Skeleton.tsx',
  'Tabs.tsx',
  'Toast.tsx',
  'Tooltip.tsx'
];

// Update imports in all files
function updateImports() {
  // Walk through all files in the components directory
  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = false;
        
        // Update imports
        for (const oldFile of filesToRename) {
          const newFile = oldFile.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          const importRegex = new RegExp(`from ['"]\.\.?\/ui\/${oldFile.replace('.tsx', '')}['"]`, 'g');
          
          if (importRegex.test(content)) {
            content = content.replace(importRegex, `from './ui/${newFile.replace('.tsx', '')}'`);
            updated = true;
          }
        }
        
        if (updated) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated imports in ${fullPath}`);
        }
      }
    }
  };
  
  walkDir(componentsDir);
}

// Rename files to kebab-case
function renameFiles() {
  const uiDir = path.join(componentsDir, 'ui');
  
  for (const oldFile of filesToRename) {
    const oldPath = path.join(uiDir, oldFile);
    const newFile = oldFile.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const newPath = path.join(uiDir, newFile);
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${oldFile} to ${newFile}`);
    }
  }
}

// Run the updates
console.log('Updating imports...');
updateImports();

console.log('Renaming files...');
renameFiles();

console.log('Done! Make sure to update any imports in other parts of your project.');
