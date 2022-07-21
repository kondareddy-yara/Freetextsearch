const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const esClient = new Client({
  node: "http://localhost:9200",
});

module.exports = esClient;
