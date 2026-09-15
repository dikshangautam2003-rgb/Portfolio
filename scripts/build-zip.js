import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const archiverPkg = require('archiver');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'dikshan-gautam-portfolio.zip');

export function createZip() {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    
    // Support both function-style and class-style archiver exports
    let archive;
    if (typeof archiverPkg === 'function') {
      archive = archiverPkg('zip', { zlib: { level: 9 } });
    } else if (archiverPkg.ZipArchive) {
      archive = new archiverPkg.ZipArchive({ zlib: { level: 9 } });
    } else if (archiverPkg.Archiver) {
      archive = new archiverPkg.Archiver('zip', { zlib: { level: 9 } });
    } else if (archiverPkg.create) {
      archive = archiverPkg.create('zip', { zlib: { level: 9 } });
    } else {
      return reject(new Error('Cannot initialize archiver zip instance'));
    }

    output.on('close', () => {
      const bytes = archive.pointer ? archive.pointer() : fs.statSync(outputPath).size;
      console.log(`[ZIP] Archive generated successfully: ${bytes} total bytes at ${outputPath}`);
      resolve(outputPath);
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Files and folders to exclude from zip archive
    const excluded = new Set([
      'node_modules',
      '.git',
      'dikshan-gautam-portfolio.zip',
      '.DS_Store'
    ]);

    const items = fs.readdirSync(rootDir);
    for (const item of items) {
      if (excluded.has(item)) continue;
      const fullPath = path.join(rootDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        archive.directory(fullPath, item);
      } else if (stat.isFile()) {
        archive.file(fullPath, { name: item });
      }
    }

    archive.finalize();
  });
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createZip().catch(console.error);
}
