const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");

const User = require("../Model/user.model");
const { Otp } = require("../Model/otpModel");

const router = express.Router();

const SMS_GATEWAY_API_KEY = process.env.SMS_GATEWAY_API_KEY;
const OTP_LENGTH = 6;

router.post("/signup", async (req, res) => {
  try {
    const { number } = req.body;

    const user = await User.findOne({ number });
    if (user) {
      return res.status(400).send("User already registered");
    }

    const OTP = otpGenerator.generate(OTP_LENGTH, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const greenwebsms = new URLSearchParams();
    greenwebsms.append("token", SMS_GATEWAY_API_KEY);
    greenwebsms.append("to", `+${number}`);
    greenwebsms.append("message", `Verification Code ${OTP}`);

    await axios.post("http://api.greenweb.com.bd/api.php", greenwebsms);

    const otp = new Otp({ number, otp: OTP });

    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);

    const result = await otp.save();
    return res.status(200).send({ status: "success", otp: OTP });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/signup/verify", async (req, res) => {
  try {
    const { number, otp } = req.body;

    const otpHolder = await Otp.find({ number });
    if (otpHolder.length === 0) {
      return res.status(404).send("You have used an expired OTP");
    }

    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(otp, rightOtpFind.otp);

    if (rightOtpFind.number === number && validUser) {
      const user = new User(_.pick(req.body, ["number"]));
      const token = user.generateJWT();
      const result = await user.save();
      const OTPDelete = await Otp.deleteMany({ number: rightOtpFind.number });

      return res.status(200).send({
        message: "User Registration Successful",
        token,
        data: result,
      });
    } else {
      return res.status(400).send("Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
