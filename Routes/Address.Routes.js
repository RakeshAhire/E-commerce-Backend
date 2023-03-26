const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const { AddressModel } = require("../Model/Address.model");
const AddressRoutes = express.Router();




AddressRoutes.get("/", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const product = await AddressModel.find({ userId: payload.userId });
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



AddressRoutes.post("/add", authenticate, async (req, res) => {
  const payload=req.body
  try {
    const title = await AddressModel.findOne({ address: payload.address });
    console.log(title)
    if (title) {
      res
        .status(200)
        .send({
          msg: "This Address is already Present",
          error: true,
        });
    } else {
      const data = new AddressModel(payload);
      await data.save();
      res.send({ msg: "Your address is added" });
    }
  } catch (err) {
    res.send({ msg: "could not add Address" });
  }
});

AddressRoutes.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await AddressModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  console.log(hotelId);
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await AddressModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

AddressRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await AddressModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await AddressModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted Your Address");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  AddressRoutes,
};
