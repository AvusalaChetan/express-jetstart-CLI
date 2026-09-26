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

import {
  ejsTemplate,
  hbsTemplate,
  pugTemplate,
} from "../templates/viewsTemplates.js";

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

const createFolders = (
  projectName: string,
  spinner: Spinner,
  needViews?: boolean,
) => {
  try {
    fs.mkdirSync(`${projectName}/src`, {recursive: true});

    const activeFolders = needViews ? [...folders, "views"] : folders;
    activeFolders.forEach((folder) => {
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
  views?: Answers["views"];
  mjsMode?: Answers["mjsMode"];
};

const getViewEngineInfo = (views: Answers["views"]) => {
  const engine = (Array.isArray(views) ? views[0] : views) || "ejs";
  const ext = engine === "handlebars" ? "hbs" : engine;
  const depName = engine === "handlebars" ? "hbs" : engine;
  const depVersion =
    engine === "ejs" ? "^3.1.10" : engine === "pug" ? "^3.0.3" : "^4.2.0";
  return {engine, ext, depName, depVersion};
};

const createRootFiles = ({
  projectName,
  language,
  mjsMode,
  needViews,
  views,
}: CreateRootFilesParams) => {
  const viewInfo = needViews ? getViewEngineInfo(views) : null;

  const getAppContent = () => {
    let appContent = "";
    if (language === "javascript") {
      appContent =
        mjsMode === "esm"
          ? esmImport.slice(0, -1).join("\n") + appJsTemplate
          : commanjsImport.slice(0, -1).join("\n") + appJsTemplate;
    } else {
      appContent = (tsImport.slice(0, -1).join("\n") + appTs) as string;
    }

    if (needViews && viewInfo) {
      const viewConfig = `\nimport path from "path";\napp.set("views", path.join(process.cwd(), "src", "views"));\napp.set("view engine", "${viewInfo.ext}");\n`;
      appContent = appContent.replace(
        /export const app = express\(\);/,
        `export const app = express();${viewConfig}`,
      );
      appContent = appContent.replace(
        /app\.get\("\/",[\s\S]*?\n\}\);/,
        `app.get("/", (req: any, res: any) => {\n  res.render("index", { title: "${projectName}", projectName: "${projectName}" });\n});`,
      );
    }
    return appContent;
  };

  const getPackageJsonContent = () => {
    let pkgString = "";
    if (language === "javascript") {
      pkgString =
        mjsMode === "esm"
          ? packageJsonTemplateESM.replace(/{{project-name}}/g, projectName)
          : packageJsonTemplateCJS.replace(/{{project-name}}/g, projectName);
    } else {
      pkgString = packageJsonTemplateTS.replace(
        /{{project-name}}/g,
        projectName,
      );
    }

    if (needViews && viewInfo) {
      const pkg = JSON.parse(pkgString);
      pkg.dependencies = pkg.dependencies || {};
      pkg.dependencies[viewInfo.depName] = viewInfo.depVersion;
      return JSON.stringify(pkg, null, 2);
    }
    return pkgString;
  };

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
      data: getAppContent,
    },
    {
      file: "package.json",
      data: getPackageJsonContent,
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

  if (needViews && viewInfo) {
    let viewContent = "";
    if (viewInfo.engine === "ejs") {
      viewContent = ejsTemplate.replace(/<%= projectName %>/g, projectName);
    } else if (viewInfo.engine === "pug") {
      viewContent = pugTemplate.replace(/#{projectName}/g, projectName);
    } else if (viewInfo.engine === "handlebars") {
      viewContent = hbsTemplate.replace(/{{projectName}}/g, projectName);
    }
    fs.writeFileSync(
      `${projectName}/src/views/index.${viewInfo.ext}`,
      viewContent,
    );
  }
};

export {createFolders, createRootFiles};
