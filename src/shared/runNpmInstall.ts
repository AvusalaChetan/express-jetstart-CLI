import {execSync} from "node:child_process";
import path from "node:path";

export function runNpmInstall(projectName: string) {
  try {
    console.log(" Installing dependencies with npm...");

    execSync("npm i", {
      cwd: projectName,
      stdio: "inherit",
    });

    execSync("npm run dev ", {
      cwd: projectName,
      stdio: "inherit",
    });
    
  } catch (error) {
    console.log((error as Error).message);
  }
}
