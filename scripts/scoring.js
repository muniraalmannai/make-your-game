export class ScoreManager {
    constructor(gameArea) {
        this.score = 0;
        this.scoreElement = document.createElement('div');
        this.scoreElement.style.color = 'white';
        this.scoreElement.style.position = 'absolute';
        this.scoreElement.style.bottom = '10px';
        this.scoreElement.style.width = '100%';
        this.scoreElement.style.textAlign = 'center';
        this.updateDisplay();
        gameArea.appendChild(this.scoreElement);
    }

    addPoints(points) {
        this.score += points;
        this.updateDisplay();
    }

    updateDisplay() {
        this.scoreElement.innerHTML = `Score: ${this.score}`;
    }

    getScore() {
        return this.score;
    }
}

export class LifeCount {
    constructor(gameArea) {
        this.lifes = 3;
        this.lifeElement = document.createElement('div');
        this.lifeElement.style.color = 'white';
        this.lifeElement.style.position = 'absolute';
        this.lifeElement.style.bottom = '10px';
        this.lifeElement.style.width = '100%';
        this.lifeElement.style.paddingLeft = '90px'
        this.lifeElement.style.textAlign = 'center';
        this.updateDisplay();
        gameArea.appendChild(this.lifeElement);
    }

    lifeLost() {
        this.lifes -= 1;
        this.updateDisplay();
    }

    updateDisplay() {
        this.lifeElement.innerHTML = `lifes: ${this.lifes}`;
    }

    getLife() {
        return this.life;
    }
}


