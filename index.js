const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { ProductRoutes } = require("./Routes/Product.Routes");

const { CommentRoutes } = require("./Routes/Comment.Routes");
const { AddressRoutes } = require("./Routes/Address.Routes");
const { CartRoutes } = require("./Routes/Cart.Routes");
const userRouter = require("./Routes/userRouter.js");
const {signup} = require("./controllers/user.controller.js");
const { VendorRoutes } = require("./Routes/Vendor.Routes");



require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/user", userRouter);

app.post("/signup", signup);

app.use("/vendor",VendorRoutes)

app.use("/product", ProductRoutes);
app.use("/comment", CommentRoutes);
app.use("/cart", CartRoutes);
app.use("/address", AddressRoutes);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to db");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`Server running at ${process.env.port}`);
});
