import { Boundary, Player, gameArea } from './structure.js';
import { map } from './map.js';
import { createPellets } from './pellets.js';
import { ScoreManager, LifeCount, FPSCounter } from './scoring.js';
import { Ghost } from './ghosts.js';
import { Win,Loss } from './win-loss.js';

const boundaries = [];
const pellets = createPellets(map, Boundary);
const scoreManager = new ScoreManager(gameArea);
const lifeCount = new LifeCount(gameArea);
const fpsCounter = new FPSCounter(gameArea);

// Rest of the code remains exactly the same...
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

let lastKey = '';
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

        ghosts.forEach(ghost => {
            ghost.update(player, boundaries);

            // Check for ghost collision with player
            if (Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) < ghost.radius + player.radius) {
                if (!ghost.scared) {
                    lifeCount.lifeLost();
                    recovery();
                    if (lifeCount.lifes == 0) {
                        isPaused = true;
                        timeScale = 0; // Stop all movement
                        Loss();
                    }
                }
            }
        });

        //Collision logic
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

        if (scoreManager.score === 2070){
            isPaused = true;
            timeScale = 0; // Stop all movement
            Win();
        } 

        // Warping logic
        if (player.position.y >= Boundary.height * 9 && player.position.y <= Boundary.height * 10) {
            if (player.position.x > Boundary.width * 20) {
                player.position.x = Boundary.width;
            }
            if (player.position.x < Boundary.width) {
                player.position.x = Boundary.width * 20;
            }
        }

        player.update();
    }
}

function togglePause() {
    if (isPaused) {
        unpause();
    } else {
        pause();
    }
}

function pause() {
    isPaused = true;
    timeScale = 0; // Stop all movement
    let pauseOverlay = document.getElementById('pause-overlay');

    //creates the pause page
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

        //creates 'game paused' text
        const pauseText = document.createElement('div');
        pauseText.textContent = 'Game Paused';
        pauseText.style.fontSize = '80px';
        pauseText.style.fontWeight = 'bold';
        pauseText.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
        pauseText.style.marginBottom = '30px';

        //creates button element and resets on click
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Game';
        resetButton.style.padding = '15px 30px';
        resetButton.style.fontSize = '24px';
        resetButton.style.fontWeight = 'bold';
        resetButton.style.color = '#fff';
        resetButton.style.backgroundColor = '#007BFF';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '8px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        resetButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        resetButton.style.transition = 'background-color 0.3s, transform 0.2s';
        resetButton.onmouseover = () => resetButton.style.backgroundColor = '#0056b3';
        resetButton.onmouseout = () => resetButton.style.backgroundColor = '#007BFF';
        resetButton.onmousedown = () => resetButton.style.transform = 'scale(0.95)';
        resetButton.onmouseup = () => resetButton.style.transform = 'scale(1)';
        resetButton.onclick = resetGame;

        pauseOverlay.appendChild(pauseText);
        pauseOverlay.appendChild(resetButton);
        document.body.appendChild(pauseOverlay);
    } else {
        pauseOverlay.style.display = 'flex';
    }
}
function unpause() {
    isPaused = false;
    timeScale = 1;
    const pauseOverlay = document.getElementById('pause-overlay');

    if (pauseOverlay) {
        pauseOverlay.style.display = 'none';
    }
}

//resets the game when triggered in pause
function resetGame() {
    location.reload();
}

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            player.angle = 90;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            player.angle = 360;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            player.angle = 270;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            player.angle = 180;
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