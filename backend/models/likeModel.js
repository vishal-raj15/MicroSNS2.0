const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
    tweetId: {
      type: DataTypes.UUID,
    },
    userId: {
      type: DataTypes.UUID,
    },
  });

  return Like;
};
