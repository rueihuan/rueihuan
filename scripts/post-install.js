// @ts-nocheck
import { execSync } from "node:child_process";

const Logger = console;

let output;

output = execSync(`git config alias.cz "!npx git-cz"`);
Logger.info("Updated usage of git-cz");

output = execSync("npx simple-git-hooks");
Logger.info("Updated simple-git-hooks");

output = execSync("npx syncpack format");
Logger.info("Updated format by syncpack");

try {
  output = execSync("npx syncpack list-mismatches");
  Logger.info("Checked package mismatches by syncpack");
} catch {
  Logger.warn("Failed at checking package mismatches");
  Logger.warn(`Please run "syncpack list-mismatches" for details`);
}
