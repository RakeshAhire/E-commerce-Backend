const express = require("express");
const { ContactModel } = require("../Model/contact.model");
const contactRoutes = express.Router();




contactRoutes.get("/", async (req, res) => {

  try {
    const product = await ContactModel.find();
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



contactRoutes.post("/add", async (req, res) => {
    let payload = req.body;
    try {
      let data1 = new ContactModel(payload);
      console.log(data1)
      let saved = await data1.save();
      res.send({ msg: "Your contact is Added" });
    } catch (err) {
      res.send({ msg: "Your contact is not Added" });
    }
  });


contactRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  try {
      await ContactModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

contactRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
 
  try {
      await ContactModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted Your Address");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  contactRoutes,
};
