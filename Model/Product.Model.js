const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price:{ type: Number, required: true },
    price_slab:{ type: Number, required: true },
    minprice: { type: Number, required: true },
    maxprice: { type: Number, required: true },
    rating: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category:[{ type: String, required: true }],
    discount: { type: String, required: true },
    image: { type: String, required: true },
    review:{ type: String, required: true },
    size: [{ type: String, required: true }],
    colour: [{ type: String, required: true }],
    cod: { type: String, required: true },
    shipping: { type: String, required: true },
    delivery: { type: String, required: true },
    items_left: { type: Number },
    sold_by_location: { type: String, required: true },
    sold_by: { type: String, required: true },
    emi: { type: Number },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
    required: true
  },
},
   
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
    ProductModel
  };