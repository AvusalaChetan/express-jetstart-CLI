import chalk from "chalk";
import {log} from "console";
import figlet from "figlet";
import * as emoji from "node-emoji";
import type {Answers} from "../prompts/questions.js";
import gradient from "gradient-string";

const text: string = "Express jetstart";

const showBanner = () => {
  const banner = figlet.textSync(text, {
    font: "Big",
    horizontalLayout: "default",
  });
  const coloredBanner = gradient.rainbow.multiline(banner);
  log(coloredBanner);
  log(chalk.gray("  created by chetan\n"));
};

const showConfig = (answers: Answers) => {
  log(
    chalk
      .hex("#3c00ff")
      .bold(
        `\n${emoji.get("sparkles")} Project Configuration ${emoji.get("sparkles")}\n`,
      ),
  );

  log(
    chalk.cyan(
      `  ${emoji.get("file_folder")} Project Name:${chalk.white(answers.projectName)}`,
    ),
  );
  log(
    chalk.cyan(
      `  ${emoji.get("computer")} Language:${chalk.white(answers.language)}`,
    ),
  );

  if (answers.framework) {
    log(
      chalk.cyan(
        `  ${emoji.get("rocket")} Framework:${chalk.white(answers.framework)}`,
      ),
    );
  }

  if (answers.language === "javascript") {
    log(
      chalk.cyan(
        `  ${emoji.get("wrench")} Module System:${chalk.white(answers.mjsMode)}`,
      ),
    );
  }

  if (answers.needViews) {
    const views = Array.isArray(answers.views)
      ? answers.views.join(", ")
      : answers.views;
    log(chalk.cyan(`  ${emoji.get("art")} Views:${chalk.white(views)}`));
  }

  log("");
};

export {showBanner, showConfig};
