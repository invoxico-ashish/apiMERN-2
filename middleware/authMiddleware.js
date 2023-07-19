const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next("Auth failed");
  }
  try {
    console.log(authHeader);
    const token = authHeader.split(" ")[1];

    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.userId;
    console.log("dnoiqbfo");
    console.log( req.user);
    next();
  } catch (err) {
    console.log(err);
    next("Auth failed");
  }
};
module.exports = userAuth;
