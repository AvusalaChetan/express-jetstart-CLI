import inquirer from "inquirer";

export interface Answers {
  projectName: string;
  framework: "express" | "fastify" | "hono";
  language: "typescript" | "javascript";
  views: ("ejs" | "pug" | "handlebars")[];
  needViews: boolean;
  mjsMode: "esm" | "cjs";
}

const askQuestions = async (): Promise<Answers> => {
  const answers = await inquirer.prompt<Answers>([
    // ─── Project Name ───────────────────────────────────────────────
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      default: "my-app",
      validate: (input: string) => {
        if (!input.trim()) return "Project name cannot be empty!";
        if (!/^[a-z0-9-_]+$/.test(input))
          return "Use only lowercase letters, numbers, - or _";
        return true;
      },
    },

      // ─── Language ───────────────────────────────────────────────────
    {
      type: "rawlist",
      name: "language",
      message: "JavaScript or TypeScript?",
      choices: [
        { name: "TypeScript  (recommended)", value: "typescript" },
        { name: "JavaScript", value: "javascript" },
      ],
    },

    // ─── Framework ──────────────────────────────────────────────────
    {
      type: "rawlist",
      name: "framework",
      message: "Which framework do you want to use?",
      choices: [
        { name: "Express  (popular & beginner friendly)", value: "express" },
      ],
    },
    {
      type: "rawlist",
      name: "mjsMode",
      message: "Module system?",
      choices: [
        { name: "ESM (import/export, type: module)", value: "esm" },
        { name: "CommonJS (require/module.exports)", value: "cjs" },
      ],
    },
    {
      type: "confirm",
      name: "needViews",
      message: "Do you want to use a view engine?",
      default: true,
    },
    {
      type: "rawlist",
      name: "views",
      message: "Which views do you want to use?",
      choices: [
        { name: "EJS  (simple & flexible)", value: "ejs" },
        { name: "Pug  (clean & concise)", value: "pug" },
        { name: "Handlebars  (powerful & popular)", value: "handlebars" },
      ],
    },
    
  ]);

  return answers;
};


export default askQuestions;
