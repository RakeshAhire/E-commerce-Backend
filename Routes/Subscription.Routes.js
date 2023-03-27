const express = require("express");
const AdminMiddleware = require("../middleware/Admin.middleware");
const { EmailModel } = require("../Model/Email.Model");

const SubscriptionRoutes = express.Router();




SubscriptionRoutes.get("/", async (req, res) => {
  try {
    const product = await EmailModel.find();
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



SubscriptionRoutes.post("/add",AdminMiddleware, async (req, res) => {
    let payload = req.body;
    try {
      let data1 = new EmailModel({adminId:user.body.adminId},payload);
      console.log(data1)
      let saved = await data1.save();
      res.send({ msg: "Your Email is Added" });
    } catch (err) {
      res.send({ msg: "Your Email is not Added" });
    }
  });


SubscriptionRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  try {
      await EmailModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

SubscriptionRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
 
  try {
  
    await EmailModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted Your Address");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  SubscriptionRoutes,
};
