const Product = require("../models/Product");

const fields = [
  "name^3",
  "fertiliser_group_name^2",
  "description",
  "Country_of_origin",
  "Manufacturer_name",
  "categoryName^2",
  // "ProductVariants.size",
  "ProductVariants.packaging",
  "Crops.cropName^4",
];

const filterResponse = (products) => {
  const filteredProducts = products.body.hits.hits.map(
    (product) => product["_source"]
  );
  return filteredProducts;
};

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.search(
      {
        multi_match: {
          query: req.query.search,
          fields,
          fuzziness: 1,
        },
      },
      { from: 0, size: 80 }
    );

    const filteredProducts = filterResponse(products);

    res.status(200).json({
      status: "success",
      results: filteredProducts.length,
      data: {
        products: filteredProducts,
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
