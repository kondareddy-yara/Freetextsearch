const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const esClient = require("../client/EsConfig");

const Schema = mongoose.Schema;

const ProductVariant = new Schema({
  product_id: { type: Number },
  id: { type: Number },
  min_price: { type: Number },
  max_price: { type: Number },
  sku: { type: String },
  size: { type: String },
  packaging: { type: String },
  photo: { type: String },
  internal_id: { type: String },
  active: { type: Boolean },
});

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  fertiliser_group_name: {
    type: String,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  Country_of_origin: {
    type: String,
  },
  Manufacturer_name: {
    type: String,
  },
  productCategoryId: {
    type: Number,
  },
  categoryName: {
    type: String,
  },
  ProductVariants: [ProductVariant],
  Crops: [Number],
});

ProductSchema.plugin(mongoosastic, { esClient });

const Product = mongoose.model("Product", ProductSchema, "products");

const stream = Product.synchronize();
stream.on("error", function (err) {
  console.log("Error while synchronizing" + err);
});

module.exports = Product;
