const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const esClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: process.env.ELASTICUSERNAME,
    password: process.env.ELASTICPASSWORD,
  },
});

module.exports = esClient;
