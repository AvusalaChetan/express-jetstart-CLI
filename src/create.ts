import chalk from "chalk";
import {error as errorLog} from "console";
import fs from "fs";
import {createSpinner, type Spinner} from "nanospinner";
import path from "path";
import {fileURLToPath} from "url";

import {
  createFolders,
  createRootFiles,
} from "./utils/fileCreatingUtils.js";

type ProjectConfig = {
  projectName: string;
  language: "typescript" | "javascript";
  framework: "express" | "fastify" | "hono";
  needViews: boolean;
  views: ("ejs" | "pug" | "handlebars")[];
  mjsMode: "esm" | "cjs";
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const templatePath = path.join(
  __dirname,
  "..",
  "src",
  "templates",
);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createProject = async ({
  projectName,
  language,
  framework,
  needViews,
  views,
  mjsMode,
}: ProjectConfig): Promise<void> => {
  const spinner: Spinner = createSpinner(
    chalk.cyan("Creating project..."),
  ).start();
  try {
    await sleep(2000);
    fs.mkdirSync(projectName);

    createFolders(projectName, spinner); // creating folders
    createRootFiles(projectName, language, spinner,framework, needViews, views, mjsMode); // creting root files
    if (needViews) fs.mkdirSync(`${projectName}/views`);
  } catch (error) {
    errorLog("error", (error as Error).message.toString());
    if (error instanceof Error) {
      spinner.error({
        text: chalk.red(`Project "${projectName}" is already created`),
      });
    }
  }
};

export default createProject;
