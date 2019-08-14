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
		var nextPoint = PathFinder.getNextPoint(game, [this.X, this.Y], [game.player.X, game.player.Y]);
		/* <TODO: Ruslan Tumasov: Replace it to Vector2dDistance> */
		if (nextPoint !== undefined) {
			this.X = nextPoint[0];
			this.Y = nextPoint[1];
		} else {
			let isPlayerFound = false;
			if (field[this.X - 1] !== undefined && field[this.X - 1][this.Y].object instanceof Player) {
				isPlayerFound = true;
			}
			
			if (!isPlayerFound && field[this.X + 1] !== undefined && field[this.X + 1][this.Y].object instanceof Player) {
				isPlayerFound = true;
			}
			
			if (!isPlayerFound && field[this.X][this.Y - 1] !== undefined && field[this.X][this.Y - 1].object instanceof Player) {
				isPlayerFound = true;
			}

			if (!isPlayerFound && field[this.X][this.Y + 1] !== undefined && field[this.X][this.Y + 1].object instanceof Player) {
				isPlayerFound = true;
			}
			
			if (isPlayerFound) {
				game.log('Enemy hits player');
				game.hitPlayer();
			}
		}
		/* </TODO: Ruslan Tumasov: Replace it to Vector2dDistance> */
    }
}