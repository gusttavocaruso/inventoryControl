const multer = require('multer');
const { resolve } = require('path');

const folderPath = resolve(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (_r, _file, cb) => cb(null, folderPath),
  filename: (r, _file, cb) => cb(null, `${r.params.id}.jpeg`),
});

const upload = multer({ storage });
const imageUpload = upload.single('image');

module.exports = imageUpload;
