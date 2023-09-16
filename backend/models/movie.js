const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../lib/database");

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
  }
);

module.exports = Movie;
