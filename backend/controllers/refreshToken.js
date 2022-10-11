const db = require("../models");
const Users = db.users;
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  //   console.log(req.cookies.refreshToken);
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    // find the user with this refreshtoken in database
    // it will reutrn an array obj so user user[0] to get any data

    const user = await Users.findAll({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    const check = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const name = user[0].name;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userId, name, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );
        res.json({ accessToken });
      }
    );
    // if (!check)
    //   return res.json({
    //     success: 0,
    //     message: " can't verify it",
    //   });
    // else
    //   return res.json({
    //     success: 0,
    //     message: " its done ",
    //     data: user[0],
    //     token: accessToken,
    //   });
  } catch (error) {
    console.log(" some error occured in refreshing the token");
    res.json({
      success: 0,
      message: " not working",
    });
  }
};

module.exports = refreshToken;
