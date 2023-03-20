const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authenticate } = require("../middleware/authentication.middleware");
const { AddressModel } = require("../Model/Address.model");
const { ProductModel } = require("../Model/Product.Model");
const { VendorModel } = require("../Model/vendor.model");
const OrderRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { OrderModel } = require("../Model/Order.Model");

// OrderRoutes.get("/allproductdata", async (req, res) => {
//   const order = req.query.order || "asc";
//   try {

//     if (req.query.colour && req.query.category && req.query.size && req.query.series) {
//       const products = await ProductModel.find({
//         series: { $regex: req.query.series, $options: "i" },
//         category: { $regex: req.query.category, $options: "i" },
//         colour: { $regex: req.query.colour, $options: "i" },
//         size: { $regex: req.query.size, $options: "i" },
//       });
//       res.send({ data: products, total: products.length });
//     }
//     else if (req.query.colour && req.query.category && req.query.size ) {
//       const products = await ProductModel.find({
//         category: { $regex: req.query.category, $options: "i" },
//         colour: { $regex: req.query.colour, $options: "i" },
//         size: { $regex: req.query.size, $options: "i" },
//       });
//       res.send({ data: products, total: products.length });
//     }
//     else if (req.query.colour && req.query.category && req.query.series ) {
//       const products = await ProductModel.find({
//         category: { $regex: req.query.category, $options: "i" },
//         colour: { $regex: req.query.colour, $options: "i" },
//         series: { $regex: req.query.series, $options: "i" },
//       });
//       res.send({ data: products, total: products.length });
//     }
//     else if (req.query.size && req.query.category && req.query.series ) {
//       const products = await ProductModel.find({
//         category: { $regex: req.query.category, $options: "i" },
//         size: { $regex: req.query.size, $options: "i" },
//         series: { $regex: req.query.series, $options: "i" },
//       });
//       res.send({ data: products, total: products.length });
//     }
//      else if (req.query.size && req.query.category) {
//       const products = await ProductModel.find({
//         category: { $regex: req.query.category, $options: "i" },
//         size: { $regex: req.query.size, $options: "i" },
//       });
//       res.send({ data: products, total: products.length });

//     }
//    else if (req.query.category&&req.query.color) {
//       const color = await ProductModel.find({
//         colour: { $regex: req.query.color, $options: "i" },
//         category: { $regex: req.query.color, $options: "i" },
//       });
//       res.send({ data: color, total: color.length });
//     } else if ( req.query.category &&  req.query.min && req.query.max)  {
//       const data = await ProductModel.find({
//         price: { $gt: req.query.min },
//         price: { $lt: req.query.max },
//         category: { $regex: req.query.category, $options: "i" },
//       });
//       res.send({ data: data, total: data.length });
//     } else if (req.query.brand) {
//       const products = await ProductModel.find({
//         brand: { $regex: req.query.brand, $options: "i" },
//       });
//       res.send({ data: products, total: products.length });
//     }
//       else if (req.query.series &&req.query.category) {
//         const series = await ProductModel.find({
//           series: { $regex: req.query.series, $options: "i" },
//           category: { $regex: req.query.category, $options: "i" },
//         });
//         res.send({ data: series, total: products.length });
//     }
//   else if ( req.query.category && req.query.min ) {
//       const price = await ProductModel.find({
//          price: { $gt: 1800, $lt: 2000 }
//       });
//       res.send({ data: price, total: products.length });
//   }
//     else {
//       const product = await ProductModel.find();
//       res.send({ data: product, total: product.length });
//     }
//   } catch (e) {
//     return res.status(500).send(e.message);
//   }
// });

OrderRoutes.get("/", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const product = await ProductModel.find({ userId: payload.userId });
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

OrderRoutes.get("/vendororder",authenticate, async (req, res) => {
const token=req.headers.authorization;
const decoded=jwt.verify(token, process.env.key);
  const id = req.params.id;
  try {
    const product = await OrderModel.find({vendorId:decoded.vendorId});
    // console.log(product)
    res.send({product,Total:product.length});
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.get("/vendortodayorder",authenticate, async (req, res) => {
//     const s = '2023-03-20T11:50:26.404+00:00';
//      const [y, m, d, hh, mm, ss, ms] = s.match(/\d+/g);
//      const date = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
//      const formatted = date.toLocaleString();
// console.log(formatted);

    const product = await OrderModel.find({createdAt:new Date()});
      try { 
        res.send({product,Total:product.length});
      } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
      }
    });




OrderRoutes.get("/:id", async (req, res) => {

  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.post("/add", authMiddleware, async (req, res) => {
  let data = req.body;
  const token = req.headers.authorization;
  const product = await ProductModel.findOne({ _id: data.productId });
  const address = await AddressModel.findOne({ _id: data.addressId });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = decoded.userId;
  try {
    let data1 = new OrderModel({
      title: data.title,
      image: data.image,
      price: data.price,
      totalPrice: data.price * data.quantity,
      discountPrice: data.discountPrice,
      color: data.color,
      paymentmode: data.paymentmode,
      quantity: data.quantity,
      addressId: address._id,
      productId: product._id,
      userId: decoded.userId,
      vendorId: product.vendorId,
    });
    let saved = await data1.save();

    res.send({ msg: "Data Added" });
  } catch (err) {
    res.send({ msg: "could not add Data" });
  }
});

OrderRoutes.patch("/update/:id", authenticate, async (req, res) => {
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

OrderRoutes.delete("/delete/:id", authenticate, async (req, res) => {
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
  OrderRoutes,
};
