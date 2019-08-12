import Enemy from './Enemy.js';   
import Floor from './Floor.js';
import Player from './Player.js';

export default class HorizontalEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = 'horizontal-enemy';
        this.direction = 'left';
    }

    action(game) {
        let field = game.board.field;
        if(this.direction === 'left' && field[this.X][this.Y - 1] !== undefined && field[this.X][this.Y - 1] instanceof Floor) {
            if(field[this.X][this.Y - 1].object instanceof Player) {
                game.log('Enemy hits player');
                game.hitPlayer();
            } else if(field[this.X][this.Y - 1].object instanceof Enemy) {
                this.direction = 'right';
            } else {
                field[this.X][this.Y].object = undefined;
                this.Y--;
                field[this.X][this.Y].object = this;
            }
        } else {
            this.direction = 'right';
        }
        if(this.direction === 'right' && field[this.X][this.Y + 1] !== undefined && field[this.X][this.Y + 1] instanceof Floor) {
            if(field[this.X][this.Y + 1].object instanceof Player) {
                game.log('Enemy hits player');
                game.hitPlayer();
            } else if(field[this.X][this.Y + 1].object instanceof Enemy) {
                this.direction = 'left';
            } else {
                field[this.X][this.Y].object = undefined;
                this.Y++;
                field[this.X][this.Y].object = this;
            }
        } else {
            this.direction = 'left';
        }
    }
}