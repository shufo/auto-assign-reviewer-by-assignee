const yaml = require("yaml");

const parseConfig = function (content) {
  try {
    return yaml.parse(content);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { parseConfig: parseConfig };
