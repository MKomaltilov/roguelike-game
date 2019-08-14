import Player from './Player.js';
import VerticalEnemy from './VerticalEnemy.js';
import HorizontalEnemy from './HorizontalEnemy.js';
import SeekerEnemy from './SeekerEnemy.js';
import Floor from './Floor.js';

export default class GameObjects {
    constructor(objects, field, player, game) {
        player.X = 9;
        player.Y = 0;

        this.externalObjects = objects;
        this.objects = [player];

        for(let i = 0; i < objects.length; i++) {
            let gameObject;

            switch(objects[i].name) {
                case 'horizontal-enemy':
                    gameObject = new HorizontalEnemy(objects[i].x, objects[i].y);
                    break;
                case 'vertical-enemy':
                    gameObject = new VerticalEnemy(objects[i].x, objects[i].y);
                    break;
                case 'seeker-enemy':
                    gameObject = new SeekerEnemy(objects[i].x, objects[i].y);
                    break;
            }

            this.objects.push(gameObject);
        }
        

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
            objectElement.className = 'game-object game-object-'+ object.type + ' ' + object.name;
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
                    switch (event.keyCode) {
                        case 37:
                            event.preventDefault();
                            if(movements.left === true) game.action(object.X, object.Y - 1);
                            break;
                        case 38:
                            event.preventDefault();
                            if(movements.up === true) game.action(object.X - 1, object.Y);
                            break;
                        case 39:
                            event.preventDefault();
                            if(movements.right === true) game.action(object.X, object.Y + 1);
                            break;
                        case 40:
                            event.preventDefault();
                            if(movements.down === true) game.action(object.X + 1, object.Y);
                            break;
                        case 32:
                            event.preventDefault();
                            game.action(object.X, object.Y);
                            break;
                    }
                };
            }
        }
        
    }
}