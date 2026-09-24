import chalk from "chalk";

function underline(name: string) {
  console.log(chalk.gray("─".repeat(name.length)));
}

export default underline;
