const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../lib/database");
const Movie = require("../models/movie");

class VideoFile extends Model {}

VideoFile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
      allowNull: false,
    },
    file_type: {
      type: DataTypes.ENUM([".m3u8", ".ts"]),
      allowNull: true,
      defaultValue: "m3u8",
    },
    video_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VideoFile",
    tableName: "videofiles",
  }
);

module.exports = VideoFile;
