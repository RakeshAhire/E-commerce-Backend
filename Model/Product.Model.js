const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    price_slab: { type: Number },
    minprice: { type: Number },
    maxprice: { type: Number },
    avgrating: { type: Number },
    rating: { type: Number },
    info: { type: String },
    brand: { type: String },
    tags: [{ type: String }],
    description: [
      { 
      heading: {type:String}, 
      bullet_points: [
        {type:String}
      ],
      ending:{type:String}
     }
  ],
  additionalinfo:[
    { type: String }
  ],
    series: [{ type: String }],
    category: [{ type: String }],
    discount: { type: String },
    image: [{ type: String }],
    review: { type: String },
    size: [{ type: String }],
    colour: [{ type: String }],
    cod: { type: String },
    shipping: { type: String },
    delivery: { type: String },
    items_left: { type: Number },
    sold_by_location: { type: String },
    sold_by: { type: String },
    emi: { type: Number },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
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
