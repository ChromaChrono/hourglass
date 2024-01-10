import { events } from "./events";
import { init } from "./actions.js";

export default (root) => {
  const sandA = root.getElementById("hourglassSandTop");
  const sandB = root.getElementById("hourglassSandBottom");
  const hourglass = root.getElementById("hourglass");
  const timeInput = root.getElementById("timeInput");

  const globals = {
    // Time in seconds
    time: 180,
    sandA,
    sandB,
    hourglass,
    timeInput,
    // Time to rotate hourglass in milliseconds
    rotationTime: 300,
    timePassed: 0,
    theInterval: null,
    sandAPercent: 100,
    sandBPercent: 0,
    isFlipping: false,
  };

  timeInput.value = globals.time;

  init(globals);
  events(globals);
};
