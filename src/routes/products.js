var express = require("express");
var router = express.Router();
const Product = require("../models/Product");
const ProductController = require("../controller/ProductController");

/* GET users listing. */
router.route("/").get(ProductController.searchProducts);

module.exports = router;
