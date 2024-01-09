import { flip } from "./actions";

const events = (globals) => {
  hourglass.addEventListener("click", () => {
    if (!globals.flipping) {
      flip();
    }
  });
};

export { events };
