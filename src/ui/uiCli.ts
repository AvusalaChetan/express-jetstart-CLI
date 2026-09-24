#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import {createSpinner} from "nanospinner";
import * as emoji from "node-emoji";
import {colors} from "../shared/colors.js";
import sleep from "../utils/sleep.js";
import {dashboard} from "./dashboard.js";
import {printBanner} from "./printBanner.js";
import {welcomeText} from "./welcomeText.js";
import {features} from "./features.js";

export const BuildUi = async () => {
  await printBanner();
  await welcomeText();
  features();
  dashboard();
};

export const showProgressSequence = async (steps: string[]) => {
  for (const step of steps) {
    const spinner = createSpinner(gradient.pastel(step)).start();
    await sleep(800);
    const successGradient = gradient("#56ab2f", "#a8e063");
    spinner.success({text: successGradient(step + " completed")});
  }
};

export const showInteractiveMenu = async () => {
  const questions: any = [
    {
      type: "list",
      name: "action",
      message: colors.purple(
        `${emoji.get("thinking")}  What would you like to do?`,
      ),
      choices: [
        new inquirer.Separator(chalk.gray("─".repeat(40))),
        {
          name: `${emoji.get("rocket")}  Create New Project`,
          value: "create",
        },
        {
          name: `${emoji.get("gear")}  Project Settings`,
          value: "settings",
        },
        {
          name: `${emoji.get("books")}  Documentation`,
          value: "docs",
        },
        {
          name: `${emoji.get("star")}  Templates Gallery`,
          value: "templates",
        },
        new inquirer.Separator(chalk.gray("─".repeat(40))),
        {
          name: `${emoji.get("door")}  Exit`,
          value: "exit",
        },
      ],
      pageSize: 8,
    },
  ];

  const {action} = await inquirer.prompt(questions);
  return action;
};

export const successCelebration = async () => {
  const celebration = figlet.textSync("Success!", {
    font: "Slant",
  });
  console.log(colors.success.multiline(celebration));
};

 

export const showWarning = (message: string) => {
  console.log(
    boxen(chalk.yellow.bold(`${emoji.get("warning")}  Warning: ${message}`), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#f7971e",
      float: "center",
    }),
  );
};

export const showInfo = (message: string) => {
  console.log(
    boxen(
      chalk.cyan.bold(`${emoji.get("information_source")}  Info: ${message}`),
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "#00c6ff",
        float: "center",
      },
    ),
  );
};
