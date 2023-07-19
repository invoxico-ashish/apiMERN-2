const ErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    statusCode: 500,
    message: err,
  };

  // missing field error
  if (err.name === "validationError") {
    defaultErr.statusCode = 400;
    defaultErr.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //duplicate error
  if (err.code && err.code === 11000) {
    defaultErr.statusCode = 400;
    defaultErr.message = `${Object.keys(err.keyValue)} Field has to be unique`;
  }

  res.status(defaultErr.statusCode).json({ message: defaultErr.message });
};
module.exports = ErrorMiddleware;
