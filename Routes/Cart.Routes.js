const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authenticate } = require("../middleware/authentication.middleware");
const { CartModel } = require("../Model/Cart.Model");
const CartRoutes = express.Router();



CartRoutes.get("/allproductdata", async (req, res) => {
  const order = req.query.order || "asc";
  try {
    if (req.query.category) {
      const products = await CartModel.find({
        category: { $regex: req.query.category, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    } else if (req.query.color) {
      const color = await CartModel.find({
        colour: { $regex: req.query.color, $options: "i" },
      });
      res.send({ data: color, total: color.length });
    } else if ((req.query.max) && (req.query.min)) {
      const data = await CartModel.find({
        price: { $gt: req.query.max, $lt: req.query.min },
      });
      res.send({ data: data, total: data.length });
    } else {
      const product = await CartModel.find();
      res.send({ data: product, total: product.length });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

CartRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await CartModel.find({ userId: payload.userId });
    res.send({ data: product,Total:product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CartRoutes.get("/:id",  async (req, res) => {
  const id = req.params.id;
  try {
    const product = await CartModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

CartRoutes.post("/add", authMiddleware, async (req, res) => {
  let payload = req.body;
  // console.log(payload)
  try {
    let data1 = new CartModel(payload);
    console.log(data1)
    let saved = await data1.save();
    res.send({ msg: "Your item is Added" });
  } catch (err) {
    res.send(err);
  }
});


CartRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await CartModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  console.log(hotelId);
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

CartRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await CartModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await CartModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  CartRoutes,
};
