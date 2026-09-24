import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import type {Answers} from "./prompts/questions.js";
import {createFolders, createRootFiles} from "./shared/fileCreatingUtils.js";
import {createSpinnerInstance} from "./shared/spinner.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const templatePath = path.join(__dirname, "..", "src", "templates");

const createProject = async (answers: Answers): Promise<void> => {
  const spinner = createSpinnerInstance();

  await createFolders(answers.projectName, spinner);
  await createRootFiles(answers);
};

export default createProject;
