import Floor from './Floor.js';

export default class Trap extends Floor {
    constructor(x, y) {
        super(x, y);
        this.name = 'trap';
    }

    onStep(game) {
        game.log('Player steps on trap');
        game.hitPlayer();
        game.board.field[this.X][this.Y] = new Floor(this.X, this.Y);
    }
}