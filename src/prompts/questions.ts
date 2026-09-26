import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
import * as emoji from "node-emoji";

export interface Answers {
  projectName: string;
  framework: "express" | "fastify" | "hono";
  language: "typescript" | "javascript";
  views?: "ejs" | "pug" | "handlebars";
  needViews: boolean;
  initGit?: boolean;
  mjsMode?: "esm" | "cjs";
  cors?: boolean;
  envConfig?: boolean;
}

const askQuestions = async (): Promise<Answers> => {
  const questions: any[] = [
    {
      type: "input",
      name: "projectName",
      message: gradient(
        "#36D1DC",
        "#5B86E5",
      )(`${emoji.get("rocket")}  What's your project name?`),
      default: "my-app",
      validate: (input: string) => {
        if (!input.trim()) return chalk.red("Project name cannot be empty!");
        if (!/^[a-z0-9-_]+$/.test(input))
          return chalk.yellow("Use only lowercase letters, numbers, - or _");
        return true;
      },
    },

    {
      type: "rawlist",
      name: "language",
      message: gradient("#DA22FF", "#9733EE")(`💻  Choose your language:`),
      choices: [
        {
          name: `${emoji.get("star")}  TypeScript  ${chalk.gray("(recommended)")}`,
          value: "typescript",
        },
        {name: `${emoji.get("zap")}  JavaScript`, value: "javascript"},
      ],
      pageSize: 6,
    },

    {
      type: "rawlist",
      name: "mjsMode",
      message: gradient(
        "#FA8BFF",
        "#2BD2FF",
      )(`${emoji.get("package")}  Module system:`),
      choices: [
        {
          name: `${emoji.get("sparkles")}  ESM  ${chalk.gray("(import/export, type: module)")}`,
          value: "esm",
        },
        {
          name: `${emoji.get("gear")}  CommonJS  ${chalk.gray("(require/module.exports)")}`,
          value: "cjs",
        },
      ],
      when: (answers: Answers) => answers.language !== "typescript",

      pageSize: 6,
    },

    {
      type: "confirm",
      name: "needViews",
      message: gradient(
        "#56ab2f",
        "#a8e063",
      )(`🎨  Do you want to use a view engine?`),
      default: true,
    },

    {
      type: "rawlist",
      name: "views",
      message: gradient("#f7971e", "#ffd200")(`🖌️  Choose your view engine:`),
      choices: [
        {
          name: `${emoji.get("gem")}  EJS  ${chalk.gray("(simple & flexible)")}`,
          value: "ejs",
        },
        {
          name: `${emoji.get("gem")}  Pug  ${chalk.gray("(clean & concise)")}`,
          value: "pug",
        },
        {
          name: `${emoji.get("gem")}  Handlebars  ${chalk.gray("(powerful & popular)")}`,
          value: "handlebars",
        },
      ],
      when: (answers: Answers) => answers.needViews === true,
      pageSize: 6,
    },

    {
      type: "confirm",
      name: "initGit",
      message: gradient(
        "#00c6ff",
        "#0072ff",
      )(`📦  Initialize a git repository?`),
      default: true,
    },
  ];

  const results = await inquirer.prompt(questions);

  return {
    projectName: results.projectName,
    framework: "express",
    language: results.language,
    views: results.views,
    needViews: results.needViews,
    initGit: results.initGit ?? true,
    mjsMode: results.mjsMode,
    cors: results.cors,
    envConfig: results.envConfig,
  };
};

export default askQuestions;
