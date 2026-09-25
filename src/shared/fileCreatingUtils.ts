import chalk from "chalk";
import fs from "fs";
import type {Answers} from "inquirer";
import {type Spinner} from "nanospinner";
import {
  env,
  envExample,
  eslint,
  gitignore,
  readmeTemplate,
} from "../templates/dotFileTemplets.js";
import {
  commanjsImport,
  esmImport,
  appJsTemplate,
  packageJsonTemplateCJS,
  packageJsonTemplateESM,
  serverTsTemplate,
} from "../templates/express/jsTemplates/jsTemplets.js";

import {
  appts as appTs,
  packageJsonTemplateTS,
  serverJsTemplate,
  tsConfigTemplate,
  tsImport,
} from "../templates/express/TsTemplates/tsTemplates.js";

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
    fs.mkdirSync(`${projectName}/src`, {recursive: true});

    folders.forEach((folder) => {
      fs.mkdirSync(`${projectName}/src/${folder}`, {recursive: true});
    });

    spinner.success({
      text: chalk.green(`Project "${projectName}" created successfully!\n`),
    });
  } catch (error) {
    spinner.error({
      text: chalk.red(`Failed to create project "${projectName}".`),
    });
  }
};

// ------------------------------------------------------------------------
type CreateRootFilesParams = {
  projectName: string;
  language: Answers["language"];
  framework: Answers["framework"];
  needViews: Answers["needViews"];
  views: Answers["views"];
  mjsMode: Answers["mjsMode"];
};
const createRootFiles = ({
  projectName,
  language,
  mjsMode,
}: CreateRootFilesParams) => {
  const rootFiles: rootFilesType[] = [
    {
      file: language === "javascript" ? "server.js" : "server.ts",
      data: () =>
        language === "javascript"
          ? mjsMode === "esm"
            ? esmImport.slice(0, -1).join("\n") + serverJsTemplate
            : commanjsImport.slice(0, -1).join("\n") + serverJsTemplate
          : serverTsTemplate,
    },
    {
      file: language === "javascript" ? "app.js" : "app.ts",
      data: () =>
        language === "javascript"
          ? mjsMode === "esm"
            ? esmImport.slice(0, -1).join("\n") + appJsTemplate
            : commanjsImport.slice(0, -1).join("\n") + appJsTemplate
          : ((tsImport.slice(0, -1).join("\n") + appTs) as string),
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
      data: () => readmeTemplate.replace(/{{project-name}}/g, projectName),
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
                }
                `,
    },
    {file: ".eslintrc.json", data: () => eslint},
    {
      file: "tsconfig.json",
      data: () => (language === "typescript" ? tsConfigTemplate : ""),
    },
  ];

  rootFiles.forEach(({file, data}) => {
    const content = data();
    if (content) {
      fs.writeFileSync(`${projectName}/${file}`, content);
    }
  });
};

export {createFolders, createRootFiles};
