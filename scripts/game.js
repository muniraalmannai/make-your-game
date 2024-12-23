const gameArea = document.createElement('div');
document.body.appendChild(gameArea);

// gameArea.style.position = 'relative';
gameArea.style.width = `${innerWidth}px`;
gameArea.style.height = `${innerHeight}px`;
gameArea.style.overflow = 'hidden';
gameArea.style.border = '1px solid black';

class Boundary {
    static width = 40; 
    static height = 40; 

    constructor({ position }) {
        this.position = position;
        this.width = 40;
        this.height = 40;

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

const map = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-']
]


const boundaries = []

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


