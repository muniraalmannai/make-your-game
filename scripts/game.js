import { Boundary, Player, gameArea } from './structure.js';
import { map } from './map.js';
import { createPellets } from './pellets.js';
import { ScoreManager, LifeCount } from './scoring.js';
import { Ghost } from './ghosts.js';

const boundaries = [];
const pellets = createPellets(map, Boundary);
const scoreManager = new ScoreManager(gameArea);
const lifeCount = new LifeCount(gameArea);

// Defines pac-man attributes
const player = new Player({
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

export const ghosts = [
    new Ghost({ position: { x: Boundary.width * 8 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'red', behavior: 'blinky' }),
    new Ghost({ position: { x: Boundary.width * 9 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'pink', behavior: 'pinky' }),
    new Ghost({ position: { x: Boundary.width * 11 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'cyan', behavior: 'inky' }),
    new Ghost({ position: { x: Boundary.width * 12 + Boundary.width / 2, y: Boundary.width * 9 + Boundary.width / 2 }, color: 'orange', behavior: 'clyde' })
];

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
                    if (lifeCount.lifes === 0) {
                        console.log('Game Over!');
                        location.reload();
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

    if (!pauseOverlay) {
        pauseOverlay = document.createElement('div');
        pauseOverlay.id = 'pause-overlay';
        pauseOverlay.style.position = 'absolute';
        pauseOverlay.style.top = '0';
        pauseOverlay.style.left = '0';
        pauseOverlay.style.width = '100%';
        pauseOverlay.style.height = '100%';
        pauseOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        pauseOverlay.style.color = 'white';
        pauseOverlay.style.fontFamily = 'Helvetica, Arial, sans-serif';
        pauseOverlay.style.fontSize = '60px';
        pauseOverlay.style.textAlign = 'center';
        pauseOverlay.style.display = 'flex';
        pauseOverlay.style.alignItems = 'center';
        pauseOverlay.style.justifyContent = 'center';
        pauseOverlay.textContent = 'Game Paused';
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