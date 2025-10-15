const fs = require("fs");
const { execSync } = require("child_process");
const { v1 } = require("uuid");

// Simple async delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fakeCommits = async () => {
  try {
    // ✅ Configure git identity (required in GitHub Actions)
    execSync('git config user.name "github-actions[bot]"');
    execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');

    console.log("✅ Git identity configured");

    // Run up to 1000 fake commits
    for (let index = 1; index <= 1000; index++) {
      try {
        const commitMessage = `This is a commit number: ${v1()}`;

        // Write message to file to ensure a change exists
        fs.writeFileSync("./commits.txt", `${commitMessage}\n`, { flag: "a" });

        // Stage & commit
        execSync(`git add commits.txt`);
        execSync(`git commit -m "${commitMessage}"`);

        console.log(`✅ Commit #${index} created`);
        await delay(100); // small delay between commits
      } catch (innerError) {
        console.log(`⚠️ Skipped commit #${index}: ${innerError.message}`);
      }
    }

    // ✅ Push commits to main (change to master if needed)
    execSync("git push origin main", { stdio: "inherit" });

    console.log("🚀 All commits pushed successfully!");
  } catch (error) {
    console.error("❌ Error during fake commits:", error.message);
    process.exit(1);
  }
};

// Run the function
fakeCommits();
