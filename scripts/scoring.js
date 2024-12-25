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
