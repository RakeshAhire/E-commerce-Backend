const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OtpModel = mongoose.model('Otp', OtpSchema);

module.exports = OtpModel;
