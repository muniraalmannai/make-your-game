// const gameArea = document.createElement('div');
// document.body.appendChild(gameArea);
document.body.style.transform = 'scale(1))';
export const container = document.getElementById('game-container');

// gameArea.style.position = 'relative';
container.style.width = `${innerWidth}px`;
container.style.height = `${innerHeight}px`;
container.style.overflow = 'hidden';
container.style.border = '1px solid black';

export const gameArea = document.getElementById('game');
gameArea.style.width = '840px';
gameArea.style.height = '880px';
gameArea.style.position = 'absolute';
gameArea.style.left = '50%';
gameArea.style.top = '50%';
gameArea.style.transform = 'translate(-50%, -50%)';

export const scoringBare = document.getElementById('scoring');
scoringBare.style.width = '840px';
scoringBare.style.height = '45px';
scoringBare.style.position = 'absolute';
scoringBare.style.left = '50%';
scoringBare.style.top = '50%';
scoringBare.style.transform = 'translate(-50%, -960%)';

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

export class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.element = document.createElement('div');
        this.element.id = 'pac'
        
        // Base styles for Pac-Man
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.backgroundColor = '#FFFF00'; // Pac-Man yellow
        this.element.style.borderRadius = '50%';
        this.element.style.left = `${this.position.x - this.radius}px`;
        this.element.style.top = `${this.position.y - this.radius}px`;
        this.angle = 0
        
        // Create Pac-Man's mouth using a pseudo-element
        this.element.style.clipPath = 'polygon(0 0, 50% 50%, 0 100%, 100% 100%, 100% 0)';
        
        // Add animation for chomping effect
        this.element.style.animation = 'chomp 0.3s linear infinite';
        
        // Add CSS animation keyframes to the document
        if (!document.getElementById('pacmanAnimation')) {
            const style = document.createElement('style');
            style.id = 'pacmanAnimation';
            style.textContent = `
                @keyframes chomp {
                    0% { clip-path: polygon(0 0, 50% 50%, 0 190%, 100% 100%, 100% 0); }
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
        
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }

    erase(){
        var elemento = document.getElementById(this.element.id);
        elemento.remove()
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}