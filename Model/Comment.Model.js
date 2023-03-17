const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    productid:{ type: String, required: true },
    comment:{ type: String, required: true },
    rating:{ type: String, required: true },
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

const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = {
    CommentModel
  };