const express = require("express");
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

CartRoutes.get("/", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const product = await CartModel.find({ userId: payload.userId });
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

CartRoutes.get("/:id",  async (req, res) => {
  const id = req.params.id;
  try {
    const product = await CartModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

CartRoutes.post("/add", authenticate, async (req, res) => {
  const payload=req.body
  try {
    const title = await CartModel.findOne({ productId: payload.productId });
    console.log(title)
    if (title) {
      res
        .status(200)
        .send({
          msg: "This item is already Present",
          error: true,
        });
    } else {
      const data = new CartModel(payload);
      await data.save();
      res.send({ msg: "Your item is added" });
    }
  } catch (err) {
    res.send({ msg: "could not add Item" });
  }
});

CartRoutes.patch("/update/:id", authenticate, async (req, res) => {
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

CartRoutes.delete("/delete/:id", authenticate, async (req, res) => {
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
