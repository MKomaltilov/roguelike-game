import GameObject from './GameObject.js';   

export default class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.hitPoints = 1;
        this.name;
        this.type = 'enemy';
        this.hitChance = 5;
    }

    action(game) {

    }

    interact(game) {
        let log = '';
        let result = 'none';
        if(game.instruments.getRandomInRange(1, 6) >=  game.player.hitChance) {
            log = 'Player hits ' + this.name;
            this.hitPoints--;
        } else {
            log = 'Player misses';
        }
        if(this.hitPoints <= 0) {
            log = this.name + ' died';
            result = 'kill';
        }

        return {
            'result': result,
            'log' : log
        }
    }
}