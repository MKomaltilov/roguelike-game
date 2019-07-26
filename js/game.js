class Location {
    
    constructor(x, y) {
        this.name;
        this.type;
        
        this.X = x;
        this.Y = y;

        this.interaction;
        this.isBlocked = false;

        this.object;
        
    }

    onStep() {

    }
}

class Enemy {
    constructor(x, y) {
        this.hitPoints = 1;
        this.X = x;
        this.Y = y;
        this.name;
        this.type = 'enemy';
    }

    action(game) {

    }
}

class VerticalEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = 'vertical-enemy';
        this.direction = 'down';
    }

    action(game) {
        let field = game.board.field;
        if(this.direction === 'down' && field[this.X - 1] !== undefined && field[this.X - 1][this.Y] !== undefined && field[this.X - 1][this.Y] instanceof Floor) {
            if(field[this.X - 1][this.Y].object instanceof Player) {
                game.hitPlayer();
            } else if(field[this.X - 1][this.Y].object instanceof Enemy) {
                this.direction = 'up';
            } else {
                field[this.X][this.Y].object = undefined;
                this.X--;
            }
        } else {
            this.direction = 'up';
        }
        if(this.direction === 'up' && field[this.X + 1] !== undefined && field[this.X + 1][this.Y] !== undefined && field[this.X + 1][this.Y] instanceof Floor) {
            if(field[this.X + 1][this.Y].object instanceof Player) {
                game.hitPlayer();
            } else if(field[this.X + 1][this.Y].object instanceof Enemy) {
                this.direction = 'down';
            } else {
                field[this.X][this.Y].object = undefined;
                this.X++;
            }
        } else {
            this.direction = 'down';
        }
    }
}

class HorizontalEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = 'horizontal-enemy';
        this.direction = 'left';
    }

    action(game) {
        let field = game.board.field;
        if(this.direction === 'left' && field[this.X][this.Y - 1] !== undefined && field[this.X][this.Y - 1] instanceof Floor) {
            if(field[this.X][this.Y - 1].object instanceof Player) {
                game.hitPlayer();
            } else if(field[this.X][this.Y - 1].object instanceof Enemy) {
                this.direction = 'right';
            } else {
                field[this.X][this.Y].object = undefined;
                this.Y--;
            }
        } else {
            this.direction = 'right';
        }
        if(this.direction === 'right' && field[this.X][this.Y + 1] !== undefined && field[this.X][this.Y + 1] instanceof Floor) {
            if(field[this.X][this.Y + 1].object instanceof Player) {
                game.hitPlayer();
            } else if(field[this.X][this.Y + 1].object instanceof Enemy) {
                this.direction = 'left';
            } else {
                field[this.X][this.Y].object = undefined;
                this.Y++;
            }
        } else {
            this.direction = 'left';
        }
    }
}

class Wall extends Location {
    constructor(x, y) {
        super(x, y);
        this.name = 'wall';
        this.isBlocked = true;
        this.interaction = 'none';
    }
}

class Floor extends Location {
    constructor(x, y) {
        super(x, y);
        this.name = 'floor'
        this.isBlocked = false;
        this.interaction = 'move';
    }
}

class Finish extends Floor {
    constructor(x, y) {
        super(x, y);
        this.name = 'finish';
    }

    onStep(game) {
        alert('Player won!');
        location.reload();
    }
}

class Teleport extends Floor {
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
        if(newLocation.object === undefined) {
            let x = game.player.X;
            let y = game.player.Y;
            game.player.X = newLocation.X;
            game.player.Y = newLocation.Y;
            newLocation.object = game.player;
            game.board.field[x][y].object = undefined;
            game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y);
        } else {
            game.log('Teleport to: ' + newLocation.X + ', ' + newLocation.Y + ' is NOT POSSIBLE because ' + newLocation.object.name + ' on it.');
        }
        
    }
}


class Player {
    constructor(x, y) {
        this.hitPoints = 3;
        this.X = x;
        this.Y = y;
        this.type = 'player';
    }

}

class Board {
    

    constructor(size, div) {
        this.size = size;
        this._fieldElement = div;
        
        this.field = [
            ['T', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
            ['1', '1', '0', '1', '0', '1', '1', '0', '1', '1'],
            ['1', '1', '0', '1', '0', '0', '0', '0', '0', 'T'],
            ['F', '0', '0', '0', '0', '1', '0', '1', '1', '1'],
            ['1', '0', '0', '1', '1', '1', '0', '0', '0', '1'],
            ['1', '1', '0', '1', '0', '0', '0', '0', '0', '1'],
            ['1', '1', '0', '1', '0', '0', '0', '0', '1', '1'],
            ['1', '1', '0', '1', '0', '0', '1', '0', '0', '1'],
            ['1', '0', '1', '1', '0', '1', '1', '0', '1', '1'],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'T']
        ];

        for(let x in this.field) {
            for(let y in this.field[x]) {
                switch(this.field[x][y]) {
                    case '0':
                        this.field[x][y] = new Floor(x, y);
                        break;
                    case 'F': 
                        this.field[x][y] = new Finish(x, y);
                        break;
                    case 'T': 
                        this.field[x][y] = new Teleport(x, y);
                        break;
                    default:
                        this.field[x][y] = new Wall(x, y);
                        break;
                }
            }
        }

        this.draw();

    }

