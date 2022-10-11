const db = require("../models");
const Likes = db.likes;
const Users = db.users;
const Tweets = db.tweets;
const Comments = db.comments;

var jwt = require("jsonwebtoken");

const addComment = async (req, res) => {
  console.log("comment body ", req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Promise.all([
    await Comments.create({
      userId: req.body.userId,
      tweetId: req.body.tweetId,
      text: req.body.text,
    }),

    await Tweets.increment("commentsCount", {
      by: 1,
      where: {
        id: req.body.tweetId,
      },
    }),
  ]).then((values) => {
    console.log(" addcomment output ", values);
    return res.json({
      success: 1,
      comment: values[0],
    });
  });
};

const removeComment = async (req, res) => {
  Promise.all([
    await Comments.destroy({
      where: {
        id: req.body.id,
      },
    }),

    await Tweets.decrement("commentsCount", {
      by: 1,
      where: {
        id: req.body.tweetId,
      },
    }),
  ]).then((values) => {
    console.log(values);
    return res.json({
      success: 1,
      message: " comment deleted ",
      comment: values[0],
    });
  });
};

const getComments = async (req, res) => {
  console.log(" geting it ", req.query);
  const comments = await Users.findAll({
    attributes: ["username", "name"],
    include: {
      model: Comments,
      required: true,
      where: {
        tweetId: req.query.tweetId,
      },
    },
    order: [[Comments, "createdAt", "DESC"]],
    raw: true,
  });
  return res.status(200).json({ comments });
};

module.exports = {
  addComment,
  removeComment,
  getComments,
};
