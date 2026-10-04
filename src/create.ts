import {execSync} from "child_process";
import type {Answers} from "./prompts/questions.js";
import {createFolders, createRootFiles} from "./shared/fileCreatingUtils.js";
import {createSpinnerInstance} from "./shared/spinner.js";
import path from "path";


const createProject = async (answers: Answers): Promise<void> => {
  const spinner = createSpinnerInstance();
  
  await createFolders(answers.projectName, spinner, answers.needViews);
  await createRootFiles(answers);
  const projectPath = path.resolve(answers.projectName);
  
  if (answers.initGit) {
    try {
      execSync("git init", {
        cwd: answers.projectName,
        stdio: "ignore",
      });
    } catch {
      // Silently continue if git is not available
    }
  }

   
};

export default createProject;
