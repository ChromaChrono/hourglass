export default (root) => {
  console.log("attempting. . ");

  const sandA = root.getElementById("hourglassSandTop");
  const sandB = root.getElementById("hourglassSandBottom");
  const hourglass = root.getElementById("hourglass");

  let time = 10;
  let timePassed = 0;
  let theInterval;
  let sandInterval;
  let rotationTime = 700;
  let sandAPercent = 100;
  let sandBPercent = 100 - sandAPercent;
  let rotation = 0;
  let flipping = false;

  const animateSand = () => {
    const time = Date.now();
    clearInterval(sandInterval);
    flipping = true;
    sandInterval = setInterval(() => {
      const timePassed = Date.now() - time;
      const animationPercent = (timePassed / rotationTime) * 100;

      const rotationDegrees = -1 * 1.8 * animationPercent;

      hourglass.style.transform = `rotate(${
        rotationDegrees > 180 ? 180 : rotationDegrees
      }deg)`;

      let sidePercentage;
      if (animationPercent < 50) {
        sidePercentage = animationPercent / 50;
      } else {
        sidePercentage = 1 - (animationPercent - 50) / 50;
      }

      // SandAPercent = 70
      // SandBPercent = 30

      // 0%: width: 100%; height: value;
      // 50%: width: value; height: 100%;
      // 100%: width 100%; height: value

      sandA.style.height = `${Math.floor(
        sandAPercent +
          (sandAPercent >= 2 ? 100 - sandAPercent : 0) * sidePercentage
      )}%`;
      sandA.style.width = `${Math.floor(
        sandAPercent +
          (sandAPercent >= 2 ? 100 - sandAPercent : 0) * (1 - sidePercentage)
      )}%`;

      sandB.style.height = `${Math.floor(
        100 -
          sandAPercent +
          (100 - sandAPercent >= 2 ? sandAPercent : 0) * sidePercentage
      )}%`;
      sandB.style.width = `${Math.floor(
        100 -
          sandAPercent +
          (100 - sandAPercent >= 2 ? sandAPercent : 0) * (1 - sidePercentage)
      )}%`;

      if (animationPercent >= 50) {
        sandA.style.alignSelf = "flex-start";
        sandB.style.alignSelf = "flex-start";
      }

      if (animationPercent >= 99) {
        hourglass.style.transform = "rotate(0)";
        sandA.style.alignSelf = "flex-end";
        sandB.style.alignSelf = "flex-end";
        clearInterval(sandInterval);
        sandAPercent = sandBPercent;
        sandBPercent = 100 - sandAPercent;
        updateSandLevels();
        flipping = false;
        init();
      }
    }, 1);
  };

  const updateSandLevels = () => {
    sandB.style.height = `${100 - sandAPercent}%`;
    sandA.style.height = `${sandAPercent}%`;
    sandA.style.width = "100%";
    sandB.style.width = "100%";
  };

  const flip = () => {
    clearInterval(theInterval);
    animateSand();
  };

  updateSandLevels();

  const init = () => {
    let timer = Date.now();
    let timeStamp = Date.now();

    theInterval = setInterval(() => {
      timePassed = convertMillisecondToSecond(Date.now() - timeStamp);
      sandAPercent = sandAPercent - (timePassed / time) * 100;
      sandBPercent = 100 - sandAPercent;
      updateSandLevels();
      timeStamp = Date.now();

      if (sandAPercent <= 0) {
        // Stop intervel when hourglass is empty

        clearInterval(theInterval);
      }
    }, 10);
  };

  init();

  // util
  function convertMillisecondToSecond(ms) {
    return ms / 1000;
  }

  hourglass.addEventListener("click", () => {
    if (!flipping) {
      flip();
    }
  });
};
