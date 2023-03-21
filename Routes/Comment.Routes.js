const express = require("express");
const {CommentModel}=require("../Model/Comment.Model")

const CommentRoutes = express.Router();
const { authenticate } = require("../middleware/authentication.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otp.model");

CommentRoutes.get("/allcomment", async (req, res) => {
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
CommentRoutes.get("/", async (req, res) => {
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


CommentRoutes.post("/add", authMiddleware, async (req, res) => {

  let payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const data=await OtpModel({_id:decoded.userId})
  const name=data.name
   const d=(JSON.stringify(data._id))
  const e=(JSON.stringify(decoded.userId))
  // console.log(d)
  console.log(name)
  try {
    if(d==e){

   
    let data1 = new CommentModel({
      comment:payload.comment,
      rating:payload.rating,
      username:data.name,
      image:payload.image,
      userId:decoded.userId,
      productId:payload.productId
    });
    // console.log(data1)
    let saved = await data1.save();
    res.send({ msg: "Your Comment is Added" });
  }else{
    res.send({ msg: "Your Comment is not Added" });
  }
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
