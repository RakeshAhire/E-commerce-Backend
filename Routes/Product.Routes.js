const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const ProductRoutes = express.Router();

const { ProductModel } = require("../Model/Product.Model");

ProductRoutes.get("/allproductdata", async (req, res) => {
  try {
    // category,Price,colour,size,price

    if (
      req.query.category &&
      req.query.colour &&
      req.query.size &&
      req.query.series &&
      req.query.max
    ) {
      const products = await ProductModel.find({
        series: { $regex: req.query.series, $options: "i" },
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
        packedPrice: { $lt: req.query.max },
      });
      res.send({ data: products, total: products.length });
    }

    // category,Price,colour,size
    else if (
      req.query.colour &&
      req.query.category &&
      req.query.size &&
      req.query.series
    ) {
      const products = await ProductModel.find({
        series: { $regex: req.query.series, $options: "i" },
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    }

    // category,Price,colour,size
    else if (
      req.query.colour &&
      req.query.category &&
      req.query.size &&
      req.query.max
    ) {
      const products = await ProductModel.find({
        packedPrice: { $lt: req.query.max },
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    }

    // category,Price,colour,size
    else if (
      req.query.colour &&
      req.query.category &&
      req.query.size &&
      req.query.max 
    ) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
        packedPrice: { $lt: req.query.max },
      });
      res.send({ data: products, total: products.length });
    }

    // category,colour,series
    else if (req.query.colour && req.query.category && req.query.series) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
        series: { $regex: req.query.series, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    }

    // category,size,series
    else if (req.query.size && req.query.category && req.query.series) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
        series: { $regex: req.query.series, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    }

    // category,colour,series
    else if (req.query.colour && req.query.category && req.query.series) {
      const products = await ProductModel.find({
        series: { $regex: req.query.series, $options: "i" },
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    }

    // category,size ,price
    else if (
      req.query.category &&
      req.query.size &&
      req.query.max
    ) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
        packedPrice: { $lt: req.query.max },
      });
      res.send({ data: products, total: products.length });
    }

    // category,color ,price
    else if (
      req.query.category &&
      req.query.colour &&
      req.query.max
    ) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        colour: { $regex: req.query.colour, $options: "i" },
        packedPrice: { $lt: req.query.max },
      });
      res.send({ data: products, total: products.length });
    }

    // category,series ,price
    else if (
      req.query.category &&
      req.query.series &&
      req.query.max
    ) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        series: { $regex: req.query.series, $options: "i" },
        packedPrice: { $lt: req.query.max },
      });
      res.send({ data: products, total: products.length });
    }

    //category,size
    else if (req.query.size && req.query.category) {
      const products = await ProductModel.find({
        category: { $regex: req.query.category, $options: "i" },
        size: { $regex: req.query.size, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    }

    //category,color
    else if (req.query.category && req.query.color) {
      const color = await ProductModel.find({
        colour: { $regex: req.query.color, $options: "i" },
        category: { $regex: req.query.color, $options: "i" },
      });
      res.send({ data: color, total: color.length });
    }

    //category,price
    else if (req.query.category &&  req.query.max) {
      const data = await ProductModel.find({
        price: { $lt: req.query.max },
        category: { $regex: req.query.category, $options: "i" },
      });
      res.send({ data: data, total: data.length });
    }

    //category,series
    else if (req.query.category && req.query.series) {
      const data = await ProductModel.find({
        series: { $regex: req.query.series, $options: "i" },
        category: { $regex: req.query.category, $options: "i" },
      });
      res.send({ data: data, total: data.length });

      //category,Price
    } else if ( req.query.sort) {
      const order = req.query.sort;
      if (order === "asc") {
        const products = await ProductModel.find({})
          .sort({ packedPrice: order })
          .lean()
          .exec();
        res.status(200).send({ products, total: products.length });
      } else if (order == "dsc") {
        const products = await ProductModel.find()
          .sort({ packedPrice: -1 })
          .lean()
          .exec();
        res.status(200).send({ products, total: products.length });
      }
    } 
    else if (req.query.q &&req.query.rating) {
      let products = await ProductModel.find({
        title: { $regex: req.query.q, $options: "i" },
        rating: { $gt: req.query.rating },
      });
      res.send({ data: products, total: products.length });
    } 
    else if ( req.query.rating) {
      const products = await ProductModel.find({

        rating: { $gt: req.query.rating },
      });
      res.send({ data: products, total: products.length });
    } 
    else if (req.query.brand) {
      const products = await ProductModel.find({
        brand: { $regex: req.query.brand, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    } else if (req.query.q) {
      let products = await ProductModel.find({
        title: { $regex: req.query.q, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    } else {
      const product = await ProductModel.find();
      res.send({ data: product, total: product.length });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

ProductRoutes.get("/", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const product = await ProductModel.find({ vendorId: payload.vendorId });
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

ProductRoutes.get("allproductdata/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

ProductRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

ProductRoutes.post("/add", authenticate, async (req, res) => {
  try {
    let data = req.body;
    let data1 = new ProductModel(data);
    let saved = await data1.save();

    res.send({ msg: "Data Added" });
  } catch (err) {
    res.send({ msg: "could not add Data" });
  }
});

ProductRoutes.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await ProductModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  console.log(hotelId);
  const vendorId_making_req = req.body.created_by;
  try {
    if (vendorId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await ProductModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

ProductRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await ProductModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const vendorId_making_req = req.body.created_by;
  try {
    if (vendorId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await ProductModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  ProductRoutes,
};
