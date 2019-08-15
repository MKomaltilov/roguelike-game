import Floor from './Floor.js';

export default class Finish extends Floor {
    constructor(x, y) {
        super(x, y);
        this.name = 'finish';
    }

    onStep(game) {
        alert('Player won in ' + game.turns + ' turns and ' + game.enemiesKilled + ' kills!');
        location.reload();
    }
}