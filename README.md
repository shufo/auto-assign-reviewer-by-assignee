# Auto Assign Reviewer By Assignee

Automatically assigns reviewer based on assignee

## Configuration

create configuration file

```yaml
---
# assignee: reviewer
shufo:
  - shufo2
# you can set multiple reviewers
smith:
  - user1
  - user2
```

create action file

```yaml
name: "Auto Assign"
on:
  pull_request:
    types: [assigned]

jobs:
  # test action works running from the graph  
  assign_reviewer:
    runs-on: ubuntu-latest
    steps:
    - uses: shufo/auto-assign-reviewer-by-assignee@v1.0.0
      with:
        config: '.github/auto-assigner.yml'
        token: ${{ secrets.GITHUB_TOKEN }}
```

## Example

![image](https://user-images.githubusercontent.com/1641039/78450313-b753bd80-76b8-11ea-9a25-0d6bcf858227.png)
