import Floor from './Floor.js';
import Player from './Player.js';

export default class Finish extends Floor {
    constructor(x, y) {
        super(x, y);
        this.name = 'finish';
    }

    onStep(game, object) {
        if(object instanceof Player) {
            alert('Player won in ' + game.turns + ' turns and ' + game.enemiesKilled + ' kills!');
            location.reload();
        }
    }
}