import Enemy from './Enemy.js';
import Floor from './Floor.js';
import Player from './Player.js';

export default class VerticalEnemy extends Enemy {
    constructor(x, y, name = 'Vertical', hitPoints = 1) {
        super(x, y, name, hitPoints);
        this.subtype = 'vertical-enemy';
        this.direction = 'down';
    }

    action(game) {
        let field = game.board.field;
        if(this.direction === 'down' && field[this.X - 1] !== undefined && field[this.X - 1][this.Y] !== undefined && field[this.X - 1][this.Y].isBlocked !== true) {
            if(field[this.X - 1][this.Y].object instanceof Player) {
                game.log(this.name + ' hits player');
                game.hitPlayer();
            } else if(field[this.X - 1][this.Y].object instanceof Enemy) {
                this.direction = 'up';
            } else {
                field[this.X][this.Y].object = undefined;
                field[this.X][this.Y].isBlocked = false;
                this.X--;
                field[this.X][this.Y].object = this;
                field[this.X][this.Y].isBlocked = true;
            }
        } else {
            this.direction = 'up';
        }
        if(this.direction === 'up' && field[this.X + 1] !== undefined && field[this.X + 1][this.Y] !== undefined && field[this.X + 1][this.Y].isBlocked !== true) {
            if(field[this.X + 1][this.Y].object instanceof Player) {
                game.log(this.name + ' hits player');
                game.hitPlayer();
            } else if(field[this.X + 1][this.Y].object instanceof Enemy) {
                this.direction = 'down';
            } else {
                field[this.X][this.Y].object = undefined;
                field[this.X][this.Y].isBlocked = false;
                this.X++;
                field[this.X][this.Y].object = this;
                field[this.X][this.Y].isBlocked = true;
            }
        } else {
            this.direction = 'down';
        }
        game.board.field[this.X][this.Y].onStep(game, this);
    }
}