import {Boundary,gameArea} from './structure.js'
import {collision,ghosts} from './game.js';

export class Ghost {
    constructor({ position, color, behavior }) {
        this.isInBox = true;
        this.releaseDelay = this.getReleaseDelay(behavior);
        this.releaseTimer = 0;
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.radius = 15;
        this.color = color;
        this.behavior = behavior;
        this.speed = 2;
        this.prevCollisions = [];
        this.scared = false;
        this.scatterMode = false;
        this.scatterTarget = this.getScatterTarget();
        this.scatterTimer = 0;
        this.scatterDuration = 7000; // 7 seconds scatter
        this.chaseDuration = 20000;  // 20 seconds chase
        this.mode = 'scatter';
    
        // Create ghost element
        this.element = document.createElement('div');
        this.element.style.width = '30px';
        this.element.style.height = '30px';
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = '15px 15px 0 0'; // Rounded top, flat bottom
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.position.x }px`;
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
        
        switch(this.behavior) {
            case 'blinky': // Red
                this.velocity.x = this.speed;
                break;
            case 'pinky': // Pink
                this.velocity.y = -this.speed;
                break;
            case 'inky': // Blue
                this.velocity.y = -this.speed;
                break;
            case 'clyde': // Orange
                this.velocity.x = -this.speed;
                break;
        }
    }

    // Delay logic
    getReleaseDelay(behavior) {
        switch(behavior) {
            case 'blinky': return 0;
            case 'pinky': return 1000;
            case 'inky': return 2000;
            case 'clyde': return 3000;
            default: return 0;
        }
    }

    update(player, boundaries) {
        // Delay implementation 
        if (this.isInBox) {
            this.releaseTimer += 16.67; // Assuming 60fps
            if (this.releaseTimer >= this.releaseDelay) {
                this.isInBox = false;
            } else {
                this.velocity.x = 0;
                this.velocity.y = 0;
                return;
            }
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        
        if (this.behavior === 'blinky' && this.position.x >= Boundary.width * 13) {
            this.velocity.x = 0;
            this.velocity.y = -this.speed;
        }
        
        if (this.behavior === 'clyde' && this.position.x <= Boundary.width * 7) {
            this.velocity.x = 0;
            this.velocity.y = -this.speed;
        }


        this.scatterTimer += 16.67; // for 60fps
    
        if (this.mode === 'scatter' && this.scatterTimer >= this.scatterDuration) {
            this.mode = 'chase';
            this.scatterTimer = 0;
        } else if (this.mode === 'chase' && this.scatterTimer >= this.chaseDuration) {
            this.mode = 'scatter';
            this.scatterTimer = 0;
        }
        
        if (this.mode === 'scatter') {
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
        ghosts.forEach(ghost => {
        if (ghost !== this) {
            const distance = Math.hypot(
                ghost.position.x - this.position.x,
                ghost.position.y - this.position.y
            );
            if (distance < this.radius * 2) {
                this.velocity.x += (this.position.x - ghost.position.x) * 0.1;
                this.velocity.y += (this.position.y - ghost.position.y) * 0.1;
            }
        }
    });
    }

    blinkyBehavior(player, boundaries) {
        if (!player || !player.position || typeof this.moveTowardsTarget !== 'function') {
            console.error('Invalid player object or missing moveTowardsTarget method');
            return;
        }
    
        const target = { x: player.position.x, y: player.position.y };
        this.moveTowardsTarget(target, boundaries);
    }
    
    
    // Pinky targets 4 tiles
    pinkyBehavior(player, boundaries) {
        const target = { x: player.position.x, y: player.position.y };
        const offset = 4 * Boundary.width;
    
        switch (player.lastDirection) {
            case 'w':
                target.y -= offset;
                target.x -= offset;
                break;
            case 's':
                target.y += offset;
                break;
            case 'a':
                target.x -= offset;
                break;
            case 'd':
                target.x += offset;
                break;
            default:
                break; // Do nothing if direction is invalid
        }
        this.moveTowardsTarget(target, boundaries);
    }
    
    // Inky targets using Blinky and Pac-Man's positions
    inkyBehavior(player, boundaries, blinky) {
        if (!player || !player.position || !blinky || !blinky.position) {
            console.error('Invalid player or blinky object');
            return;
        }
        
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
        const distance = Math.hypot(
            player.position.x - this.position.x,
            player.position.y - this.position.y
        );
        // If Clyde is within 8 tiles of Pac-Man, scatter to corner
    const target = distance <= Boundary.width * 8 
        ? this.scatterTarget 
        : { x: player.position.x, y: player.position.y };

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

    // moveTowardsTarget(target, boundaries) {
    //     const possibleMoves = this.getPossibleMoves(boundaries);

    //     if (possibleMoves.length === 0) {
    //         this.velocity.x = -this.velocity.x;
    //         this.velocity.y = -this.velocity.y;
    //         return;
    //     }
    
    //     const bestMove = possibleMoves.reduce((best, move) => {
    //         const newPos = {
    //             x: this.position.x + move.x * this.speed,
    //             y: this.position.y + move.y * this.speed,
    //         };
    //         const distance = Math.hypot(target.x - newPos.x, target.y - newPos.y);
    //         const randomFactor = Math.random() * 0.2;
    //         return (distance + randomFactor) < best.distance ? { move, distance } : best;
    //     }, { move: null, distance: Infinity });
    
    //     this.velocity.x = bestMove.move.x * this.speed;
    //     this.velocity.y = bestMove.move.y * this.speed;
    // }
    
    moveTowardsTarget(target, boundaries) {
        const possibleMoves = this.getPossibleMoves(boundaries);

        // Handle cases with no possible moves
        if (possibleMoves.length === 0) {
            console.warn('No possible moves available');
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
        
        const atIntersection = possibleMoves.length > 1;
        
        if (atIntersection || possibleMoves.length === 0) {
            const bestMove = possibleMoves.reduce((best, move) => {
                const newPos = {
                    x: this.position.x + move.x * this.speed,
                    y: this.position.y + move.y * this.speed,
                };
                const distanceSquared =
                    (target.x - newPos.x) ** 2 + (target.y - newPos.y) ** 2;
                const randomFactor = Math.random() * 0.01; // Small randomness
    
                return (distanceSquared + randomFactor) < best.distanceSquared
                    ? { move, distanceSquared }
                    : best;
            }, { move: null, distanceSquared: Infinity });
            if (bestMove.move) {
                this.velocity.x = bestMove.move.x * this.speed;
                this.velocity.y = bestMove.move.y * this.speed;
            }
        }
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
