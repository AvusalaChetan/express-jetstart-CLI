import chalk from "chalk";
import * as emoji from "node-emoji";
import { getCliVersion } from "../utils/cliVersion.js";
import underline from "../utils/underline.js";

export const printBanner = async () => {
  const MainName = `[ EXPRESS - JETSTART ] v${getCliVersion()}`;

  const logo = chalk.white.bold(MainName);
  const tagline = chalk.white.gray(" The Ultimate Express.js Project Generator ");

  if (!logo) throw new Error("Failed to render logo");

  console.log(logo);
  underline(MainName);
  console.log(emoji.get("rocket") + " " + tagline);
};
