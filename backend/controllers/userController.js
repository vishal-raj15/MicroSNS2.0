const db = require("../models");
const bcrypt = require("bcryptjs");
// create main model
const Users = db.users;
var jwt = require("jsonwebtoken");
require("dotenv").config();

// create product
const addUser = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let salt = bcrypt.genSaltSync(5, "a");
  let hashPassword = bcrypt.hashSync(req.body.password, salt);

  // console.log("--------------------------------------------", hashPassword);
  req.body.password = hashPassword;

  //

  // create a product
  let info = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // save Product in the database
  try {
    const user = await Users.create(info);
    res.status(200).send(user);
    console.log(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Product",
    });
  }
};

const login = async (req, res) => {
  // console.log(
  //   " oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
  //   req.body.username
  // );
  // // const { username } = req.body;

  try {
    console.log(" ............in......");
    const user = await Users.findOne({
      where: { username: req.body.username },
      raw: true,
    });

    const userId = user.id;
    const name = user.name;
    const username = user.username;
    const email = user.email;

    console.log(" userrrrrrrrrrrrr", user);

    const result = bcrypt.compareSync(req.body.password, user.password);
    if (!result) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    } else {
      // jwt
      user.password = undefined;
      var accessToken = jwt.sign(
        { userId, name, username, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m", // 20 secs
        }
      );

      const refreshToken = jwt.sign(
        { userId, name, username, email },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      // update the refresh token in user database

      await Users.update(
        { refreshToken: refreshToken },
        {
          where: {
            username: user.username,
          },
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // res.cookie("accessToken", accessToken, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // });

      return res.json({
        success: 1,
        message: " Logged in ,,,,,,,,,,,",
        data: user,
        token: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (e) {
    console.log(" are yrrrrr");
    console.log(e.message);
    console.log(e.statusCode);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "username", "email"],
    });
    if (users) {
      res.json({
        success: 1,
        data: users,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsername = async (req, res) => {
  let id = parseInt(req.query.id);

  console.log("id :", req.query.id);
  try {
    const user = await Users.findOne({
      attributes: ["name", "username", "email"],
      where: {
        id: req.query.id,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("error in geting username", error);
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("00000000000000000000000000000 ", refreshToken);
  if (!refreshToken)
    return res.json({
      success: 0,
      message: " No refresh token available ",
    });

  const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (!data) return res.sendStatus(204);

  const user = await Users.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);

  // console.log(" ................................");

  // console.log(user[0].username);
  //req.headers["authorization"] = null;
  console.log(" ................logout ................");
  console.log(user[0]);

  try {
    await Users.update(
      { refreshToken: null },
      {
        where: {
          username: user[0].username,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.json({
      success: 1,
      message: " logged out successfully !!!!!!! ",
    });
  } catch (error) {
    console.log(" some error ", error);
    return res.json({
      success: 0,
      message: error,
    });
  }
};

// // get single products
// const getSingleProduct = async (req, res) => {
//   let id = req.params.id;
//   let product = await Product.findOne({ where: { id: id } });
//   res.status(200).send(product);
// };

// // update a product
// const updateProduct = async (req, res) => {
//   let id = req.params.id;
//   const product = await Product.update(req.body, { where: { id: id } });
//   res.status(200).send('Product is Updated');
// };

// // delete a product
// const deleteProduct = async (req, res) => {
//   let id = req.params.id;
//   await Product.destroy({ where: { id: id } });
//   res.status(200).send("Product is deleted");
// };

// // get published product
// const getPublishedProduct = async (req, res) => {
//   const products = await Product.findAll({ where: { published: true } });
//   res.status(200).send(products);
// };

module.exports = {
  addUser,
  login,
  getUsers,
  logout,
  getUsername,
};
