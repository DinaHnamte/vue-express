const express = require("express");
const router = express.Router();
const { upload } = require("../lib/config");
const admin_controller = require("../controllers/admin_controller");
console.log({ upload: upload, admin_controller: admin_controller });
router.post(
  "/uploadvideo",
  upload.single("video_file"),
  admin_controller.upload_video
);
router.get("/uploadprogress", admin_controller.upload_progress);

module.exports = router;
