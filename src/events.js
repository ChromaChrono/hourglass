import { flip } from "./actions";

const events = (globals) => {
  globals.hourglass.addEventListener("click", (e) => {
    if (!globals.isFlipping && e.target.type !== "number") {
      flip(globals);
    }
  });

  globals.timeInput.addEventListener("change", (e) => {
    globals.time = e.target.value > 0 ? e.target.value : 1;
  });
};

export { events };
