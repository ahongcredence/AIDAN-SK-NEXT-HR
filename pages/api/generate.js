import fs from 'fs';
import path from 'path';
import os from 'os';
import mime from 'mime-types';

export default function handler(req, res) {
  const { folderName } = req.query;  
  const homeDir = os.homedir();

  if (!folderName) {
    return res.status(400).json({ error: 'Folder name is required' });
  }
console.log("f2",folderName)
  const desktopDir = path.join(
    homeDir,
    // 'sampleInputOutput',
    // 'sampleInputOutput',
    'output',
    'work',
    folderName 
  );

  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(desktopDir)) {
        return res.status(404).json({ error: 'Directory not found' });
      }

      const files = fs.readdirSync(desktopDir);
      const fileContents = files.map(file => {
        const filePath = path.join(desktopDir, file);
        const mimeType = mime.lookup(filePath);

        if (mimeType && mimeType.startsWith('text')) {
          const content = fs.readFileSync(filePath, 'utf8');
          return { name: file, content, 
            // type: 'text',
            type: 'text',
            downloadLink: `/api/download?folderName=${encodeURIComponent(folderName)}&filename=${encodeURIComponent(file)}`,
            mimeType,
           };
        } else if (mimeType === 'application/text'||'application/pdf' || mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          // For PDF and Excel files, return a download link
          return {
            name: file,
            type: 'download',
            downloadLink: `/api/download?folderName=${encodeURIComponent(folderName)}&filename=${encodeURIComponent(file)}`,
            mimeType,
          };
        } else {
          const content = fs.readFileSync(filePath, 'base64');
          return { name: file, content, type: 'binary', mimeType };
        }
      });
      res.status(200).json({ files: fileContents });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read directory', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


