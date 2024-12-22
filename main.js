import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js'


var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')


loadImage('/img/texture.png')
.then( img => {
    const sprite = new SpriteSheet(img,10,10);
    sprite.define('ground', 0, 0)
    sprite.define('sky', 5, 34)

    for (let x = 0; x < 30; ++x) {
        for (let y = 0; y < 15; ++y) {
            sprite.drawTile('sky', ctx, x, y);
        }
    }

    for (let x = 0; x < 30; ++x) {
        for (let y = 13; y < 15; ++y) {
            sprite.drawTile('ground', ctx, x, y);
        }
    }
    
});

