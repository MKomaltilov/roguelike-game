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

}