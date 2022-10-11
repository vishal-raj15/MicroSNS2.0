const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected.......................");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.products = require("./productModel.js")(sequelize, DataTypes);
// db.reviews = require("./reviewModel.js")(sequelize, DataTypes);

db.users = require("./userModel.js")(sequelize, DataTypes);
db.tweets = require("./tweetModel.js")(sequelize, DataTypes);
db.likes = require("./likeModel.js")(sequelize, DataTypes);
db.comments = require("./commentModel.js")(sequelize, DataTypes);
// db.likes.belongsTo(db.users, { foreignKey: "userId" });
// db.likes.belongsTo(db.posts, { foreignKey: "tweetId" });
// db.tweets.belongsTo(db.users, { foreignKey: "userId" });

db.users.hasMany(db.tweets, {
  foreignKey: "userId",
});

db.users.hasMany(db.likes, {
  foreignKey: "userId",
});

db.tweets.hasMany(db.likes, {
  foreignKey: "tweetId",
});

db.users.hasMany(db.comments, {
  foreignKey: "userId",
});

db.tweets.hasMany(db.comments, {
  foreignKey: "tweetId",
});

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and re-sync db...............................................");

// });

module.exports = db;
