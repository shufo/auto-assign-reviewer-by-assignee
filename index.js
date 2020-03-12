const core = require("@actions/core");
const github = require("@actions/github");
const context = github.context;
const wait = require("./wait");
const parseConfig = require('./lib/util');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput("milliseconds");
    console.log(`Waiting ${ms} milliseconds ...`);

    core.debug(new Date().toTimeString());
    await wait(parseInt(ms));
    core.debug(new Date().toTimeString());
    console.log(ms);
    core.setOutput("time", new Date().toTimeString());

    const token = core.getInput("token", { required: true });
    const octokit = new github.GitHub(token);
    const { data: pullRequest } = await octokit.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number
    });

    console.log(pullRequest);
    
    console.log(parseConfig());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
