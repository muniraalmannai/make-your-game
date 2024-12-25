import { gameArea } from './structure.js';

export class Pellet {
    constructor({ position }) {
        this.position = position;
        this.radius = 3;
        
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.backgroundColor = 'white';
        this.element.style.borderRadius = '50%';
        this.element.style.left = `${this.position.x - this.radius}px`;
        this.element.style.top = `${this.position.y - this.radius}px`;
        
        gameArea.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}

export function createPellets(map, Boundary) {
    const pellets = [];
    const spawnX = Boundary.width * 10 + Boundary.width / 2;
    const spawnY = Boundary.width * 9 + Boundary.width / 2;

    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === ' ') {
                const pelletX = Boundary.width * j + Boundary.width / 2;
                const pelletY = Boundary.height * i + Boundary.height / 2;
                
                // Skip pellet creation at spawn point
                if (pelletX === spawnX && pelletY === spawnY) return;
                
                pellets.push(
                    new Pellet({
                        position: {
                            x: pelletX,
                            y: pelletY
                        }
                    })
                );
            }
        });
    });
    return pellets;
}
