import {Boundary,gameArea} from './structure.js'
import {collision,ghosts} from './game.js';

export class Ghost {
    constructor({ position, color, behavior, id}) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.id = id;
        this.radius = 15.75;
        this.color = color;
        this.behavior = behavior;
        this.speed = 2;
        this.prevCollisions = [];
        this.scared = false;
        this.scatterMode = false;
        this.scatterTarget = this.getScatterTarget();
    
        // Create ghost element
        this.element = document.createElement('div');
        this.element.style.width = '30px';
        this.element.style.height = '30px';
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = '15px 15px 0 0'; // Rounded top, flat bottom
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        this.element.style.transition = 'transform 0.1s';
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.style.overflow = 'hidden';
        // Create eyes
        const eyeLeft = document.createElement('div');
        eyeLeft.style.width = '8px';
        eyeLeft.style.height = '8px';
        eyeLeft.style.backgroundColor = 'white';
        eyeLeft.style.borderRadius = '50%';
        eyeLeft.style.position = 'absolute';
        eyeLeft.style.left = '8px';
        eyeLeft.style.top = '8px';
    
        const eyeRight = document.createElement('div');
        eyeRight.style.width = '8px';
        eyeRight.style.height = '8px';
        eyeRight.style.backgroundColor = 'white';
        eyeRight.style.borderRadius = '50%';
        eyeRight.style.position = 'absolute';
        eyeRight.style.right = '8px';
        eyeRight.style.top = '8px';
    
        const pupilLeft = document.createElement('div');
        pupilLeft.style.width = '4px';
        pupilLeft.style.height = '4px';
        pupilLeft.style.backgroundColor = 'black';
        pupilLeft.style.borderRadius = '50%';
        pupilLeft.style.position = 'absolute';
        pupilLeft.style.left = '2px';
        pupilLeft.style.top = '2px';
        eyeLeft.appendChild(pupilLeft);
    
        const pupilRight = document.createElement('div');
        pupilRight.style.width = '4px';
        pupilRight.style.height = '4px';
        pupilRight.style.backgroundColor = 'black';
        pupilRight.style.borderRadius = '50%';
        pupilRight.style.position = 'absolute';
        pupilRight.style.left = '2px';
        pupilRight.style.top = '2px';
        eyeRight.appendChild(pupilRight);
    
        this.element.appendChild(eyeLeft);
        this.element.appendChild(eyeRight);
    
        // Add ghost to game area
        gameArea.appendChild(this.element);
    }
    update(player, boundaries) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        this.element.style.left = `${this.position.x -12}px`;
        this.element.style.top = `${this.position.y-12}px`;
        
        if (this.scatterMode) {
            this.scatter(boundaries);
        } else {
            switch(this.behavior) {
                case 'blinky':
                    this.blinkyBehavior(player, boundaries);
                    break;
                case 'pinky':
                    this.pinkyBehavior(player, boundaries);
                    break;
                case 'inky':
                    this.inkyBehavior(player, boundaries, ghosts[0]); 
                    break;
                case 'clyde':
                    this.clydeBehavior(player, boundaries);
                    break;
            }
        }
    }
    blinkyBehavior(player, boundaries) {
        const target = { x: player.position.x, y: player.position.y };
        this.moveTowardsTarget(target, boundaries);
    }
    
    // Pinky targets 4 tiles
    pinkyBehavior(player, boundaries) {
        const target = { x: player.position.x, y: player.position.y };
        const offset = 4 * Boundary.width;
    
        // Always target Pac-Man's
        switch (player.lastDirection) {
            case 'w': 
            target.y -= offset;
            target.x -= offset;
            case 's': target.y += offset; break;
            case 'a': target.x -= offset; break;
            case 'd': target.x += offset; break;
            default: break; 
        }
    
        this.moveTowardsTarget(target, boundaries);
    }
    
    // Inky targets using Blinky and Pac-Man's positions
    inkyBehavior(player, boundaries, blinky) {
        const offset = 2 * Boundary.width;
        const pacmanTarget = { x: player.position.x, y: player.position.y };
    
        switch (player.lastDirection) {
            case 'w': pacmanTarget.y -= offset; break;
            case 's': pacmanTarget.y += offset; break;
            case 'a': pacmanTarget.x -= offset; break;
            case 'd': pacmanTarget.x += offset; break;
            default: break;
        }
    
        const vectorX = pacmanTarget.x - blinky.position.x;
        const vectorY = pacmanTarget.y - blinky.position.y;
    
        const target = {
            x: blinky.position.x + vectorX * 2,
            y: blinky.position.y + vectorY * 2,
        };
    
        this.moveTowardsTarget(target, boundaries);
    }

    // Clyde is shy when close to Pac-Man
    clydeBehavior(player, boundaries) {
        const target = { x: player.position.x, y: player.position.y };
        const offset = 4 * Boundary.width;
    
        // Always target Pac-Man's
        switch (player.lastDirection) {
            case 'w': 
            target.y -= offset;
            target.x -= offset;
            case 's': target.y += offset; break;
            case 'a': target.x -= offset; break;
            case 'd': target.x += offset; break;
            default: break; 
        }
    
        this.moveTowardsTarget(target, boundaries);


    }
    
    scatter(boundaries) {
        this.moveTowardsTarget(this.scatterTarget, boundaries);
    }
    getScatterTarget() {
        
        switch(this.behavior) {
            case 'blinky':
                return { x: Boundary.width * 20, y: 0 }; 
            case 'pinky':
                return { x: 0, y: 0 }; 
            case 'inky':
                return { x: Boundary.width * 20, y: Boundary.height * 20 }; 
            case 'clyde':
                return { x: 0, y: Boundary.height * 20 }; 
            default:
                return { x: 0, y: 0 };
        }
    }
    moveTowardsTarget(target, boundaries) {
        const possibleMoves = this.getPossibleMoves(boundaries);
    
        if (possibleMoves.length === 0) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
    
        const bestMove = possibleMoves.reduce((best, move) => {
            const newPos = {
                x: this.position.x + move.x * this.speed,
                y: this.position.y + move.y * this.speed,
            };
            const distance = Math.hypot(target.x - newPos.x, target.y - newPos.y);
            return distance < best.distance ? { move, distance } : best;
        }, { move: null, distance: Infinity });
    
        this.velocity.x = bestMove.move.x * this.speed;
        this.velocity.y = bestMove.move.y * this.speed;
    }
    
    getPossibleMoves(boundaries) {
        const moves = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },  
            { x: 0, y: 1 },  
            { x: -1, y: 0 }  
        ];
    
        return moves.filter(move =>
            !boundaries.some(boundary =>
                collision({
                    circle: {
                        ...this,
                        velocity: {
                            x: move.x * this.speed,
                            y: move.y * this.speed
                        }
                    },
                    rectangle: boundary
                })
            )
        );
    }
    setScared(isScared) {
        this.scared = isScared;
        this.element.style.backgroundColor = isScared ? 'blue' : this.color;
    }
    getBestMoveFromAngle(possibleMoves, targetAngle) {
        return possibleMoves.reduce((best, move) => {
            const moveAngle = Math.atan2(move.y, move.x);
            const angleDiff = Math.abs(targetAngle - moveAngle);
            if (!best || angleDiff < best.angleDiff) {
                return { ...move, angleDiff };
            }
            return best;
        }, null);
    }
    remove() {
        this.element.remove();
    }
}