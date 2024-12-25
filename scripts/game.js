import {Boundary,Player, gameArea} from './structure.js'
import {map} from './map.js'
import { Pellet, createPellets } from './pellets.js';
import { ScoreManager } from './scoring.js';

const boundaries = [];
const pellets = createPellets(map, Boundary);
const scoreManager = new ScoreManager(gameArea);


//defines pac-man attributes
const player = new Player({
    position: {
        x: Boundary.width * 10 + Boundary.width / 2,
        y: Boundary.width * 9 + Boundary.width / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    w: {
        pressed: false
    }, 
    a: {
        pressed: false
    }, 
    s: {
        pressed: false
    }, 
    d: {
        pressed: false
    }
}

let lastKey = '';


//loops through map to create boundaries
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                )
            break;
        }
    })
})

//checks for collision
function collision({
    circle,
    rectangle
}) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height 
            && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x 
            && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y
            && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width     
    )    
}


function animate() {
    requestAnimationFrame(animate); 

    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                collision({
                    circle: {...player, velocity: {
                        x: 0, 
                        y: -5
                    }}, 
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0;
                break; 
            } else {
                player.velocity.y = -5;
            }
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                collision({
                    circle: {...player, velocity: {
                        x: -5, 
                        y: 0
                    }}, 
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break; 
            } else {
                player.velocity.x = -5;
            }
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                collision({
                    circle: {...player, velocity: {
                        x: 0, 
                        y: 5
                    }}, 
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0;
                break; 
            } else {
                player.velocity.y = 5;
            }
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                collision({
                    circle: {...player, velocity: {
                        x: 5, 
                        y: 0
                    }}, 
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0;
                break; 
            } else {
                player.velocity.x = 5;
            }
        }
    }

    // Collision logic
    boundaries.forEach((boundary) => {
        if (
            collision({
             circle: player, 
             rectangle: boundary
        }))
            {
                player.velocity.x = 0;
                player.velocity.y = 0;
        }    
    });
     
    // Pellet logic
pellets.forEach((pellet, index) => {
    if (Math.hypot(
        pellet.position.x - player.position.x,
        pellet.position.y - player.position.y
    ) < player.radius + pellet.radius) {
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
    //player.velocity.x = 0;
    //player.velocity.y = 0;   
}

animate();


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
    }
})


addEventListener('keyup', ({ key }) => {
  
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':3
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})