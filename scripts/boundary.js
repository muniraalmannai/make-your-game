import { gameArea } from "./structure.js";

export class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;

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
