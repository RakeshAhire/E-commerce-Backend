const express = require("express");
const {CommentModel}=require("../Model/Comment.Model")

const { authenticate } = require("../middleware/authentication.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otp.model");
const TotalcommentRoutes = express.Router();




// TotalRoutes.get("/allcomment", async (req, res) => {
//   try {
//     const product = await CommentModel.find();
//     res.send({ data: product });
//   } catch (error) {
//     res.status(500).send({
//       error: true,
//       msg: "something went wrong",
//     });
//   }
// });


// TotalRoutes.get("/productcomment/:id", async (req, res) => {
//   const Id = req.params.id;
//   try {
//     const product = await CommentModel.find({ productId: Id });
//     res.send({ data: product,total:product.length });
//   } catch (error) {
//     res.status(500).send({
//       error: true,
//       msg: "something went wrong",
//     });
//   }
// });




// TotalRoutes.get("/:id", async (req, res) => {
//   const Id = req.params.id;
//   try {
//     const product = await CommentModel.find({ productId: Id });
//     console.log(product);
//     res.send({ data: product });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({
//       error: true,
//       msg: "something went wrong",
//     });
//   }
// });


TotalcommentRoutes.post("/add", authMiddleware, async (req, res) => {
 
  let payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const data=await OtpModel.find({_id:decoded.userId})
  console.log(payload)
 
//   try {
   
//     let data1 = new CommentModel({
//         username: ,
//         rating: ,
//         review: ,
//         info:,
//         productId:
//     });
//     // console.log(data1)
//     let saved = await data1.save();
//     res.send({ msg: "Your Comment is Added" });
  
//  } catch (err) {
//     res.send(err);
//   }
});


// TotalRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
//   const user=(req.body.userId)
//   const Id = req.params.id;
//   const payload = req.body;

//   const data = await CommentModel.findOne({ _id: Id });
//   const data1=data.userId
//   const a=(JSON.stringify(data1))
//   const b=(JSON.stringify(user))
//   try {
//     if (a !== b) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await CommentModel.findByIdAndUpdate({ _id: Id }, payload);
//       res.send({ msg: "updated Sucessfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

// TotalRoutes.delete("/delete/:id", authenticate, async (req, res) => {
//   const user=(req.body.userId)
//   const Id = req.params.id;
//   const payload = req.body;

//   const data = await CommentModel.findOne({ _id: Id });
//   const data1=data.userId
//   const a=(JSON.stringify(data1))
//   const b=(JSON.stringify(user))
//   try {
//     if (a !== b) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await CommentModel.findByIdAndDelete({ _id: Id });
//       res.send("Delete Your Comment");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "Something went wrong" });
//   }
// });





module.exports = { TotalcommentRoutes };
