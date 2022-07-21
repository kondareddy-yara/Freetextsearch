const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config({ path: "./.env" });

const DB = process.env.DBHOST;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/product.json`, "utf-8")
);

const deleteIndex = async () => {
  try {
    await fetch("http://localhost:9200/products", {
      method: "DELETE",
      body: "",
    });
  } catch (err) {
    console.log(err);
    //
  }
};

//Only run one time as elastic search only creates mapping once and it cannot be overridden
const createMapping = async (Product) => {
  await Product.createMapping({
    settings: {
      index: {
        max_ngram_diff: 2,
      },
      analysis: {
        analyzer: {
          ngramtokenizer: {
            tokenizer: "standard",
            filter: ["4_4_grams", "lowercase"],
          },
        },
        filter: {
          "4_4_grams": {
            type: "ngram",
            min_gram: 4,
            max_gram: 4,
          },
        },
      },
    },
    mappings: {
      properties: {
        name: {
          type: "text",
          analyzer: "ngramtokenizer",
        },
        fertiliser_group_name: {
          type: "text",
          analyzer: "ngramtokenizer",
        },
        categoryName: {
          type: "text",
          analyzer: "ngramtokenizer",
        },
      },
    },
  });
};

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await deleteIndex();
    await createMapping(Product);
    await Product.create(products);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.remove();
    await deleteIndex();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
