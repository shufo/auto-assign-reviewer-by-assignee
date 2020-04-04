const core = require("@actions/core");
const github = require("@actions/github");
const context = github.context;
const { parseConfig } = require("./lib/util");
const _ = require("lodash");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput("token", { required: true });
    const configPath = core.getInput("config");
    const config = parseConfig(configPath);

    core.debug("config");
    core.debug(JSON.stringify(config));

    const octokit = new github.GitHub(token);
    const { data: pullRequest } = await octokit.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number,
      reviewers: [],
    });

    const assignees = _.map(pullRequest.assignees, "login");

    _.each(assignees, (assignee) => {
      if (_.has(config, assignee)) {
        let reviewers = config[assignee];
        assignReviewers(octokit, reviewers);
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function assignReviewers(octokit, reviewers) {
  await octokit.pulls.createReviewRequest({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request.number,
    reviewers: reviewers,
  });
}

run();
