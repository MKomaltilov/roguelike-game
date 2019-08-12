import Location from './Location.js';

export default class Wall extends Location {
    constructor(x, y) {
        super(x, y);
        this.name = 'wall';
        this.isBlocked = true;
        this.interaction = 'none';
    }
}