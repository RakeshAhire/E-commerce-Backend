const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productid:{ type: String, required: true },
    isorder: { type: String,default:"false" },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice:{ type: Number, required: true },
    deleveryDate:{ type: Number, required: true },
    color:{ type: String, required: true },
    offer:[ {type: String}],
    shipping: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    shipped: { type: String,default:"false"},
    dispatch: { type: String,default:"false"},
    payment: { type: String,default:"false"},
    address: {type: String,default:"false"},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CartModel = mongoose.model("order", orderSchema);

module.exports = {
    CartModel
  };