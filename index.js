const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const {  ProductRoutes } = require("./Routes/Product.Routes");
const { UserModel } = require("./Model/User.model");
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

app.use("/vendor", VendorRoutes);
app.use("/product", ProductRoutes);
app.use("/")

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
