import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { basename, dirname, join } from "path";
import { spawnSync } from "child_process";

const nycOutputDir = ".nyc_output";
const nodeModules = "node_modules";

function getDirs(dir: string): string[] {
  let results: string[] = [];

  readdirSync(dir).forEach((folder) => {
    if (!(folder.localeCompare(nodeModules) === 0)) {
      if (folder.localeCompare(nycOutputDir) === 0) {
        results.push(join(dir, folder));
      } else {
        folder = join(dir, folder);

        if (lstatSync(folder).isDirectory()) {
          results = results.concat(getDirs(folder));
        }
      }
    }
  });

  return results;
}

if (!existsSync(nycOutputDir)) {
  mkdirSync(nycOutputDir);
}

const reports = [];
for (const dir of getDirs(process.cwd())) {
  const reportName = join(nycOutputDir, basename(dirname(dir)) + ".json");
  const { status, stderr } = spawnSync("pnpx nyc", ["merge", dir, reportName], {
    encoding: "utf8",
    shell: true,
    input: dir,
  });

  if (status !== 0) {
    console.error(stderr);
    process.exit(status === null ? undefined : status);
  }
  reports.push(reportName);
}

for (const report of reports) {
  writeFileSync(
    report,
    readFileSync(report)
      .toString()
      .replace(/plz-out\/tmp\/.*src\/cockpit/g, "src/cockpit"),
  );
}
