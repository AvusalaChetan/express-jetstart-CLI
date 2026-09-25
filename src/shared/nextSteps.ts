import chalk from "chalk";

export const showNextSteps = (projectName: string): void => {
  console.log(chalk.cyan.bold("\nNext steps:\n"));
  console.log(
    chalk.blue("  1. ") + chalk.white.bold("cd ") + chalk.yellow.bold(projectName),
  );
  console.log(chalk.blue("  2. ") + chalk.white.bold("npm install"));
  console.log(chalk.blue("  3. ") + chalk.white.bold("npm run dev"));
  console.log(chalk.gray("\n  Happy coding!\n"));
};

