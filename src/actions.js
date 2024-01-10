import { animateSand } from "./animations";
import { convertMillisecondToSecond } from "./utils";

const flip = (globals) => {
  clearInterval(globals.theInterval);
  animateSand(globals);
};

const updateSandLevels = (globals) => {
  globals.sandB.style.height = `${100 - globals.sandAPercent}%`;
  globals.sandA.style.height = `${globals.sandAPercent}%`;
  globals.sandA.style.width = "100%";
  globals.sandB.style.width = "100%";
};

const init = (globals) => {
  let timeStamp = Date.now();

  globals.theInterval = setInterval(() => {
    globals.timePassed = convertMillisecondToSecond(Date.now() - timeStamp);
    globals.sandAPercent =
      globals.sandAPercent - (globals.timePassed / globals.time) * 100;
    globals.sandBPercent = 100 - globals.sandAPercent;
    updateSandLevels(globals);
    timeStamp = Date.now();

    if (globals.sandAPercent <= 0) {
      // Stop intervel when hourglass is empty
      clearInterval(globals.theInterval);
    }
  }, 10);
};

export { flip, updateSandLevels, init };
