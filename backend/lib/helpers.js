const path = require("path");
const Movie = require("../models/movie");
const VideoFile = require("../models/videoFiles");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const create_movie = async (movie_name, file_key) => {
  try {
    const [movie] = await Movie.findOrCreate({
      where: {
        movie_name: movie_name,
      },
    });
    await VideoFile.create({
      movie_id: movie.get("id"),
      file_type: path.extname(file_key),
      video_key: file_key,
    });
  } catch (error) {
    console.log(error);
  }
};

const modify_m3u8_manifest = (m3u8_file, presigned_URLs) => {
  const file = fs.readFileSync(m3u8_file);
  console.log(file);
};

module.exports = { create_movie, modify_m3u8_manifest };
