import { animateSand } from "./animations";

const flip = (globals) => {
  clearInterval(globals.theInterval);
  animateSand();
};

export { flip };
