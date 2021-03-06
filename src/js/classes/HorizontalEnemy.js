import Enemy from './Enemy.js';   
import Floor from './Floor.js';
import Player from './Player.js';

export default class HorizontalEnemy extends Enemy {
    constructor(x, y, name = 'Horizontal', hitPoints = 1) {
        super(x, y, name, hitPoints);
        this.subtype = 'horizontal-enemy';
        this.direction = 'left';
    }

    action(game) {
        let field = game.board.field;
        if(this.direction === 'left' && field[this.X][this.Y - 1] !== undefined && field[this.X][this.Y - 1].isBlocked !== true) {
            if(field[this.X][this.Y - 1].object instanceof Player) {
                game.log(this.name + ' hits player');
                game.hitPlayer();
            } else if(field[this.X][this.Y - 1].object instanceof Enemy) {
                this.direction = 'right';
            } else {
                field[this.X][this.Y].object = undefined;
                field[this.X][this.Y].isBlocked = false;
                this.Y--;
                field[this.X][this.Y].object = this;
                field[this.X][this.Y].isBlocked = true;
            }
        } else {
            this.direction = 'right';
        }
        if(this.direction === 'right' && field[this.X][this.Y + 1] !== undefined && field[this.X][this.Y + 1].isBlocked !== true) {
            if(field[this.X][this.Y + 1].object instanceof Player) {
                game.log(this.name + ' hits player');
                game.hitPlayer();
            } else if(field[this.X][this.Y + 1].object instanceof Enemy) {
                this.direction = 'left';
            } else {
                field[this.X][this.Y].object = undefined;
                field[this.X][this.Y].isBlocked = false;
                this.Y++;
                field[this.X][this.Y].object = this;
                field[this.X][this.Y].isBlocked = true;
            }
        } else {
            this.direction = 'left';
        }
        game.board.field[this.X][this.Y].onStep(game, this);
    }
}