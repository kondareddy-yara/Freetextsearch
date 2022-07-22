const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const esClient = require("../client/EsConfig");

const Schema = mongoose.Schema;

const ProductVariant = new Schema({
  product_id: { type: Number },
  id: { type: Number },
  min_price: { type: Number, es_indexed: true },
  max_price: { type: Number, es_indexed: true },
  sku: { type: String },
  size: { type: String, es_indexed: true },
  packaging: { type: String, es_indexed: true },
  photo: { type: String, es_indexed: true },
  internal_id: { type: String },
  active: { type: Boolean },
});

const crop = new Schema({
  cropName: { type: String, es_indexed: true },
});

const ProductSchema = new Schema({
  name: {
    type: String,
    es_indexed: true,
  },
  fertiliser_group_name: {
    type: String,
    es_indexed: true,
  },
  description: {
    type: String,
    es_indexed: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  Country_of_origin: {
    type: String,
    es_indexed: true,
  },
  Manufacturer_name: {
    type: String,
    es_indexed: true,
  },
  productCategoryId: {
    type: Number,
  },
  categoryName: {
    type: String,
    es_indexed: true,
  },
  ProductVariants: [ProductVariant],
  Crops: [crop],
});

ProductSchema.plugin(mongoosastic, { esClient });

const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;
