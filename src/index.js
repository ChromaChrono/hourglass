import { animateSand } from "./animations";
import { events } from "./events";
import { convertMillisecondToSecond } from "./utils.js";

export default (root) => {
  const sandA = root.getElementById("hourglassSandTop");
  const sandB = root.getElementById("hourglassSandBottom");
  const hourglass = root.getElementById("hourglass");

  const globals = {
    sandA,
    sandB,
    hourglass,
    time: 10,
    timePassed: 0,
    theInterval: null,
    sandAPercent: 100,
    sandBPercent: 0,
    isFlipping: false,
  };

  const updateSandLevels = () => {
    sandB.style.height = `${100 - globals.sandAPercent}%`;
    sandA.style.height = `${globals.sandAPercent}%`;
    sandA.style.width = "100%";
    sandB.style.width = "100%";
  };

  updateSandLevels();

  const init = () => {
    let timeStamp = Date.now();

    globals.theInterval = setInterval(() => {
      globals.timePassed = convertMillisecondToSecond(Date.now() - timeStamp);
      globals.sandAPercent =
        globals.sandAPercent - (globals.timePassed / globals.time) * 100;
      globals.sandBPercent = 100 - globals.sandAPercent;
      updateSandLevels();
      timeStamp = Date.now();

      if (globals.sandAPercent <= 0) {
        // Stop intervel when hourglass is empty
        clearInterval(globals.theInterval);
      }
    }, 10);
  };

  init();
};
