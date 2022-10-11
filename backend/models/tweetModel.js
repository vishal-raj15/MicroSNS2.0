const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define("tweet", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Tweet;
};
