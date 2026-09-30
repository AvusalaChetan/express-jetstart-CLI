import chalk from "chalk";
import fs from "fs";
import type { Answers } from "../prompts/questions.js";
import { type Spinner } from "nanospinner";
import {
  env,
  envExample,
  eslint,
  gitignore,
  readmeTemplate,
} from "../templates/dotFileTemplets.js";
import {
  appCjsTemplate,
  appJsTemplate,
  appStarterCJS,
  appStarterESM,
  asyncHandlerTemplateCJS,
  asyncHandlerTemplateESM,
  commanjsImport,
  errorHandlerTemplateCJS,
  errorHandlerTemplateESM,
  esmImport,
  healthControllerTemplateCJS,
  healthControllerTemplateESM,
  healthRouteTemplateCJS,
  healthRouteTemplateESM,
  packageJsonTemplateCJS,
  packageJsonTemplateESM,
  serverCjsTemplate,
  serverJsTemplate,
} from "../templates/express/jsTemplates/jsTemplets.js";

import {
  appStarterTs,
  appts as appTs,
  asyncHandlerTemplateTS,
  errorHandlerTemplateTS,
  healthControllerTemplateTS,
  healthRouteTemplateTS,
  packageJsonTemplateTS,
  serverTsTemplate,
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
    fs.mkdirSync(`${projectName}/src`, { recursive: true });

    const activeFolders = needViews ? [...folders, "views"] : folders;
    activeFolders.forEach((folder) => {
      fs.mkdirSync(`${projectName}/src/${folder}`, { recursive: true });
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

const getViewEngineInfo = (views: Answers["views"]) => {
  const engine = (Array.isArray(views) ? views[0] : views) || "ejs";
  const ext = engine === "handlebars" ? "hbs" : engine;
  const depName = engine === "handlebars" ? "hbs" : engine;
  const depVersion =
    engine === "ejs" ? "^3.1.10" : engine === "pug" ? "^3.0.3" : "^4.2.0";
  return { engine, ext, depName, depVersion };
};

const createRootFiles = (answers: Answers) => {
  const { projectName, language, mjsMode, needViews, views, templateType } = answers;
  const viewInfo = needViews ? getViewEngineInfo(views) : null;
  const isStarter = templateType !== "minimal";

  const getAppContent = () => {
    let appContent = "";
    if (language === "javascript") {
      if (mjsMode === "cjs") {
        appContent = isStarter ? appStarterCJS : appCjsTemplate;
      } else {
        appContent = isStarter ? appStarterESM : appJsTemplate;
      }
    } else {
      appContent = isStarter ? appStarterTs : appTs;
    }

    if (needViews && viewInfo) {
      if (language === "javascript" && mjsMode === "cjs") {
        const viewConfig = `\nconst path = require("path");\napp.set("views", path.join(process.cwd(), "src", "views"));\napp.set("view engine", "${viewInfo.ext}");\n`;
        appContent = appContent.replace(
          /const app = express\(\);/,
          `const app = express();${viewConfig}`,
        );
      } else {
        const viewConfig = `\nimport path from "path";\napp.set("views", path.join(process.cwd(), "src", "views"));\napp.set("view engine", "${viewInfo.ext}");\n`;
        appContent = appContent.replace(
          /export const app = express\(\);/,
          `export const app = express();${viewConfig}`,
        );
      }
      const routeHandler =
        language === "typescript"
          ? `(req: Request, res: Response)`
          : `(req, res)`;
      appContent = appContent.replace(
        /app\.get\("\/",[\s\S]*?\n\}\);/,
        `app.get("/", ${routeHandler} => {\n  res.render("index", { title: "${projectName}", projectName: "${projectName}" });\n});`,
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
          ? mjsMode === "cjs"
            ? serverCjsTemplate
            : serverJsTemplate
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
    { file: ".env", data: () => env },
    { file: ".env.example", data: () => envExample },
    { file: ".gitignore", data: () => gitignore },
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
      data: () =>
        JSON.stringify(
          {
            semi: true,
            singleQuote: true,
            tabWidth: 2,
            trailingComma: "es5",
          },
          null,
          2,
        ) + "\n",
    },
    { file: ".eslintrc.json", data: () => eslint },
    {
      file: "tsconfig.json",
      data: () => (language === "typescript" ? tsConfigTemplate : ""),
    },
  ];

  // If Full Starter template is selected, generate sample modular structure files
  if (isStarter) {
    if (language === "typescript") {
      rootFiles.push(
        { file: "src/utils/asyncHandler.ts", data: () => asyncHandlerTemplateTS },
        { file: "src/middlewares/errorHandler.ts", data: () => errorHandlerTemplateTS },
        { file: "src/controllers/health.controller.ts", data: () => healthControllerTemplateTS },
        { file: "src/routes/health.route.ts", data: () => healthRouteTemplateTS },
      );
    } else if (mjsMode === "cjs") {
      rootFiles.push(
        { file: "src/utils/asyncHandler.js", data: () => asyncHandlerTemplateCJS },
        { file: "src/middlewares/errorHandler.js", data: () => errorHandlerTemplateCJS },
        { file: "src/controllers/health.controller.js", data: () => healthControllerTemplateCJS },
        { file: "src/routes/health.route.js", data: () => healthRouteTemplateCJS },
      );
    } else {
      rootFiles.push(
        { file: "src/utils/asyncHandler.js", data: () => asyncHandlerTemplateESM },
        { file: "src/middlewares/errorHandler.js", data: () => errorHandlerTemplateESM },
        { file: "src/controllers/health.controller.js", data: () => healthControllerTemplateESM },
        { file: "src/routes/health.route.js", data: () => healthRouteTemplateESM },
      );
    }
  }

  rootFiles.forEach(({ file, data }) => {
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

export { createFolders, createRootFiles };
