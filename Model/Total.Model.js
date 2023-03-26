const mongoose = require("mongoose");

const TotalcommentSchema = new mongoose.Schema(
  {
    username: { type: String },
    rating: { type: Number },
    review: { type: Number },
    info:{ type: String },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const Totalcommentmodel = mongoose.model("TotalComment", TotalcommentSchema);

module.exports = {
    Totalcommentmodel
};
