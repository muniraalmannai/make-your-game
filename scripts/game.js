// hi im a commit weird isn't it>

import { Boundary, Player, gameArea, scoringBare } from './structure.js';
import { map } from './map.js';
import { createPellets } from './pellets.js';
import { ScoreManager, LifeCount, FPSCounter, Timer } from './scoring.js';
import { Ghost } from './ghosts.js';
import { Win,Loss } from './win-loss.js';

const boundaries = [];
const pellets = createPellets(map, Boundary);
const scoreManager = new ScoreManager(scoringBare);
const lifeCount = new LifeCount(scoringBare);
const fpsCounter = new FPSCounter(scoringBare);
const timerDisplay = new Timer(scoringBare);

var player = new Player({
    position: {
        x: Boundary.width * 10 + Boundary.width / 2,
        y: Boundary.width * 3 + Boundary.width / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

let gameOver = false;
export var lastKey = '';
let timeScale = 1;
let isPaused = false;

// Loops through map to create boundaries
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                );
                break;
        }
    });
});

// Checks for collision
export function collision({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
    );
}



export var ghosts = [
    new Ghost({ position: { x: Boundary.width * 8 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'red', behavior: 'blinky' }),
    new Ghost({ position: { x: Boundary.width * 9 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'pink', behavior: 'pinky' }),
    new Ghost({ position: { x: Boundary.width * 11 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'cyan', behavior: 'inky' }),
    new Ghost({ position: { x: Boundary.width * 12 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'orange', behavior: 'clyde' })
];

function recovery(){
        
    player.erase()

    ghosts.forEach(ghost => {
        ghost.remove()
    })

    ghosts = [
        new Ghost({ position: { x: Boundary.width * 8 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'red', behavior: 'blinky' }),
        new Ghost({ position: { x: Boundary.width * 9 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'pink', behavior: 'pinky' }),
        new Ghost({ position: { x: Boundary.width * 11 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'cyan', behavior: 'inky' }),
        new Ghost({ position: { x: Boundary.width * 12 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'orange', behavior: 'clyde' })
    ];

    player = new Player({
        position: {
            x: Boundary.width * 10 + Boundary.width / 2,
            y: Boundary.width * 3 + Boundary.width / 2
        },
        velocity: {
            x: 0,
            y: 0
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) { 
        // Player movement logic
        if (keys.w.pressed && lastKey === 'w') {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (collision({ circle: { ...player, velocity: { x: 0, y: -5 } }, rectangle: boundary })) {
                    player.velocity.y = 0;
                    break;
                } else {
                    player.velocity.y = -5 * timeScale;
                }
            }
        } else if (keys.a.pressed && lastKey === 'a') {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (collision({ circle: { ...player, velocity: { x: -5, y: 0 } }, rectangle: boundary })) {
                    player.velocity.x = 0;
                    break;
                } else {
                    player.velocity.x = -5 * timeScale;
                }
            }
        } else if (keys.s.pressed && lastKey === 's') {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (collision({ circle: { ...player, velocity: { x: 0, y: 5 } }, rectangle: boundary })) {
                    player.velocity.y = 0;
                    break;
                } else {
                    player.velocity.y = 5 * timeScale;
                }
            }
        } else if (keys.d.pressed && lastKey === 'd') {
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (collision({ circle: { ...player, velocity: { x: 5, y: 0 } }, rectangle: boundary })) {
                    player.velocity.x = 0;
                    break;
                } else {
                    player.velocity.x = 5 * timeScale;
                }
            }
        }

        // Ghost collision prevention
        for (let i = 0; i < ghosts.length; i++) {
            for (let j = i + 1; j < ghosts.length; j++) {
                const ghost1 = ghosts[i];
                const ghost2 = ghosts[j];
                
                // Calculate distance between ghosts
                const dx = ghost2.position.x - ghost1.position.x;
                const dy = ghost2.position.y - ghost1.position.y;
                const distance = Math.hypot(dx, dy);
                
                // If ghosts are too close (less than their combined radii plus a small buffer)
                const minDistance = ghost1.radius + ghost2.radius + 2;
                if (distance < minDistance) {
                    // Calculate normalized direction vector
                    const nx = dx / distance;
                    const ny = dy / distance;
                    
                    // Calculate proposed new positions
                    const separationDistance = (minDistance - distance) / 2;
                    const ghost1NewPos = {
                        x: ghost1.position.x - nx * separationDistance,
                        y: ghost1.position.y - ny * separationDistance
                    };
                    const ghost2NewPos = {
                        x: ghost2.position.x + nx * separationDistance,
                        y: ghost2.position.y + ny * separationDistance
                    };

                    // Check if new positions would cause boundary collisions
                    let ghost1Blocked = false;
                    let ghost2Blocked = false;
                    
                    for (const boundary of boundaries) {
                        if (collision({
                            circle: { ...ghost1, position: ghost1NewPos, radius: ghost1.radius },
                            rectangle: boundary
                        })) {
                            ghost1Blocked = true;
                        }
                        if (collision({
                            circle: { ...ghost2, position: ghost2NewPos, radius: ghost2.radius },
                            rectangle: boundary
                        })) {
                            ghost2Blocked = true;
                        }
                    }

                    // Only move ghosts if they won't hit boundaries
                    if (!ghost1Blocked) {
                        ghost1.position.x = ghost1NewPos.x;
                        ghost1.position.y = ghost1NewPos.y;
                    }
                    if (!ghost2Blocked) {
                        ghost2.position.x = ghost2NewPos.x;
                        ghost2.position.y = ghost2NewPos.y;
                    }

                    // If both ghosts are blocked, give them a small random nudge in a safe direction
                    if (ghost1Blocked && ghost2Blocked) {
                        const angle = Math.random() * Math.PI * 2;
                        const pushDistance = 1;
                        ghost1.velocity.x = Math.cos(angle) * pushDistance;
                        ghost1.velocity.y = Math.sin(angle) * pushDistance;
                        ghost2.velocity.x = -Math.cos(angle) * pushDistance;
                        ghost2.velocity.y = -Math.sin(angle) * pushDistance;
                    }
                }
            }
        }

        ghosts.forEach(ghost => {
            ghost.update(player, boundaries);

            // Check for ghost collision with player
            if (Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) < ghost.radius + player.radius) {
                if (!ghost.scared) {
                    lifeCount.lifeLost();
                    lastKey = 'a';
                    recovery();
                    if (lifeCount.lives == 0) {
                        isPaused = true;
                        timeScale = 0; // Stop all movement
                        Loss();
                        timerDisplay.stop()
                        gameOver = true
                    }
                }
            }
        });

        // Collision logic
        boundaries.forEach(boundary => {
            if (collision({ circle: player, rectangle: boundary })) {
                player.velocity.x = 0;
                player.velocity.y = 0;
            }
        });

        // Pellet logic
        pellets.forEach((pellet, index) => {
            if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < player.radius + pellet.radius) {
                pellets.splice(index, 1);
                scoreManager.addPoints(10);
                pellet.remove();
            }
        });

        if (scoreManager.score === 2060){
            isPaused = true;
            timeScale = 0; // Stop all movement
            Win();
            timerDisplay.stop()
            gameOver = true;
        } 

        // Warping logic
        if (player.position.y >= Boundary.height * 9 && player.position.y <= Boundary.height * 10) {
            let warped = false;
            
            if (player.position.x > Boundary.width * 20) {
                player.position.x = Boundary.width;
                warped = true;
            }
            if (player.position.x < Boundary.width) {
                player.position.x = Boundary.width * 20;
                warped = true;
            }
            
            if (warped) {
                for (let i = pellets.length - 1; i >= 0; i--) {
                    const pellet = pellets[i];
                    if (pellet.position.y === Boundary.height * 9 + Boundary.height / 2) {
                        if (pellet.position.x === Boundary.width / 2 || pellet.position.x === Boundary.width * 20 + Boundary.width / 2) {
                            pellets.splice(i, 1);
                            scoreManager.addPoints(10);
                            pellet.remove();
                        }
                    }
                }
            }
        }

        player.update();
    }
}

function togglePause() {
    if (!gameOver){
        if (isPaused) {
                unpause();
            } else {
                pause();
            }
    }
    
}

function pause() {
    isPaused = true;
    timeScale = 0; // Stop all movement
    timerDisplay.stop(); // Stops the timer
    let pauseOverlay = document.getElementById('pause-overlay');

    if (!pauseOverlay) {
        pauseOverlay = document.createElement('div');
        pauseOverlay.id = 'pause-overlay';
        pauseOverlay.style.position = 'fixed';
        pauseOverlay.style.top = '0';
        pauseOverlay.style.left = '0';
        pauseOverlay.style.width = '100%';
        pauseOverlay.style.height = '100%';
        pauseOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        pauseOverlay.style.color = 'white';
        pauseOverlay.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        pauseOverlay.style.textAlign = 'center';
        pauseOverlay.style.display = 'flex';
        pauseOverlay.style.flexDirection = 'column';
        pauseOverlay.style.alignItems = 'center';
        pauseOverlay.style.justifyContent = 'center';
        pauseOverlay.style.zIndex = '1000';
        pauseOverlay.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.9)';

        const pauseText = document.createElement('div');
        pauseText.textContent = 'Game Paused';
        pauseText.style.fontSize = '80px';
        pauseText.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        pauseText.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
        pauseText.style.marginBottom = '30px';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '20px';

        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.style.padding = '15px 30px';
        continueButton.style.backgroundColor = '#007BFF';
        continueButton.style.color = 'white';
        continueButton.style.border = 'none';
        continueButton.style.borderRadius = '8px';
        continueButton.style.fontSize = '24px';
        continueButton.style.cursor = 'pointer';
        continueButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        continueButton.style.transition = 'background-color 0.3s, transform 0.2s';
        continueButton.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        continueButton.onmouseover = () => continueButton.style.backgroundColor = '#0056b3';
        continueButton.onmouseout = () => continueButton.style.backgroundColor = '#007BFF';
        continueButton.onmousedown = () => continueButton.style.transform = 'scale(0.95)';
        continueButton.onmouseup = () => continueButton.style.transform = 'scale(1)';
        continueButton.onclick = unpause;

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Game';
        resetButton.style.padding = '15px 30px';
        resetButton.style.backgroundColor = '#007BFF';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '8px';
        resetButton.style.fontSize = '24px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        resetButton.style.transition = 'background-color 0.3s, transform 0.2s';
        resetButton.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        resetButton.onmouseover = () => resetButton.style.backgroundColor = '#0056b3';
        resetButton.onmouseout = () => resetButton.style.backgroundColor = '#007BFF';
        resetButton.onmousedown = () => resetButton.style.transform = 'scale(0.95)';
        resetButton.onmouseup = () => resetButton.style.transform = 'scale(1)';
        resetButton.onclick = resetGame;

        buttonContainer.appendChild(continueButton);
        buttonContainer.appendChild(resetButton);

        pauseOverlay.appendChild(pauseText);
        pauseOverlay.appendChild(buttonContainer);
        document.body.appendChild(pauseOverlay);
    } else {
        pauseOverlay.style.display = 'flex';
    }
}

function unpause() {
    isPaused = false;
    timeScale = 1; 
    timerDisplay.resume(); // Resumes the timer
    const pauseOverlay = document.getElementById('pause-overlay');

    if (pauseOverlay) {
        pauseOverlay.style.display = 'none';
    }
}

function resetGame() {
    // Add your reset logic here
    location.reload(); // Reloads the page to reset the game
}

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'p':
            togglePause();
            break;
        case 'r':
            location.reload()
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        
    }
});

animate();