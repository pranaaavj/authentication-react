import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(import.meta.dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      crypto.randomBytes(6).toString('hex') + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
