const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");

const genToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
      username: user.username,
      email: user.email,
    },
    jwtKey,
    { expiresIn: "100h" }
  );

  return token;
};

module.exports = genToken;
