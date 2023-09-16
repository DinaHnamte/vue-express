const { ffmpeg } = require("../lib/config");
const { s3Client } = require("../lib/config");
const { Upload } = require("@aws-sdk/lib-storage");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { create_movie } = require("../lib/helpers");
dotenv.config();

let clients = [];

const broadcastConvertProgress = (progress) => {
  clients.forEach((client) => {
    client.write(`event: conversion_update\n`);
    client.write(`data: ${progress.percent}\n\n`);
  });
};

const broadcastUploadProgress = (progress) => {
  clients.forEach((client) => {
    client.write("event: upload_update");
    client.write(`data: ${progress}\n\n`);
  });
};

const admin_controller = {
  upload_video: async (req, res) => {
    try {
      const input_file_path = req.file.path;
      const output_path = path.join(
        process.env.FF_TEMP_STORAGE_PATH,
        "converted"
      );
      const video_name = req.body.video_name;
      ffmpeg()
        .input(input_file_path)
        .outputOptions([
          "-hls_time 10",
          "-hls_playlist_type vod",
          "-hls_segment_filename " + path.join(output_path, "segment_%03d.ts"),
        ])
        .output(path.join(output_path, "playlist.m3u8"))
        .on("error", (error) => {
          console.log({ error: error });
          fs.rm(input_file_path, () => {
            console.log("Temp file deleted");
            res.status(500).send("Error during conversion. Please try again");
          });
        })
        .on("progress", (progress) => {
          console.log({ Conversion: parseFloat(progress.percent).toFixed(2) });
          broadcastConvertProgress(progress);
        })
        .on("end", async () => {
          console.log("Conversion Finished");
          // Upload to S3
          fs.rm(input_file_path, () => console.log("Temp files deleted"));
          const output_files = fs.readdirSync(output_path);
          output_files.forEach(async (file) => {
            let contentType;
            if (path.extname(file) === ".m3u8") {
              contentType = "application/x-mpegURL";
            } else {
              contentType = "video/MP2T";
            }
            console.log(contentType);
            const params = {
              Bucket: process.env.AWS_BUCKET,
              Key: `movies/${video_name}/${file}`,
              Body: fs.createReadStream(path.join(output_path, file)),
              ContentType: contentType,
            };

            const uploader = new Upload({
              client: s3Client,
              params: params,
            });

            uploader.on("httpUploadProgress", (progress) => {
              const percentage = Math.floor(
                (progress.loaded / progress.total) * 100
              );
              console.log(`Upload Progress: ${percentage}%`);
              broadcastUploadProgress(percentage);
            });

            await uploader.done();
            await create_movie(video_name, params.Key);
            console.log("done creating table");
          });
        })
        .run();
    } catch (error) {
      console.error({ error: error });
      res.status(500).send("Error during conversion. Please try again");
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
