import boxen from "boxen";
import chalk from "chalk";
import * as emoji from "node-emoji";
import {COLOR_MAP} from "../shared/colors.js";
import {getCliVersion} from "../utils/cliVersion.js";

export const dashboard = () => {
  const stats = [
    {label: "Projects Created", value: "1,247", icon: "package"},
    {label: "Happy Users", value: "892", icon: "smile"},
    {label: "Templates", value: "24", icon: "clipboard"},
    {label: "Version", value: getCliVersion(), icon: "label"},
  ];

  const labelWidth = Math.max(...stats.map((stat) => stat.label.length));

  const statsLine = stats
    .map((s, index) => {
      const iconChar = emoji.get(s.icon) ?? "";
      const accent = COLOR_MAP[index % COLOR_MAP.length]!;
      const label = chalk.gray(s.label.padEnd(labelWidth));
      const value = accent(chalk.bold(s.value));

      return `${accent(iconChar)}  ${label}  ${value}`;
    })
    .join("\n");

  console.log(
    boxen(statsLine, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#00c6ff",
      float: "left",
      title: chalk.white.bold("Dashboard"),
    }),
  );
};
