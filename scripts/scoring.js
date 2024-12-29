export class ScoreManager {
    constructor(gameArea) {
        this.score = 0;
        this.scoreElement = document.createElement('div');
        this.scoreElement.style.fontSize = '24px';
        this.scoreElement.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.scoreElement.style.color = 'white';
        this.scoreElement.style.position = 'absolute';
        this.scoreElement.style.top = '10px';
        this.scoreElement.style.left = '10px';
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
        this.lives = 3;
        this.lifeElement = document.createElement('div');
        this.lifeElement.style.fontSize = '24px';
        this.lifeElement.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.lifeElement.style.color = 'white';
        this.lifeElement.style.position = 'absolute';
        this.lifeElement.style.top = '10px';
        this.lifeElement.style.left = `${((screen.width/2)/2)}px`;

        this.updateDisplay();
        gameArea.appendChild(this.lifeElement);
    }

    lifeLost() {
        this.lives -= 1;
        this.updateDisplay();
    }

    updateDisplay() {
        this.lifeElement.innerHTML = `Lives: ${this.lives}`;
    }
}

export class FPSCounter {
    constructor(gameArea) {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();

        this.fpsElement = document.createElement('div');
        this.fpsElement.style.fontSize = '24px';
        this.fpsElement.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.fpsElement.style.color = 'white';
        this.fpsElement.style.position = 'absolute';
        this.fpsElement.style.top = '10px';
        this.fpsElement.style.right = `${((screen.width/2)/2)}px`;

        this.updateDisplay();
        gameArea.appendChild(this.fpsElement);

        this.startTracking();
    }

    startTracking() {
        const calculateFPS = () => {
            this.frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - this.lastTime;

            if (elapsed >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / elapsed);
                this.frameCount = 0;
                this.lastTime = currentTime;
                this.updateDisplay();
            }

            requestAnimationFrame(calculateFPS);
        };

        calculateFPS();
    }

    updateDisplay() {
        this.fpsElement.innerHTML = `FPS: ${this.fps}`;
    }
}

export class Timer {
    constructor(gameArea) {
        this.time = 0;
        this.interval = null;
        this.gameArea = gameArea;
        this.timerDisplay = document.createElement('div');
        this.timerDisplay.style.fontSize = '24px';
        this.timerDisplay.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.timerDisplay.style.color = 'white';
        this.timerDisplay.style.position = 'absolute';
        this.timerDisplay.style.top = '10px';
        this.timerDisplay.style.right = '10px';
        this.gameArea.appendChild(this.timerDisplay);
        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            this.time++;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    resume() {
        if (!this.interval) {
            this.start();
        }
    }

    reset() {
        this.stop();
        this.time = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        this.timerDisplay.textContent = `Time: ${this.time}s`;
    }
}
