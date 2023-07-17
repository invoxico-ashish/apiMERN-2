const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log("database is connected");
  } catch (err) {}
};

module.exports = DBconnect;