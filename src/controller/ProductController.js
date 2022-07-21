const Product = require("../models/Product");

const fields = [
  "name",
  "fertiliser_group_name",
  "description",
  "Country_of_origin",
  "Manufacturer_name",
  "categoryName",
];

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.search({
      multi_match: {
        query: "calcium",
        fields,
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
