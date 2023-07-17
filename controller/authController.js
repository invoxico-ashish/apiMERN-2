const userModel = require("../model/UserModel");
const { use } = require("../routes/authRoutes");
// const { body, validationResult } = require("express-validator");
// const errorMiddleware = require("../middleware/ErrMiddleware");

exports.registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    next("name is req");
  }
  if (!email) {
    next("email is required & should be greater than 6");
  }
  if (!password) {
    next(!password);
  }
  const exisitingUser = await userModel.findOne({ name, email, password });
  if (exisitingUser) {
    return res
      .status(200)
      .send({ success: false, message: "already register" });
  }
  const user = await userModel.create({ name, email, password });

  //token-----------------------

  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  //VALIDATION
  if (!email || !password) {
    next("Invalid Username or Passwordddddd");
    console.log("hdqagwdifqw");
  }
  //FIND BY  EMAil
  const user = await userModel.findOne({ email }).select("+password");
  if (!email) {
    next("Invalid Credentials");
  }
  const isMatch = await user.comparePassword(password);
  console.log(password);
  if (!isMatch) {
    next("Invalid username or Password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res
    .status(200)
    .json({ success: true, message: "Login Successfully", user, token });
};

// exports.loginController = async (req, res, next) => {
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password can't be blank ").exists(),
//   ];

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const email = req.body.email;
//   // const { email, password } = req.body.email;
//   console.log(req.body);
//   try {
//     let user = await userModel.findOne({ email });
//     console.log(email);
//     if (!user) {
//       return res
//         .status(400)
//         .json({ error: "Please try to login with correct  EEE credentials" });
//     }

//     const passwordCompare = await bcrypt.compare(password, user.password);
//     if (!passwordCompare) {
//       return res
//         .status(400)
//         .json({ error: "Please try to login with correct credentials" });
//     }

//     const data = {
//       user: {
//         id: user.id,
//       },
//     };
//     const authToken = jwt.sign(data, JWT_SECRET);
//     res.json({ authToken });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// };

// ('/login',[
//   body('email','Enter a valid email').isEmail(),
//   body('password', 'Password can\'t be blank ').exists(),
// ], async (req, res) => {
//   //  if there are errors,  return bad request and the errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//   }

//   const {email,password} = req.body;

//   try {
//       let user = await User.findOne({ email });
//       if(!user){
//           return res.status(400).json({error: "Please try to login with correct credentials"})
//       }

//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if(!passwordCompare){
//           return res.status(400).json({error: "Please try to login with correct credentials"})
//       }

//       const data = {
//           user : {
//               id:user.id
//           }
//       }

//       const authToken = jwt.sign(data,JWT_SECRET);
//       res.json({authToken})

//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }

// }
// )
