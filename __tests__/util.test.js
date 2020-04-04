const { parseConfig } = require("../lib/util");
const fs = require('fs');

test("config parser", async () => {
  const content = fs.readFileSync(__basedir + '/.github/auto-assigner.yml', {
    encoding: "utf8",
  });
  const config = parseConfig(content);
  expect(config["shufo"]).toMatchObject(["shufo2"]);
});
