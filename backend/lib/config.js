const dotenv = require("dotenv");
dotenv.config();
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
//
// Multer
//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FF_TEMP_STORAGE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
//
// AWS S3
//
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = { upload, s3Client, ffmpeg };
