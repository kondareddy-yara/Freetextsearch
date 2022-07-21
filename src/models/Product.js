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
  photo: { type: String },
  internal_id: { type: String },
  active: { type: Boolean },
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
  Crops: [Number],
});

ProductSchema.plugin(mongoosastic, { esClient });

const Product = mongoose.model("Product", ProductSchema, "products");

//Only run one time as elastic search only creates mapping once and it cannot be overridden

// Product.createMapping({
//   settings: {
//     index: {
//       max_ngram_diff: 2,
//     },
//     analysis: {
//       analyzer: {
//         ngramtokenizer: {
//           tokenizer: "standard",
//           filter: ["3_5_grams", "lowercase"],
//         },
//       },
//       filter: {
//         "3_5_grams": {
// need to decide best size
//           type: "ngram",
//           min_gram: 3,
//           max_gram: 5,
//         },
//       },
//     },
//   },
//   mappings: {
//     properties: {
//       name: {
//         type: "text",
//         analyzer: "ngramtokenizer",
//       },
//       fertiliser_group_name: {
//         type: "text",
//         analyzer: "ngramtokenizer",
//       },
//       categoryName: {
//         type: "text",
//         analyzer: "ngramtokenizer",
//       },
//     },
//   },
// });

module.exports = Product;
