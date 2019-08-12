import Player from './Player.js';
import VerticalEnemy from './VerticalEnemy.js';
import HorizontalEnemy from './HorizontalEnemy.js';
import Floor from './Floor.js';

export default class GameObjects {
    constructor(field, player, game) {
        player.X = 9;
        player.Y = 0;
        this.objects = [
            player,
            new VerticalEnemy(5, 7),
            new VerticalEnemy(6, 6),
            new VerticalEnemy(3, 2),
            new VerticalEnemy(1, 4),
            new VerticalEnemy(1, 2),
            new HorizontalEnemy(2, 5),
            new HorizontalEnemy(5, 4),
            new HorizontalEnemy(3, 1),
            new HorizontalEnemy(0, 3),
            new HorizontalEnemy(6, 4)
        ];
        this.field = field;
        this.game = game;
        this.player = player;
        this.drawObjects(this.objects, field, game);
    }

    draw() {
        this.drawObjects(this.objects, this.field, this.game);
    }

    drawObjects(objects, field, game) {
        let movements = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        for(let object of objects) {
            field[object.X][object.Y].object = object;
            let objectElement = document.createElement('div');
            objectElement.className = 'game-object game-object-'+ object.type;
            let element = document.getElementById('game-cell-' + object.X + '-' + object.Y);
            element.innerHTML = '';
            element.appendChild(objectElement);
            
            if(object instanceof Player) {
                let element = document.getElementById('game-cell-' + (object.X) + '-' + object.Y);
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X, object.Y);
                    }
                
                //UP
                if(field[object.X - 1] !== undefined && field[object.X - 1][object.Y] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + (object.X - 1) + '-' + object.Y);
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X - 1, object.Y);
                    }
                    movements.up = true;
                }

                //DOWN
                if(field[object.X + 1] !== undefined && field[object.X + 1][object.Y] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + (object.X + 1) + '-' + object.Y);
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X + 1, object.Y);
                    }
                    movements.down = true;
                }

                //RIGHT
                if(field[object.X][object.Y + 1] !== undefined && field[object.X][object.Y + 1] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + object.X + '-' + (object.Y - 0 + 1));
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X, object.Y + 1);
                    }
                    movements.right = true;
                }

                //LEFT
                if(field[object.X][object.Y - 1] !== undefined && field[object.X][object.Y - 1] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + object.X + '-' + (object.Y - 1));
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X, object.Y - 1);
                    }
                    movements.left = true;
                }

                document.onkeydown = function(event) {
                    event.preventDefault();
                    switch (event.keyCode) {
                        case 37:
                            if(movements.left === true) game.action(object.X, object.Y - 1);
                            break;
                        case 38:
                            if(movements.up === true) game.action(object.X - 1, object.Y);
                            break;
                        case 39:
                            if(movements.right === true) game.action(object.X, object.Y + 1);
                            break;
                        case 40:
                            if(movements.down === true) game.action(object.X + 1, object.Y);
                            break;
                        case 32:
                            game.action(object.X, object.Y);
                            break;
                    }
                };
            }
        }
        
    }
}