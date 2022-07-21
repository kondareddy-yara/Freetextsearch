const Product = require("../models/Product");

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.search({
      match: {
        name: "yara",
      },
    });
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
