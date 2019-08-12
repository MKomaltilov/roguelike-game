import GameObject from './GameObject.js';   

export default class Location extends GameObject {
    
    constructor(x, y) {
        super(x, y);

        this.name;
        this.type;


        this.interaction;
        this.isBlocked = false;

        this.object;
        
    }

    onStep() {

    }
}
