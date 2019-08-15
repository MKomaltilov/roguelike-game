export default class GameObject {
    constructor(x, y) {
        this._X = x;
        this._Y = y;
    }

    
    get X() {
        return Number(this._X);
    }

    set X(value) {
        this._X = value;
    }

    get Y() {
        return Number(this._Y);
    }

    set Y(value) {
        this._Y = value;
    }
}