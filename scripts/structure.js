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
scoringBare.style.height = '60px';
scoringBare.style.position = 'absolute';
scoringBare.style.left = '50%';
scoringBare.style.top = '50%';
scoringBare.style.transform = 'translate(-50%, -760%)';
