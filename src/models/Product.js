const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

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
});

ProductSchema.plugin(mongoosastic);
const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;
