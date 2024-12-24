const gameArea = document.createElement('div');
document.body.appendChild(gameArea);

// gameArea.style.position = 'relative';
gameArea.style.width = `${innerWidth}px`;
gameArea.style.height = `${innerHeight}px`;
gameArea.style.overflow = 'hidden';
gameArea.style.border = '1px solid black';

//creates the map boundaries
class Boundary { 
    static width = 40; 
    static height = 40; 

    constructor({ position }) {
        this.position = position;
        this.width = Boundary.width;
        this.height = Boundary.height;

        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = 'blue';
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;

        gameArea.appendChild(this.element);
    }

}

//creates pac-man
class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;

        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.backgroundColor = 'yellow';
        this.element.style.borderRadius = '50%';
        this.element.style.left = `${this.position.x - this.radius}px`;
        this.element.style.top = `${this.position.y - this.radius}px`;

        gameArea.appendChild(this.element);
    }

    draw() {
        this.element.style.left = `${this.position.x - this.radius}px`;
        this.element.style.top = `${this.position.y - this.radius}px`;
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x; 
        this.position.y += this.velocity.y;
    }
}

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

// defines how the map boundaries look
const map = [ 
    ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-']
]


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
    // player.velocity.x = 0;
    // player.velocity.y = 0;   
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
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})