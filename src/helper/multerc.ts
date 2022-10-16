import { Request } from 'express';
import multer from 'multer';
import utils from './utils';
import pathc from './pathc';

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, pathc.JT.uploadDir);
  },

  filename(_req, file, cb) {
    const fileExt = utils.getFileExt(file.originalname);
    const fileName = utils.removeFileExt(file.originalname);
    cb(null, `${fileName} - ${String(Date.now()).slice(-10)}.${fileExt}`);
  }
});

const fileFilter = (_req: Request, file: any, callback: Function) => {
  const ext = utils.getFileExt(file.originalname);
  if (ext !== 'pdf' && ext !== 'html') {
    return callback(new Error('Only images are allowed'));
  }
  callback(null, true);
};

const multerc = {
  uploadJT: multer({ storage, fileFilter }).single('dropzonefile')
};

export default multerc;
