
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   
    const homeDir = os.homedir();
    // Extract the original file name without extension
    // const originalName = file.originalname.split('.')[0];
    const uploadPath = path.join(
      homeDir,
      // 'sampleInputOutput',
      // 'sampleInputOutput',
      'input',
      // originalName  // if you do not need folder remove this 
    );

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  upload.array('files')(req, {}, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: 'Multer error occurred when uploading.', error: err });
    } else if (err) {
      return res.status(500).json({ message: 'Unknown error occurred when uploading.', error: err });
    }

    res.status(200).json({ message: "File(s) uploaded successfully", files: req.files });
  });
}

