const { s3Client } = require("../lib/config");
const { Upload } = require("@aws-sdk/lib-storage");
const dotenv = require("dotenv");
dotenv.config();

let clients = [];

const broadcastProgress = (progress) => {
  clients.forEach((client) => client.write(`data: ${progress}\n\n`));
};

const admin_controller = {
  upload_video: async (req, res) => {
    try {
      const video_file = req.file;
      const video_name = req.body.video_name;

      const params = {
        Bucket: "streamingappbucket",
        Key: Date.now().toString() + "-" + video_name,
        Body: video_file.buffer,
        ContentType: video_file.mimetype,
      };

      const uploader = new Upload({
        client: s3Client,
        params: params,
      });

      uploader.on("httpUploadProgress", (progress) => {
        const percentage = Math.floor((progress.loaded / progress.total) * 100);
        console.log(`Upload Progress: ${percentage}%`);
        broadcastProgress(percentage);
      });

      await uploader.done();
      res.json({
        fileUrl: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading file");
    }
  },

  upload_progress: async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push(res);

    req.on("close", () => {
      clients = clients.filter((client) => client !== res);
    });
  },
};

module.exports = admin_controller;