import { gameArea } from "./structure.js";
import { lastKey } from "./game.js";

export class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.element = document.createElement("div");
    this.element.id = "pac";

    // Base styles for Pac-Man
    this.element.style.position = "absolute";
    this.element.style.width = `${this.radius * 2}px`;
    this.element.style.height = `${this.radius * 2}px`;
    this.element.style.backgroundColor = "#FFFF00"; // Pac-Man yellow
    this.element.style.borderRadius = "50%";
    this.element.style.left = `${this.position.x - this.radius}px`;
    this.element.style.top = `${this.position.y - this.radius}px`;
    this.angle = 0;

    // Create Pac-Man's mouth using a pseudo-element
    this.element.style.clipPath =
      "polygon(0 0, 50% 50%, 0 100%, 100% 100%, 0% 0)";

    // Add animation for chomping effect
    this.element.style.animation = "chomp 0.3s linear infinite";

    // Add CSS animation keyframes to the document
    if (!document.getElementById("pacmanAnimation")) {
      const style = document.createElement("style");
      style.id = "pacmanAnimation";
      style.textContent = `
                @keyframes chomp {
                    0% { clip-path: polygon(0 0, 50% 50%, 0 200%, 100% 100%, 100% 0); }
                    50% { clip-path: polygon(0 0, 60% 50%, 0 70%, 100% 100%, 100% 0); }
                    100% { clip-path: polygon(0 0, 50% 50%, 0 190%, 100% 100%, 100% 0); }
                }
            `;
      document.head.appendChild(style);
    }

    gameArea.appendChild(this.element);
  }

  draw() {
    this.element.style.left = `${this.position.x - this.radius}px`;
    this.element.style.top = `${this.position.y - this.radius}px`;

    let angle = 0;
    if (this.velocity.x > 0) angle = 180;
    else if (this.velocity.x < 0) angle = 360;
    else if (this.velocity.y < 0) angle = 90;
    else if (this.velocity.y > 0) angle = 270;
    else {
      if (lastKey == "w") {
        angle = 90;
      } else if (lastKey == "a") {
        angle = 360;
      } else if (lastKey == "s") {
        angle = 270;
      } else if (lastKey == "d") {
        angle = 180;
      }
    }
    this.element.style.transform = `rotate(${angle}deg)`;
  }

  erase() {
    var elemento = document.getElementById(this.element.id);
    elemento.remove();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
