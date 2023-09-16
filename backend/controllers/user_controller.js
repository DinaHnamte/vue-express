const User = require("../models/user");
const Movie = require("../models/movie");
const VideoFile = require("../models/videoFiles");
const { s3Client } = require("../lib/config");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");
const { modify_m3u8_manifest } = require("../lib/helpers");
dotenv.config();

const SALT_ROUNDS = 10;

// Api Methods
const user_controller = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
      const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: { password: password_hash },
      });
      if (created) {
        return res.status(201).json({ message: "Registered successfully" });
      } else {
        return res.status(400).json({ message: "Email already exists" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occured. Please try again" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        return res.status(400).json({ message: "User does not exist." });
      }
      const is_password_valid = await bcrypt.compare(password, user.password);
      if (is_password_valid) {
        const token = jwt.sign(
          { email: email, role: user.role },
          process.env.JWT_SECRET_KEY
        );
        return res
          .cookie("auth_token", "token", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            maxAge: 60 * 60 * 24,
          })
          .status(200)
          .json({ message: "Login successfull." });
      } else {
        return res.status(400).json({ message: "Invalid email or password." });
      }
    } catch (error) {
      console.log({ error: error });
      return res
        .status(500)
        .json({ message: "An error occured. Please try again" });
    }
  },

  getAllMovies: async (req, res) => {
    const result = await Movie.findAll({
      attributes: ["id", "movie_name"],
    });
    res.status(200).send(result);
  },

  getMovie: async (req, res) => {
    const { id } = req.body;
    const result = await VideoFile.findAll({
      attributes: ["video_key", "file_type"],
      where: {
        movie_id: id,
        file_type: ".ts",
      },
    });
    const signed_Urls = await Promise.all(
      result.map(async (file) => {
        if (file.get("file_type") === ".ts") {
          const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: file.get("video_key"),
          });
          const signed_urls = await getSignedUrl(s3Client, command, {
            expiresIn: "3600",
          });
          return signed_urls;
        }
      })
    );
    //
    const m3u8_file = await VideoFile.findOne({
      attributes: ["video_key"],
      where: {
        movie_id: id,
        file_type: ".m3u8",
      },
    });
    const get_manifest_command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: m3u8_file.get("video_key"),
    });
    let manifest_temp = "";
    let manifest_final = "";
    s3Client.send(get_manifest_command, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.Body.on("data", (chunk) => {
          manifest_temp = manifest_temp.concat(chunk.toString());
        });
        data.Body.on("end", () => {
          const lines = manifest_temp.split("\n");
          for (let i = 0; i < lines.length; i++) {
            let index = 0;
            if (lines[i].endsWith(".ts")) {
              manifest_final += `${signed_Urls[index]}\n`;
              index++;
            } else {
              manifest_final += `${lines[i]}\n`;
            }
          }
          const temp_file_path = path.join(
            __dirname,
            "../../temp/m3u8temp",
            `${m3u8_file.get("video_key")}`,
            `${Date.now()}.m3u8`
          );

          const real_path = path.join(
            __dirname,
            "../../temp/converted",
            "test.m3u8"
          );
          res.setHeader("Content-Type", "application/x-mpegURL");
          res.sendFile(real_path);

          // const dir = path.dirname(temp_file_path);
          // if (!fs.existsSync(dir)) {
          //   fs.mkdirSync(dir, { recursive: true });
          // }
          // fs.writeFileSync(temp_file_path, manifest_final);
          // res.setHeader("Content-Type", "application/x-mpegURL");
          // res.sendFile(temp_file_path);
        });
      }
    });
  },
};

module.exports = user_controller;
