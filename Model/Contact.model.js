const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String },
    Email: { type: String },
    phone: { type: Number },
    product: { type: String },
    category: { type: String },
    size: { type: String },
    comment: { type: String },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = {
  ContactModel,
};
