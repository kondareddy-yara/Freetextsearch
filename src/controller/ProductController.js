const Product = require("../models/Product");

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.search({
      query_string: {
        query: req.query.search,
      },
    });
    res.status(200).json({
      status: "success",
      results: products.body.hits.hits.length,
      data: {
        products: products.body.hits.hits,
      },
    });
  } catch (err) {
    console.error(err.message, err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};