// const productController = require("../controllers/productController.js");
const usercontroller = require("../controllers/userController.js");
const tweetController = require("../controllers/tweetController.js");
const verifyToken = require("../middleware/verifyToken.js");
const RefreshToken = require("../controllers/refreshToken.js");
const likeController = require("../controllers/likeController.js");
const commentController = require("../controllers/commentController.js");
const { verify } = require("jsonwebtoken");

const router = require("express").Router();

router.post("/addUser", usercontroller.addUser);
router.post("/login", usercontroller.login);

router.get("/all", verifyToken, usercontroller.getUsers);
router.get("/token", RefreshToken);

// router.post( '/like', verifyToken, usercontroller.likeit)
router.post("/post", verifyToken, tweetController.addTweet);
// router.post( '/comment', verifyToken, usercontroller.likeit)
router.get("/getPosts", verifyToken, tweetController.getTweet);

router.post("/likeTweet", verifyToken, likeController.likeTweet);

router.post("/iLiked", likeController.iLiked);
router.post("/unlike", verifyToken, likeController.removeLike);
router.get("/logout", usercontroller.logout);
router.delete("/post/:id", verifyToken, tweetController.deleteTweet);
router.get("/getuser/:id", usercontroller.getUsername);

router.post("/comment/add", verifyToken, commentController.addComment);
router.get("/post/comment", commentController.getComments);
router.post("/comment", verifyToken, commentController.removeComment);
// router.get("/getUserInfo/:id", tweetController.getUserInfo);
module.exports = router;

/** 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJuYW1lIjoidGVzdDEiLCJ1c2VybmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpLmNvbSIsInJlZnJlc2hUb2tlbiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0wOS0xNVQwNzo0NTozMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wOS0xNVQxMDoxOTowNS4wMDBaIn0sImlhdCI6MTY2MzI5OTIwMSwiZXhwIjoxNjYzMzA3ODQxfQ.BTgZnO11qhsZoKSLhbu0YEq1SyOts9atSV7OAITkn3Y


*/
