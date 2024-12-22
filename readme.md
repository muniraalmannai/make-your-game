# make-your-game

This is a simple Super Mario-like game built with pure HTML, CSS, and JavaScript. The goal of the game is to create a smooth and responsive experience while maintaining a consistent 60 FPS. The game includes features such as moving Mario, jumping, collision detection, enemies, a timer, a score, a pause menu, and more. The game runs entirely on the browser with no external libraries or frameworks.

## Features

- **Smooth 60 FPS Gameplay**: The game ensures consistent motion with no frame drops using `requestAnimationFrame`.
- **Player Movement**: The player controls Mario using the arrow keys for left/right movement and jump.
- **Jumping and Gravity**: Mario can jump and is affected by gravity, allowing him to land on platforms.
- **Platforms and Obstacles**: The game includes platforms that Mario can stand on and enemies that Mario must avoid.
- **Pause Menu**: The game includes a pause menu with options to resume or restart the game.
- **Scoreboard and Timer**: The game displays the player's score, remaining lives, and a countdown timer.
- **Collision Detection**: The game checks for collisions between Mario, platforms, and enemies.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.).
- No external dependencies; everything is implemented using plain JavaScript, HTML, and CSS.

### Installation

1. Download or clone this repository:
    ```bash
    git clone https://github.com/yourusername/supermario-game.git
    ```

2. Open the `index.html` file in your browser.

### Running the Game

1. Open the game in your browser by double-clicking the `index.html` file.
2. Use the arrow keys:
   - **Left Arrow**: Move Mario left.
   - **Right Arrow**: Move Mario right.
   - **Up Arrow**: Make Mario jump.

### Pause Menu Controls

- **P**: Pause the game and show the pause menu.
- **Resume**: Click the "Resume" button in the pause menu to continue the game.
- **Restart**: Click the "Restart" button in the pause menu to restart the game.

### Gameplay

- **Objective**: Avoid enemies and obstacles while collecting points. The game will end when you run out of lives or collect all the coins.
- **Timer**: The countdown timer will indicate how much time is left before the game ends.
- **Score**: The score increases as you avoid enemies and obstacles.
- **Lives**: You start with 3 lives. Lose a life when colliding with enemies.

### Developer Tools

You can use the browser's developer tools to monitor performance and optimize your game:
- **Performance Tool**: To check if the game runs smoothly at 60 FPS and to analyze performance.
- **Console**: For any log messages and debugging.
- **Elements Panel**: To inspect and modify the game structure and layout.

## Game Structure

- **index.html**: The main HTML structure, where the game elements are rendered.
- **game.js**: The main game logic, including handling movement, collisions, and rendering.
- **style.css**: Basic styling for the game container and elements.

## Future Enhancements

- Add more levels or challenges.
- Improve the visuals with sprites and animations.
- Implement power-ups or other interactive game elements.
- Add background music and sound effects for actions (e.g., jumping, collisions).

---

**Enjoy the game and feel free to contribute!**

