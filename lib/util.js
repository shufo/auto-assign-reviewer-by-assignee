const yaml = require("yaml");
const fs = require("fs");

let parseConfig = function (path) {
  const file = fs.readFileSync(path, {
    encoding: "utf8",
  });
  try {
    return yaml.parse(file);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { parseConfig: parseConfig };
