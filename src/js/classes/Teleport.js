import Floor from './Floor.js';

export default class Teleport extends Floor {
    constructor(x, y) {
        super(x, y);
        this.name = 'teleport';
    }

    onStep(game) {
        let teleports = [];
        for(let x in game.board.field) {
            for(let y in game.board.field[x]) {
                let object = game.board.field[x][y];
                if(object instanceof Teleport) {
                    teleports.push(object);
                }
            }
        }
        
        let newLocation = game.instruments.shuffleArray(teleports)[0];
        if(newLocation.isBlocked !== true) {
            let x = game.player.X;
            let y = game.player.Y;
            game.player.X = newLocation.X;
            game.player.Y = newLocation.Y;
            newLocation.object = game.player;
            newLocation.isBlocked = true;
            game.board.field[x][y].object = undefined;
            game.board.field[x][y].isBlocked = false;
            game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y);
        } else {
            if(newLocation.object.type === 'player') {
                game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y + ' is NOT POSSIBLE because you\'re here.');
            } else {
                game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y + ' is NOT POSSIBLE because ' + newLocation.object.name + ' on it.');
            }
            
        }
        
    }
}
