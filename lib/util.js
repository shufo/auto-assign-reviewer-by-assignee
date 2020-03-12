const yaml = require("yaml");
const fs = require("fs");

let parseConfig = function() {
  const file = fs.readFileSync(".github/auto-assigner.yml", {
    encoding: "utf8"
  });
  try {
    return yaml.parse(file);
  } catch (error) {
    console.log(error);
  }
};

module.exports = parseConfig;
