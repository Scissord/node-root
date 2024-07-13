import fs from 'fs/promises';
import path from 'path';

// Function to recursively copy directories
export default async function copyDirRecursive(source, target) {
  const entries = await fs.readdir(source, { withFileTypes: true });

  await fs.mkdir(target, { recursive: true });

  await Promise.all(entries.map(async (entry) => {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(target, entry.name);

      if (entry.isDirectory()) {
          await copyDirRecursive(srcPath, destPath);
      } else {
          await fs.copyFile(srcPath, destPath);
      }
  }));
}