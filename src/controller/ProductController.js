const Product = require("../models/Product");

const fields = [
  "name^3",
  "fertiliser_group_name^2",
  "description",
  "Country_of_origin",
  "Manufacturer_name",
  "categoryName^2",
  "ProductVariants.size",
  "ProductVariants.packaging",
];

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.search({
      multi_match: {
        query: req.query.search,
        fields,
        fuzziness: 2,
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
