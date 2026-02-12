#!/usr/bin/env node

import chalk from "chalk";
import {log} from "console";
import {createSpinner} from "nanospinner";
import {showBanner, showConfig} from "./banners/banner.js";
import createProject from "./create.js";
import askQuestions from "./prompts/questions.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runLoader = async () => {
  const spinner = createSpinner(chalk.cyan("Getting things ready...")).start();
  await sleep(2000);
  spinner.success({text: chalk.green("All set! Let's go \n")});
};

const main = async () => {
  try {
    showBanner();

    const answers = await askQuestions();

    await sleep(1000);

    showConfig(answers);

    if (answers.projectName) {
      log(chalk.green("\nGreat! Setting up your project..."));
      await runLoader();
      await createProject(answers);
    }
  } catch (error) {
    log(chalk.red("Something went wrong:"), error);
    process.exit(1);
  }
};
main();
