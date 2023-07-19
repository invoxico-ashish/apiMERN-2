const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next("Auth failed");
  }
  try {
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    console.log(err);
    next("Auth failed");
  }
};
module.exports = userAuth;
