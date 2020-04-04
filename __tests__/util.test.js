const { parseConfig } = require("../lib/util");

test("config parser", async () => {
  const config = parseConfig(__basedir + "/.github/auto-assigner.yml");
  expect(config["shufo"]).toMatchObject(["shufo2"]);
});
