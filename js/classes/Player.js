import GameObject from './GameObject.js';

export default class Player extends GameObject  {
    constructor(x, y) {
        super(x, y);
        this.hitPoints = 3;

        this.type = 'player';
        this.hitChance = 3;
    }

}