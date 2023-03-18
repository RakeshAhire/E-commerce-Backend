const bcrypt = require("bcryptjs");
const userModel = require("../Model/user.model");
const dotenv = require("dotenv");


dotenv.config();

const signup = async (req, res) => {
  const user = req.body;
  let { name, email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400).send({
      status: "error",
      message: "User already exists",
    });
  } else {
    password = bcrypt.hashSync(password);
    let user = await userModel.create({
      name,
      email,
      password,
    });
    user = user.toJSON();
    delete user.password;

    return res.send({
      status: "Success",
      data: user,
    });
  }
};



module.exports = {
 
  signup,
};
