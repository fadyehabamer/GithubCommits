const fs = require('fs');
const { execSync } = require('child_process');
const { v1 } = require('uuid');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const fakeCommits = async () => {
  for (let index = 1; index <= 1000; index++) {
    try {
      let commitMessage = `This i a commit number: ${v1()}`

      await fs.writeFileSync('./commits.txt', `${commitMessage}\n`);
      await execSync(`git add . && git commit -m"${commitMessage}"`);
      await delay(50) /// waiting 1 second.
      console.log(`===================> { ${index} } <=====================`);

    } catch (error) {
      console.log(error);
    }
  }

  await execSync('git push -u origin master && git push -u origin2 master');

}

fakeCommits();