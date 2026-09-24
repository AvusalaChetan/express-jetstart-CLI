import chalkAnimation from "chalk-animation";
import sleep from "../utils/sleep.js";

export const welcomeText = async () => {
  const welcome = chalkAnimation.rainbow("\n Welcome to Express-Jetstart");
  welcome.start();
  await sleep(5000);
  welcome.stop();
};
