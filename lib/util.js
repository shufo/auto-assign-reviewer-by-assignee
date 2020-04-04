const yaml = require("yaml");
const fs = require("fs");

let parseConfig = function (content) {
  try {
    return yaml.parse(content);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { parseConfig: parseConfig };
