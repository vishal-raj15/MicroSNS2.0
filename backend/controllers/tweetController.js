const db = require("../models");
const bcrypt = require("bcryptjs");
// create main model
const Tweets = db.tweets;
const Likes = db.likes;
const Users = db.users;
const Comments = db.comments;
var jwt = require("jsonwebtoken");
require("dotenv").config();

//const upload = require('./upload.js');

const addTweet = async (req, res) => {
  console.log(req.body.text);
  console.log(req.body.media);

  // console.log( req.body.text);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let content = {
    text: req.body.text,
    media: req.body.media,
    userId: req.body.userId,
  };

  try {
    const post = await Tweets.create(content);
    res.status(200).send(post);
    console.log(post);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: err.message || "Error occurred while creating the post",
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const info = await Users.findOne({
      attributes: ["id", "username", "name"],

      where: {
        id: req.body.id,
      },
    });
    if (info) {
      res.json({
        success: 1,
        data: info,
      });
    } else {
      res.json({
        success: 0,
        message: "no data",
        data: info,
      });
    }
  } catch (error) {
    res.json({
      success: 0,
      message: " can't fetch the data of user",
    });
  }
};

const getTweet = async (req, res) => {
  // get the api, check authentication
  // fetch it

  try {
    const tweets = await Tweets.findAll({
      attributes: [
        "id",
        "text",
        "media",
        "userId",
        "likesCount",
        "commentsCount",
        "createdAt",
      ],
    });

    if (tweets) {
      res.json({
        success: 1,
        data: tweets,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: 0,
      message: " can't fetch tweets data ",
      data: error,
    });
  }
};

const deleteTweet = async (req, res) => {
  const tweetId = req.body.id;

  Promise.all([
    await Tweets.destroy({ where: { id: tweetId } }),
    await Likes.destroy({ where: { tweetId } }),
    await Comments.destroy({ where: { tweetId } }),
  ]).then((values) => {
    return res.status(200).json({ tweet: values[0] });
  });

  // if (post) {
  //   return res.json({
  //     success: 1,
  //     message: " tweet is deleted ",
  //   });
  // } else {
  //   return res.json({
  //     success: 0,
  //     message: " error occured ",
  //   });
  // }
};

module.exports = {
  addTweet,
  getTweet,
  deleteTweet,
  getUserInfo,
};
