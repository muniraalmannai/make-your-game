export class ScoreManager {
    constructor(scoringBare) {
        this.score = 0;
        this.scoreElement = document.createElement('div');
        this.scoreElement.style.fontSize = '20px';
        this.scoreElement.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.scoreElement.style.color = 'white';
        this.scoreElement.style.position = 'absolute';
        this.scoreElement.style.top = '10px';
        this.scoreElement.style.left = '10px';
        this.updateDisplay();
        scoringBare.appendChild(this.scoreElement);
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
    constructor(scoringBare) {
        this.lives = 3;
        this.lifeElement = document.createElement('div');
        this.lifeElement.style.fontSize = '20px';
        this.lifeElement.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.lifeElement.style.color = 'white';
        this.lifeElement.style.position = 'absolute';
        this.lifeElement.style.top = '10px';
        this.lifeElement.style.marginLeft = '450px'

        this.updateDisplay();
        scoringBare.appendChild(this.lifeElement);
    }

    lifeLost() {
        this.lives -= 1;
        this.updateDisplay();
    }

    updateDisplay() {
        this.lifeElement.innerHTML = `Lives: ${this.lives}`;
    }
}

export class controlBar{
    constructor(gameArea){
        // Create the controls container
        const controls = document.createElement('div');
        controls.id = 'controls';
        controls.style.width = '840px';
        controls.style.height = '80px';
        controls.style.position = 'absolute';
        controls.style.left = '50%';
        controls.style.top = '106%'; // Position it below the game area
        controls.style.transform = 'translate(-50%, -50%)';
        controls.style.backgroundColor = 'black';
        controls.style.color = 'white';
        controls.style.textAlign = 'left';
        controls.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        controls.style.padding = '10px';
        controls.style.boxSizing = 'border-box';
        controls.style.border = '4px solid blue';
        controls.style.borderRadius = '4px';
        controls.style.display = 'flex'; 
        controls.style.justifyContent = 'space-between'; // Spread items horizontally
        controls.style.alignItems = 'center'; // Center vertically

        // Create the control descriptions as spans
        const moveControl = document.createElement('span');
        moveControl.textContent = 'WASD to move';

        const pauseControl = document.createElement('span');
        pauseControl.textContent = 'P to pause & unpause';

        const resetControl = document.createElement('span');
        resetControl.textContent = 'R to reset';
        // Append the spans to the controls container
        controls.appendChild(moveControl);
        controls.appendChild(pauseControl);
        controls.appendChild(resetControl);

        // Append the controls container to the game container
        gameArea.appendChild(controls);
    }
}

export class FPSCounter {
    constructor(scoringBare) {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();

        this.fpsElement = document.createElement('div');
        this.fpsElement.style.fontSize = '20px';
        this.fpsElement.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.fpsElement.style.color = 'white';
        this.fpsElement.style.position = 'absolute';
        this.fpsElement.style.top = '10px';
        this.fpsElement.style.marginLeft = '250px'

        this.updateDisplay();
        scoringBare.appendChild(this.fpsElement);

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
    constructor(scoringBare) {
        this.time = 0;
        this.interval = null;
        this.scoringBare = scoringBare;
        this.timerDisplay = document.createElement('div');
        this.timerDisplay.style.fontSize = '20px';
        this.timerDisplay.style.fontFamily = "'Press Start 2P', Helvetica, Arial, sans-serif";
        this.timerDisplay.style.color = 'white';
        this.timerDisplay.style.position = 'absolute';
        this.timerDisplay.style.top = '10px';
        this.timerDisplay.style.marginLeft = '650px'
        this.scoringBare.appendChild(this.timerDisplay);
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
