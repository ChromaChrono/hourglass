import { events } from "./events";
import { init } from "./actions.js";

export default (root) => {
  const sandA = root.getElementById("hourglassSandTop");
  const sandB = root.getElementById("hourglassSandBottom");
  const hourglass = root.getElementById("hourglass");

  const globals = {
    // Time in seconds
    time: 180,
    sandA,
    sandB,
    hourglass,
    // Time to rotate hourglass in milliseconds
    rotationTime: 300,
    timePassed: 0,
    theInterval: null,
    sandAPercent: 100,
    sandBPercent: 0,
    isFlipping: false,
  };

  init(globals);
  events(globals);
};
