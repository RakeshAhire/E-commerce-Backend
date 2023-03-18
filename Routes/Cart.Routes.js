const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const { CartModel } = require("../Model/Cart.Model");
const CartRoutes = express.Router();



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
  try {
    let data = req.body;
    let data1 = new CartModel(data);
    let saved = await data1.save();

    res.send({ msg: "Your item is Added" });
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
