import type {Answers} from "./prompts/questions.js";
import {createFolders, createRootFiles} from "./shared/fileCreatingUtils.js";
import {createSpinnerInstance} from "./shared/spinner.js";

const createProject = async (answers: Answers): Promise<void> => {
  const spinner = createSpinnerInstance();

  await createFolders(answers.projectName, spinner, answers.needViews);
  await createRootFiles(answers);
};

export default createProject;
