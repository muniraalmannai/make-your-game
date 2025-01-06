import { gameArea } from "./structure.js";
import { CONFIG } from "./config.js";

export class Boundary {
  static width = CONFIG.Boundary.width;
  static height = CONFIG.Boundary.height;

  constructor({ position }) {
    this.position = position;
    this.width = CONFIG.Boundary.width;
    this.height = CONFIG.Boundary.height;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.border = "1px solid black";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = "darkblue";
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    gameArea.appendChild(this.element);
  }
}
