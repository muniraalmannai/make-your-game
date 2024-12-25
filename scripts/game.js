import {Boundary,Player} from './structure.js'
import {map} from './map.js'


const boundaries = [];

//defines pac-man attributes
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
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

    //adds collision
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