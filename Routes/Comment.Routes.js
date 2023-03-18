const express = require("express");
const {CommentModel}=require("../Model/Comment.Model")

const CommentRoutes = express.Router();
const { authenticate } = require("../middleware/authentication.middleware");


CommentRoutes.get("/", authenticate, async (req, res) => {
  try {
    const product = await CommentModel.find();
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.get("/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const product = await CommentModel.find({ productId: Id });
    console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});


CommentRoutes.post("/add", authenticate, async (req, res) => {
  let payload = req.body;
  // console.log(payload)
  try {
    let data1 = new CommentModel(payload);
    console.log(data1)
    let saved = await data1.save();
    res.send({ msg: "Your Comment is Added" });
  } catch (err) {
    res.send(err);
  }
});


CommentRoutes.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const data = await CommentModel.findOne({ _id: Id });

  const hotelId = data.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CommentModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

CommentRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await CommentModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await CommentModel.findByIdAndDelete({ _id: Id });
      res.send("Delete Your Comment");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});



module.exports = { CommentRoutes };
