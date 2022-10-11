const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    userId: {
      type: DataTypes.UUID,
    },
    tweetId: {
      type: DataTypes.UUID,
    },
    text: {
      type: DataTypes.STRING,
    },
  });

  return Comment;
};
