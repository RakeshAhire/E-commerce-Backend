const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    isorder: { type: String,default:"false" },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    totalPrice:{ type: Number, required: true },
    discountPrice:{ type: Number, required: true },
    color:{ type: String, required: true },
    paymentmode:{ type: String, required: true },
    ispaid:{ type: String, required: true,default:"false" },
    quantity: { type: Number, default: 1, min: 1 },
    status: { type: String,default:"placed",required: true },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true,
      },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    vendorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
    OrderModel
  };