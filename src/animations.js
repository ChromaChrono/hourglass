let sandInterval;
let rotationTime = 700;
let flipping = false;

const animateSand = (globals) => {
  const time = Date.now();
  clearInterval(sandInterval);
  flipping = true;
  sandInterval = setInterval(() => {
    const timePassed = Date.now() - time;
    const animationPercent = (timePassed / rotationTime) * 100;

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

    // globals.sandAPercent = 70
    // globals.sandBPercent = 30

    // 0%: width: 100%; height: value;
    // 50%: width: value; height: 100%;
    // 100%: width 100%; height: value

    globals.sandA.style.height = `${Math.floor(
      globals.sandAPercent +
        (sandAPercent >= 2 ? 100 - globals.sandAPercent : 0) * sidePercentage
    )}%`;
    globals.sandA.style.width = `${Math.floor(
      globals.sandAPercent +
        (sandAPercent >= 2 ? 100 - globals.sandAPercent : 0) *
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
      updateSandLevels();
      flipping = false;
      init();
    }
  }, 1);
};

export { animateSand };
