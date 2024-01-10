import { updateSandLevels } from "./actions";
import { init } from "./actions";

const animateSand = async (globals) => {
  globals.isFlipping = true;
  const time = Date.now();
  const sandInterval = setInterval(() => {
    const timePassed = Date.now() - time;
    const animationPercent = (timePassed / globals.rotationTime) * 100;

    const rotationDegrees = -1 * 1.8 * animationPercent;

    globals.hourglass.style.transform = `rotate(${
      rotationDegrees > 180 ? 180 : rotationDegrees
    }deg)`;

    let sidePercentage;
    if (animationPercent < 50) {
      sidePercentage = animationPercent / 50;
    } else {
      sidePercentage = 1 - (animationPercent - 50) / 50;
    }

    globals.sandA.style.height = `${Math.floor(
      globals.sandAPercent +
        (globals.sandAPercent >= 2 ? 100 - globals.sandAPercent : 0) *
          sidePercentage
    )}%`;
    globals.sandA.style.width = `${Math.floor(
      globals.sandAPercent +
        (globals.sandAPercent >= 2 ? 100 - globals.sandAPercent : 0) *
          (1 - sidePercentage)
    )}%`;

    globals.sandB.style.height = `${Math.floor(
      100 -
        globals.sandAPercent +
        (100 - globals.sandAPercent >= 2 ? globals.sandAPercent : 0) *
          sidePercentage
    )}%`;
    globals.sandB.style.width = `${Math.floor(
      100 -
        globals.sandAPercent +
        (100 - globals.sandAPercent >= 2 ? globals.sandAPercent : 0) *
          (1 - sidePercentage)
    )}%`;

    if (animationPercent >= 50) {
      globals.sandA.style.alignSelf = "flex-start";
      globals.sandB.style.alignSelf = "flex-start";
    }

    if (animationPercent >= 99) {
      globals.hourglass.style.transform = "rotate(0)";
      globals.sandA.style.alignSelf = "flex-end";
      globals.sandB.style.alignSelf = "flex-end";
      clearInterval(sandInterval);
      globals.sandAPercent = globals.sandBPercent;
      globals.sandBPercent = 100 - globals.sandAPercent;
      updateSandLevels(globals);
      init(globals);
      globals.isFlipping = false;
    }
  }, 1);
};

export { animateSand };
