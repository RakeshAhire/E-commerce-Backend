const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    rating: { type: Number },
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


const CommentModel = mongoose.model("comment", CommentSchema);

module.exports = {
    CommentModel
  };