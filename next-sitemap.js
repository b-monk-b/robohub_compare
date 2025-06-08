const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure out directory exists
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Run next-sitemap CLI
try {
  console.log('Generating sitemap...');
  execSync('npx next-sitemap --config next-sitemap.config.js', { stdio: 'inherit' });
  console.log('Sitemap generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