    export() {
        return JSON.stringify({size: this.size, field: JSON.stringify(this.field)});
    }

    draw() {
        this._fieldElement.innerHTML = '';
        let fieldElement = document.createElement('div');
        fieldElement.className = 'game-field';

        for(let row of this.field) {
            let rowElement = document.createElement('div');
            rowElement.className = 'game-row';
            for(let cell of row) {
                cell.object = undefined;
                let cellElement = document.createElement('div');
                cellElement.className = 'game-cell game-cell-' + cell.name;
                cellElement.id = 'game-cell-' + cell.X + '-' + cell.Y;
                cellElement.innerHTML = '<div class="game-object"></div>';        
                rowElement.appendChild(cellElement);
            }
            fieldElement.appendChild(rowElement);
        }

        this._fieldElement.appendChild(fieldElement);
    }

}

class GameObjects {
    constructor(field, player, game) {
        player.X = 9;
        player.Y = 0;
        this.objects = [
            player,
            new VerticalEnemy(5, 7),
            new VerticalEnemy(6, 6),
            new VerticalEnemy(3, 2),
            new VerticalEnemy(1, 4),
            new VerticalEnemy(1, 2),
            new HorizontalEnemy(2, 5),
            new HorizontalEnemy(5, 4),
            new HorizontalEnemy(3, 1),
            new HorizontalEnemy(0, 3),
            new HorizontalEnemy(6, 4)
        ];
        this.field = field;
        this.game = game;
        this.player = player;
        this.drawObjects(this.objects, field, game);
    }

    draw() {
        this.drawObjects(this.objects, this.field, this.game);
    }

    drawObjects(objects, field, game) {
        for(let object of objects) {
            field[object.X][object.Y].object = object;
            let objectElement = document.createElement('div');
            objectElement.className = 'game-object game-object-'+ object.type;
            let element = document.getElementById('game-cell-' + object.X + '-' + object.Y);
            element.innerHTML = '';
            element.appendChild(objectElement);
            
            if(object instanceof Player) {
                let element = document.getElementById('game-cell-' + (object.X) + '-' + object.Y);
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X, object.Y);
                    }
                
                if(field[object.X - 1] !== undefined && field[object.X - 1][object.Y] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + (object.X - 1) + '-' + object.Y);
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X - 1, object.Y);
                    }
                }
                if(field[object.X - 0 + 1] !== undefined && field[object.X - 0 + 1][object.Y] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + (object.X - 0 + 1) + '-' + object.Y);
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X - 0 + 1, object.Y);
                    }
                }
                if(field[object.X][object.Y - 0 + 1] !== undefined && field[object.X][object.Y - 0 + 1] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + object.X + '-' + (object.Y - 0 + 1));
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X, object.Y - 0 + 1);
                    }
                }
                if(field[object.X][object.Y - 1] !== undefined && field[object.X][object.Y - 1] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + object.X + '-' + (object.Y - 1));
                    element.className += ' game-cell-point';
                    element.onclick = function() {
                        game.action(object.X, object.Y - 1);
                    }
                }
            }
        }
        
    }
}


class Game {
    constructor(size, gameDiv, logsDiv) {
        this.player = new Player();
        this.board = new Board(size, gameDiv);
        this.objects = new GameObjects(this.board.field, this.player, this);
        this.instruments = new Instruments();
        this.logsElement = logsDiv;
        this.logs = [];
    }

    action(x, y) {
        if(this.board.field[x][y] instanceof Floor && this.board.field[x][y].object === undefined) {
            this.log('Move to ' + x + ', ' + y);
            this.board.field[this.player.X][this.player.Y].object = undefined; 
            this.player.X = x;
            this.player.Y = y;
            this.board.field[this.player.X][this.player.Y].object = this.player;
            
        } else if(this.board.field[x][y] instanceof Floor && this.board.field[x][y].object instanceof Enemy) {
            this.log('Fight started!');
            this.board.field[x][y].object.hitPoints--;
            if(this.board.field[x][y].object.hitPoints === 0) {
                for(let i in this.objects.objects) {
                    if(this.objects.objects[i].X === x && this.objects.objects[i].Y === y) {
                        this.objects.objects.splice(i, 1);
                    }
                }
                this.board.field[x][y].object = undefined;
            }
        }

        for(let enemy of this.objects.objects) {
            if(enemy instanceof Enemy) {
                enemy.action(this);
            }
        }

        this.board.field[this.player.X][this.player.Y].onStep(this);

        this.board.draw();
        this.objects.draw();


    }

    hitPlayer() {
        this.player.hitPoints--;
        this.log('Enemy attacks player! Player\'s HP: ' + this.player.hitPoints);
        if(this.player.hitPoints <= 0) {
            alert('game over');
            location.reload();
        }
    }

    log(string) {
        this.logs.push(string);
        this.drawLogs();
    }

    drawLogs() {
        this.logsElement.innerHTML = '';
        for(let log of this.logs) {
            let line = document.createElement('p');
            line.innerHTML = log;
            this.logsElement.appendChild(line);
        }
    }
}

class Instruments {
    constructor() {

    }

    shuffleArray(arr){
        var j, temp;
        for(var i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
}

let game = new Game(10, document.getElementById('game'), document.getElementById('game-logs'));

console.log(game);