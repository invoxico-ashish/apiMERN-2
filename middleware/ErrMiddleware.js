const ErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaulterr = {
    statusCode: 500,
    message: err,
  };

  // missing field error
  if (err.name === "validationError") {
    defaulterr.statusCode = 400;
    defaulterr.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //duplicate error
  if (err.code && err.code === 11000) {
    defaulterr.statusCode = 400;
    defaulterr.message = `${Object.keys(err.keyValue)} Field has to be unique`;
  }

  res.status(defaulterr.statusCode).json({ message: defaulterr.message });
};
module.exports = ErrorMiddleware;
