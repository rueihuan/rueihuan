// @ts-nocheck
import fs from "node:fs";

const Logger = console;

if (!/^pnpm/.test(process.env.npm_config_user_agent ?? "")) {
  Logger.error(
    "\u001b[33mThis repository requires using pnpm at the package manager " +
      "for scripts to work properly.\u001b[39m\n",
  );
  process.exit(1);
} else {
  Logger.info("Checked package manager as expected PNPM");
}

try {
  const files = await Array.fromAsync(fs.promises.glob("**/package.json"));

  let allPrivate = true;

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));

    if (data.private !== true) {
      allPrivate = false;
    }

    if (data.private !== true && data.private !== false) {
      Logger.error(`${data.name} is missing correct "private" property`);
      process.exit(1);
    } else if (data.private === false) {
      Logger.warn(`${data.name} is setting "private" to false`);
    }
  }

  if (allPrivate) {
    Logger.info("Checked privacy of packages");
  }
} catch (err) {
  Logger.error(err);
  process.exit(1);
}
