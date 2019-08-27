import Floor from './Floor.js';
import Player from './Player.js';

export default class HealFountain extends Floor {
    constructor(x, y) {
        super(x, y);
        this.name = 'heal-fountain';
    }

    onStep(game, object) {
        if(object instanceof Player) {
            if(game.player.hitPoints < 3) game.player.hitPoints++;
            game.log('Player healed for 1HP. Total HP: ' + game.player.hitPoints);
        }
    }
}