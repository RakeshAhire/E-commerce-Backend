const mongoose = require("mongoose");
require("dotenv").config();

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  img:{ type: String},
  password: { type: String, required: true },
  address:{ type: String, required: true },
  city:{ type: String, required: true },
  pincode:{ type: String, required: true },
  phone:{ type: Number, required: true },
  state:{ type: String, required: true },
  rating:{ type: String, default:"0"},
  comment:{ type: String, default:"0"},
  userType: { type: String, required: true, default: "vendor" }
});

const VendorModel = mongoose.model("Vendor", vendorSchema);

module.exports = { VendorModel };