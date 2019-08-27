import Floor from './Floor.js';
import Player from './Player.js';

export default class Teleport extends Floor {
    constructor(x, y, id) {
        super(x, y);
        this.id = id;
        this.name = 'teleport';
    }

    onStep(game, object) {
        if(object === undefined) object = game.player;
        let teleports = [];
        for(let x in game.board.field) {
            for(let y in game.board.field[x]) {
                let object = game.board.field[x][y];
                if((object instanceof Teleport && object.id === this.id) && (object.X !== this.X && object.Y !== this.Y)) {
                    teleports.push(object);
                }
            }
        }
        
        let newLocation = game.instruments.shuffleArray(teleports)[0];
        if(newLocation.isBlocked !== true && newLocation.object === undefined) {
            let x = object.X;
            let y = object.Y;
            object.X = newLocation.X;
            object.Y = newLocation.Y;
            newLocation.object = object;
            if(game.board.field[x][y].isBlocked === true) game.board.field[x][y].isBlocked = false;
            game.board.field[x][y].object = undefined;
            game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y);
        } else {
            game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y + ' is NOT POSSIBLE because ' + newLocation.object.name + ' on it.');
        }
        
    }
}
