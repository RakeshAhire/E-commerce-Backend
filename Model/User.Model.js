const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const key = "774bgtumnhnhydscffsr";


const userSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: 8,
    },
    number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      number: this.number,
    },
    ke,
    { expiresIn: "7d" }
  );
  return token;
};

const userModel = mongoose.model("users", userSchema);

module.exports = {userModel};
