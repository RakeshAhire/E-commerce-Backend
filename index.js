const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { ProductRoutes } = require("./Routes/Product.Routes");
const { CommentRoutes } = require("./Routes/Comment.Routes");
const { AddressRoutes } = require("./Routes/Address.Routes");
const { CartRoutes } = require("./Routes/Cart.Routes");
const { VendorRoutes } = require("./Routes/Vendor.Routes");

const {router} = require("./Routes/userRouter");




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


app.use("/api/user",router);



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
