const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(productRoutes);

app.listen("3030", () => {
    console.log("Server running.");
});