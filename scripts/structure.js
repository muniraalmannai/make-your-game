const gameArea = document.createElement('div');
document.body.appendChild(gameArea);

// gameArea.style.position = 'relative';
gameArea.style.width = `${innerWidth}px`;
gameArea.style.height = `${innerHeight}px`;
gameArea.style.overflow = 'hidden';
gameArea.style.border = '1px solid black';

//creates the map boundaries
export class Boundary { 
    static width = 40; 
    static height = 40; 

    constructor( {position} ) {
        this.position = position;
        this.width = Boundary.width;
        this.height = Boundary.height;

        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.border = '1px solid black'
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = 'darkblue';
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;

        gameArea.appendChild(this.element);
    }
}

//creates pac-man
export class Player {
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