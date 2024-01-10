import { flip } from "./actions";

const events = (globals) => {
  globals.hourglass.addEventListener("click", () => {
    if (!globals.isFlipping) {
      flip(globals);
    }
  });
};

export { events };
