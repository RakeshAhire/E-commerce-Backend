const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    subTitle: { type: String },
    brand: { type: String },
    modelName: { type: String },
    networkServiceProvider: { type: String },
    os: { type: String },
    technology: { type: String },
    description: {
      heading: { type: String },
      bullet_points: [{ type: String }],
    },
    category: [{ type: String }],
    image: [{ type: String }],
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
