import boxen from "boxen";
import chalk from "chalk";
import * as emoji from "node-emoji";
import { COLOR_MAP } from "../shared/colors.js";

interface Feature {
  icon: string;
  name: string;
  desc: string;
}

const FEATURE_CONFIG: Feature[] = [
  {icon: "zap", name: "Lightning Fast", desc: "Generate projects in seconds"},
  {icon: "package", name: "Pre-configured", desc: "All dependencies ready"},
  {
    icon: "chart_with_upwards_trend",
    name: "Scalable",
    desc: "Production-ready structure",
  },
  {icon: "lock", name: "Secure", desc: "Best practices built-in"},
  {icon: "gear", name: "Customizable", desc: "Choose your stack  "},
  {icon: "books", name: "Documented", desc: "Clear code comments"},
];

 
const buildFeatureLine = (feature: Feature, index: number): string => {
  const iconChar = emoji.get(feature.icon) || feature.icon;
  const colorFn = COLOR_MAP[index % COLOR_MAP.length]!;
  const paddedName = feature.name.padEnd(15);
  return colorFn(`${iconChar}  ${paddedName}  ──  ${feature.desc}`);
};

export const features = (): void => {
  const featureBox = FEATURE_CONFIG.map(buildFeatureLine).join("\n");

  console.log(
    boxen(featureBox, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#36D1DC",
      float: "center",
      title: chalk.white.bold("Features"),
    }),
  );
};
