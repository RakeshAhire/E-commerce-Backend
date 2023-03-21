const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    rating: { type: Number },
    username:{ type: String },
    image:{ type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    product_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    }
  },

  {
    versionKey: false,
    timestamps: true,
  }
);


const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = {
    CommentModel
  };