import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createZip } from './scripts/build-zip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Generate ZIP file initially
createZip().catch(err => console.error('Initial zip creation error:', err));

// Route to download complete project ZIP archive
app.get(['/download-portfolio-zip', '/dikshan-gautam-portfolio.zip'], async (req, res) => {
  const zipPath = path.join(__dirname, 'dikshan-gautam-portfolio.zip');
  try {
    // Regenerate to make sure latest edits are packaged
    await createZip();
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="dikshan-gautam-portfolio.zip"');
    res.sendFile(zipPath);
  } catch (err) {
    console.error('Download error:', err);
    if (fs.existsSync(zipPath)) {
      res.download(zipPath, 'dikshan-gautam-portfolio.zip');
    } else {
      res.status(500).send('Could not generate zip archive');
    }
  }
});

// Block sensitive files from being served directly as static assets
const blockedFiles = new Set([
  'server.js',
  'package.json',
  'package-lock.json',
  'metadata.json',
  '.env.example',
  '.gitignore'
]);

app.use((req, res, next) => {
  const cleanPath = req.path.replace(/^\//, '');
  if (blockedFiles.has(cleanPath)) {
    return res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
  next();
});

// Serve static assets from root directory
app.use(express.static(__dirname, {
  dotfiles: 'ignore',
  extensions: ['html'],
  index: 'index.html'
}));

// Fallback to 404.html for any unmatched routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Portfolio server listening on http://${HOST}:${PORT}`);
});
