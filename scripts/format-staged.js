// @ts-nocheck
import { execSync } from "node:child_process";

const Logger = console;

const output = execSync("npx biome check --write --unsafe --staged");
Logger.log(output);
