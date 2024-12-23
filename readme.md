# make-your-game

This is a simple Pac-Man-like game built with pure HTML, CSS, and JavaScript. The goal of the game is to create a smooth and responsive experience while maintaining a consistent 60 FPS. The game includes features such as moving Pac-Man, collecting pellets, avoiding ghosts, a timer, a score, a pause menu, and more. The game runs entirely on the browser with no external libraries or frameworks.

## Features

- **Smooth 60 FPS Gameplay**: The game ensures consistent motion with no frame drops using `requestAnimationFrame`.
- **Player Movement**: The player controls Pac-Man using the WASD keys for up/down/left/right movement.
- **Pellet Collection**: Pac-Man collects pellets to increase the score and progress through the game.
- **Ghost Enemies**: Ghosts roam the maze and chase Pac-Man. The game ends if Pac-Man collides with a ghost.
- **Power Pellets**: Eating power pellets temporarily makes Pac-Man invincible and allows him to eat ghosts.
- **Pause Menu**: The game includes a pause menu with options to resume or restart the game.
- **Scoreboard and Timer**: The game displays the player's score, remaining lives, and a countdown timer.
- **Collision Detection**: The game checks for collisions between Pac-Man, pellets, walls, and ghosts.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.).
- No external dependencies; everything is implemented using plain JavaScript, HTML, and CSS.

### Installation

1. Download or clone this repository:
    ```bash
    git clone https://github.com/yourusername/pacman-game.git
    ```

2. Open the `index.html` file in your browser.

### Running the Game

1. Open the game in your browser.
2. Use the WASD keys to control Pac-Man:
   - **W**: Move up.
   - **S**: Move down.
   - **A**: Move left.
   - **D**: Move right.

### Pause Menu Controls

- **P**: Pause the game and show the pause menu.
- **Resume**: Click the "Resume" button in the pause menu to continue the game.
- **Restart**: Click the "Restart" button in the pause menu to restart the game.

### Gameplay

- **Objective**: Collect all the pellets while avoiding ghosts. The game ends when you run out of lives or clear all the pellets.
- **Power Pellets**: Eating a power pellet lets Pac-Man temporarily eat ghosts for extra points.
- **Timer**: The countdown timer will indicate how much time is left before the game ends.
- **Score**: The score increases as you collect pellets and eat ghosts.
- **Lives**: You start with 3 lives. Lose a life when colliding with ghosts without invincibility.

## Game Structure

- **index.html**: The main HTML structure, where the game elements are rendered.
- **game.js**: The main game logic, including handling movement, collisions, and rendering.
- **styles.css**: Basic styling for the game container and elements.

## Future Enhancements

- Add more maze layouts and difficulty levels.
- Improve the visuals with sprites and animations.
- Implement additional power-ups or bonus items.
- Add background music and sound effects for actions (e.g., eating pellets, collisions).

---

**Enjoy the game and feel free to contribute!**

