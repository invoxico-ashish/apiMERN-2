const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next("Auth failed");
  }
  console.log(process.env.SECRET_KEY);
  try {
    console.log(authHeader);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY);
    next();
  } catch (err) {
    console.log(err);
    next("Auth failed");
  }
};
module.exports = userAuth;
