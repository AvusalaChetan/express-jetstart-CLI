import chalk from "chalk";
import {createSpinner, type Spinner} from "nanospinner";

export const createSpinnerInstance = () => {
  return createSpinner(chalk.cyan("Creating project...")).start();
};