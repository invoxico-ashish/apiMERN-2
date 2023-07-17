const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const DBconnect = require("./config/Db");
const ErrorMiddleware = require("./middleware/ErrMiddleware");
const bodyParser = require("body-parser");
require("express-async-errors");

// configs
dotenv.config();
DBconnect();
PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

//routes import
app.use("/api/vi/test", require("./routes/testRoutes"));
app.use("/api/vi/auth", require("./routes/authRoutes"));

// err/validation middleware
app.use(ErrorMiddleware);

app.listen(8000, (err) => {
  if (!err) {
    console.log(`server is runnig ON ${PORT}`);
  } else {
    console.log(err);
  }
});
