import Location from './Location.js';

export default class Floor extends Location {
    constructor(x, y) {
        super(x, y);
        this.name = 'floor'
        this.isBlocked = false;
        this.interaction = 'move';
    }
}