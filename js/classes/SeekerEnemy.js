import Enemy from './Enemy.js';
import Floor from './Floor.js';
import Player from './Player.js';
import PathFinder from './PathFinder.js';

export default class VerticalEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = 'seeker-enemy';
    }

    action(game) {
        let field = game.board.field;
/*        if(this.direction === 'down' && field[this.X - 1] !== undefined && field[this.X - 1][this.Y] !== undefined && field[this.X - 1][this.Y] instanceof Floor) {
            if(field[this.X - 1][this.Y].object instanceof Player) {
                game.log('Enemy hits player');
                game.hitPlayer();
            } else if(field[this.X - 1][this.Y].object instanceof Enemy) {
                this.direction = 'up';
            } else {
                field[this.X][this.Y].object = undefined;
                this.X--;
                field[this.X][this.Y].object = this;
            }
        } else {
            this.direction = 'up';
        }
        if(this.direction === 'up' && field[this.X + 1] !== undefined && field[this.X + 1][this.Y] !== undefined && field[this.X + 1][this.Y] instanceof Floor) {
            if(field[this.X + 1][this.Y].object instanceof Player) {
                game.log('Enemy hits player');
                game.hitPlayer();
            } else if(field[this.X + 1][this.Y].object instanceof Enemy) {
                this.direction = 'down';
            } else {
                field[this.X][this.Y].object = undefined;
                this.X++;
                field[this.X][this.Y].object = this;
            }
        } else {
            this.direction = 'down';
        }
*/
		var nextPoint = PathFinder.getNextPoint(game, [this.X, this.Y], [game.player.X, game.player.Y]);
		if (nextPoint !== undefined) {
			this.X = nextPoint[0];
			this.Y = nextPoint[1];
		}
    }
}