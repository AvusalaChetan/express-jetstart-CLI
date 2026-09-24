import boxen from "boxen";
import chalk from "chalk";
import * as emoji from "node-emoji";

export const showError = (message: string) => {
  console.log(
    boxen(chalk.red.bold(`${emoji.get("x")}  Error: ${message}`), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#cb2d3e",
      float: "center",
    }),
  );
};
