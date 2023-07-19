const UserModel = require("../model/UserModel");

exports.updateUserController = async (req, res, next) => {
  const { name, email, lastname, location } = req.body;
  console.log(req.body)
  if (!req.body) {
    next("Please provide all field");
  }
  const user = await UserModel.findOne({ id: req._id });
  user.name = name;
  user.lastName = lastname;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};
