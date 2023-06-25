const dotenv = require("dotenv");
const logger = require("../utils/logger");

dotenv.config({
  encoding: "utf-8",
  override: false,
});

const NODE_ENV = process.env.NODE_ENV;

exports.NODE_ENV = NODE_ENV;
module.exports = process.env;

if (NODE_ENV !== "production") {
  logger.info("Environment variables loaded!");
}
