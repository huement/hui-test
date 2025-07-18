const { readFileSync, writeFileSync } = require("fs");

const posthtml = require("posthtml");
const include = require("posthtml-include");
const expressions = require("posthtml-expressions");
const fs = require("fs").promises;
const path = require("path");

// Read package.json
async function getPackageVersion() {
  const packageJsonPath = path.resolve(__dirname, "../hui/package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
  return packageJson.version;
}

const finalOutputFile = "docs/index.html";

/**
 * POSTHTML Builder | smushes all the .html files into one big file.
 */

console.log("\n");
console.log("BUILDING HUI TESTBED....", "\n");
// posthtml([include({ encoding: "utf8" })])
//   .process(html)
//   .then((result) => {
//     console.log("Output saved to docs/index.html !", "\n");
//     writeFileSync("docs/index.html", result.html);
//   });

// PostHTML processing
async function build() {
  try {
    // Get version from package.json
    const version = await getPackageVersion();

    // Read the input HTML
    const inputHtml = await fs.readFile(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );

    // Process HTML with PostHTML and expressions plugin
    const result = await posthtml([
      include({ encoding: "utf8" }),
      expressions({
        locals: {
          version: version,
          facebookURL: "https://www.facebook.com/huementsoftware",
          githubURL: "https://github.com/huement",
        },
      }),
    ]).process(inputHtml);

    // Write the output to a file
    await fs.writeFile(path.resolve(__dirname, finalOutputFile), result.html);
    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
  }
}

build();
