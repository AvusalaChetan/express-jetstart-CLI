import chalk from "chalk";
import fs from "fs";
import type {Answers} from "inquirer";
import {type Spinner} from "nanospinner";
import {templatePath} from "../create.js";
import {
  env,
  envExample,
  gitignore,
  eslint,
} from "../templates/dotFileTemplets.js";
import {
  expressTemplateCJS,
  expressTemplateESM,
  expressTemplateTS,
  packageJsonTemplateCJS,
  packageJsonTemplateESM,
  packageJsonTemplateTS,
  tsConfigTemplate,
} from "../templates/express/templets.js";

type rootFilesType = {
  file: string;
  data: () => string;
};

const folders: string[] = [
  "controllers",
  "routes",
  "models",
  "public",
  "middlewares",
  "utils",
  "config",
  "services",
];

const createFolders = (projectName: string, spinner: Spinner) => {
  try {
    folders.forEach((folder) => {
      fs.mkdirSync(`${projectName}/${folder}`);
      fs.writeFileSync(`${projectName}/${folder}/.gitkeep`, "");
    });
    spinner.success({
      text: chalk.green(`Project "${projectName}" created successfully!\n`),
    });
    console.log(chalk.cyan.bold("🚀 Next steps:\n"));
    console.log(
      chalk.blue("   1. ") +
        chalk.white.bold("cd ") +
        chalk.yellow.bold(projectName),
    );
    console.log(chalk.blue("   2. ") + chalk.white.bold("npm install"));
    console.log(chalk.blue("   3. ") + chalk.white.bold("npm run dev "));
    console.log(chalk.gray("Happy coding!\n"));
  } catch (error) {
    spinner.error({
      text: chalk.red(`Failed to create project "${projectName}".`),
    });
  }
};

const createRootFiles = (
  projectName: string,
  language: Answers["language"],
  spinner: Spinner,
  framework: Answers["framework"],
  needViews: Answers["needViews"],
  views: Answers["views"],
  mjsMode: Answers["mjsMode"],
) => {
  const rootFiles: rootFilesType[] = [
    {
      file: language === "javascript" ? "server.js" : "server.ts",
      data: () =>
        language === "javascript"
          ? mjsMode === "esm"
            ? expressTemplateESM
            : expressTemplateCJS
          : expressTemplateTS,
    },

    {
      file: "package.json",
      data: () => {
        if (language === "javascript") {
          if (mjsMode === "esm") {
            return packageJsonTemplateESM.replace(
              /{{project-name}}/g,
              projectName,
            );
          } else {
            return packageJsonTemplateCJS.replace(
              /{{project-name}}/g,
              projectName,
            );
          }
        } else {
          return packageJsonTemplateTS.replace(
            /{{project-name}}/g,
            projectName,
          );
        }
      },
    },
    {file: ".env", data: () => env},
    {file: ".env.example", data: () => envExample},
    {file: ".gitignore", data: () => gitignore},
    {
      file: "README.md",
      data: () => {
        try {
          return fs.readFileSync(`${templatePath}/README.md`, "utf-8");
        } catch (err) {
          return "# Project\n\nThis is your Express app. Customize this README as needed.";
        }
      },
    },
    {
      file: "ARCHITECTURE.yaml",
      data: () => "your app architecture details here",
    },
    {
      file: ".prettierrc",
      data: () => `
{
 "semi": true,
 "singleQuote": true,
 "tabWidth": 2,
 "trailingComma": "es5"
}`,
    },
    {file: ".eslintrc.json", data: () => eslint},
    {
      file: "tsconfig.json",
      data: () => (language === "typescript" ? tsConfigTemplate : ""),
    },
  ];

  rootFiles
    .filter(({file}) => {
      if (language === "javascript")
        return file !== "server.ts" && file !== "tsconfig.json";
      if (language === "typescript") return file !== "server.js";
      return true;
    })
    .forEach(({file, data}) => {
      fs.writeFileSync(`${projectName}/${file}`, data());
    });
};

export {createFolders, createRootFiles};
