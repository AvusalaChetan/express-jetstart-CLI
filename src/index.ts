#!/usr/bin/env node

import createProject from "./create.js";
import askQuestions from "./prompts/questions.js";
import {showError} from "./ui/error/showError.js";
import {BuildUi, successCelebration} from "./ui/uiCli.js";
import sleep from "./utils/sleep.js";

const main = async () => {
  try {
    console.clear();
    await BuildUi();
    const answers = await askQuestions();

    await sleep(400);
    console.log("\n");
    await createProject(answers);
    await successCelebration();
  } catch (error) {
    showError(
      `Something went wrong: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    process.exit(1);
  }
};

main();
