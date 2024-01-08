import HTMLTemplate from "./template.html";
import CSSStyles from "./styles.css";
import core from "/src/index.js";

export default () => {
  class CreateHourglass extends HTMLElement {
    constructor() {
      super();

      //   Build HTML from template
      const templateEl = document.createElement("template");
      templateEl.innerHTML = HTMLTemplate;

      // Append html to shadowroot
      let templateContent = templateEl.content;
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(templateContent);

      //   Build styles from style sheet
      const styleEl = document.createElement("style");
      styleEl.textContent = CSSStyles;

      //  Append styles to shadowroot
      this.shadowRoot.appendChild(styleEl);
    }
    connectedCallback() {
      this.core(this.shadowRoot);
    }
  }

  CreateHourglass.prototype.core = core;

  customElements.define("an-hourglass", CreateHourglass);
};
