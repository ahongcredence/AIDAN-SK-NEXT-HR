import fs from 'fs';
import path from 'path';
import os from 'os';
import mime from 'mime-types';

export default function handler(req, res) {
  const { folderName,filename } = req.query;
  
  if (!filename) {
    console.error('No filename provided');
    return res.status(400).json({ error: 'Filename is required' });
  }
  const homeDir = os.homedir();

  const desktopDir =path.join(
    homeDir,
    // 'sampleInputOutput',
    // 'sampleInputOutput',
    'output',
    'work',
    folderName,

    // 'output',
    // 'work',
    //folderName
  
  );
  const filePath = path.join(desktopDir, filename);

  console.log('Attempting to download:', filePath);

  if (fs.existsSync(filePath)) {
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', mimeType);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res).on('error', (err) => {
      console.error('Error piping file stream:', err);
      res.status(500).json({ error: 'Failed to stream file' });
    });
  } else {
    console.error('File not found:', filePath);
    res.status(404).json({ error: 'File not found' });
  }
}
