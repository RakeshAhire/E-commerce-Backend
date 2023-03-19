const router = require("express").Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const { Otp } = require("../Model/otpModel");

router.post("/signup", async (req, res) => {
  const user = await Otp.findOne({
    number: req.body.number,
    email: req.body.email
  });
  if (user) {
    return res.status(400).send("User already Registred!");
  }

  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const number = req.body.number;
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  const greenwebsms = new URLSearchParams();
  greenwebsms.append("token", "05fa33c4cb50c35f4a258e85ccf50509");
  greenwebsms.append("to", `+${number}`);
  greenwebsms.append("message", `Verification Code ${OTP}`);
  axios
    .post("http://api.greenweb.com.bd/api.php", greenwebsms)
    .then((response) => {
      console.log(response.data);
    });

  const otp = new Otp({ number: number,
    name:name,
    password:password,
    email:email,
    otp: OTP });

  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  otp.password=await bcrypt.hash(otp.password, salt);

  const result = await otp.save();
  return res.status(200).send({ status: "success", otp: OTP });
});

router.post("/login", async (req, res) => {
  const { number, email, otp } = req.body;

  // Validate the request body
  if (!number || !email || !otp) {
    return res.status(400).send("Invalid request");
  }

  const otpHolder = await Otp.find({ number, email });
  if (otpHolder.length === 0) {
    return res.status(401).send("Unauthorized");
  }

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(otp, rightOtpFind.otp);

  if (validUser) {
    const user = new Otp({ number });
    const token = user.generateJWT();
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({ number: rightOtpFind.number });

    // Log the successful login attempt
    console.log(`Successful login for number ${number} from IP ${req.ip}`);

    return res.status(200).send({
      message: "User login successful!",
      token,
      data: result,
    });
  } else {
    // Log the failed login attempt
    console.log(`Failed login for number ${number} from IP ${req.ip}`);

    return res.status(401).send("Incorrect OTP");
  }
});

module.exports = {router};