const path = require("path");
const core = require("@actions/core");
const fs = require("fs/promises");

(async () => {
  try {
    const fileList = core
      .getInput("files")
      .split("\n")
      .filter((x) => x !== "");

    for (const filename of fileList) {
      const fqFilename = path.join(process.cwd(), filename);
      core.info(`  Checking ${filename}…`);
      const content = await fs.readFile(fqFilename, {
        encoding: "utf8",
      });
      const json = JSON.parse(content);

      if (
        json.resolutions &&
        Object.values(json.resolutions).some((res) => /portal:/.test(res))
      ) {
        throw new Error(
          `Portals detected in ${filename}. Please remove them and commit again your changes.`
        );
      }
    }

    core.info("Checks completed, no portals detected.");
  } catch (error) {
    core.setFailed(error.message);
  }
})();
