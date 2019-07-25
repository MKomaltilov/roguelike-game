class Location {
    
    constructor(x, y) {
        this.name;
        this.type;
        
        //coords
        this.X = x;
        this.Y = y;

        this.interaction;
        this.isBlocked = false;
        
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

    move() {

    }
}

class VerticalEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = 'vertical-enemy';
    }
}

class HorizontalEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = 'horizontal-enemy';
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

class Player {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
        this.type = 'player';
    }

}

class Board {
    

    constructor(size, div) {
        this.size = size;
        //this.field = [];
        this._fieldElement = div;
        //this.import();
        
        this.field = [
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        ];

        for(let x in this.field) {
            for(let y in this.field[x]) {
                if(this.field[x][y] === 0) {
                    this.field[x][y] = new Floor(x, y);
                } else {
                    this.field[x][y] = new Wall(x, y);
                }
            }
        }

        //random build
        // for(let x = 0; x < size; x++) {
        //     let row = [];

        //     for (let y = 0; y < size; y++) {
        //         let cell;
        //         (Math.floor(Math.random() * Math.floor(2) > 1)) ? cell = new Wall(x, y) : cell = new Floor(x, y);
        //         row.push(cell);
        //     }

        //     this.field.push(row);
        // }
        this.draw();

    }

    import() {
        this.field = this.loadField();
        //this.table = 
    }

    export() {
        return JSON.stringify({size: this.size, field: JSON.stringify(this.table)});
    }

    draw() {
        this._fieldElement.innerHTML = '';
        let fieldElement = document.createElement('div');
        fieldElement.className = 'game-field';

        for(let row of this.field) {
            let rowElement = document.createElement('div');
            rowElement.className = 'game-row';
            for(let cell of row) {
                let cellElement = document.createElement('div');
                cellElement.className = 'game-cell game-cell-' + cell.name;
                cellElement.id = 'game-cell-' + cell.X + '-' + cell.Y;
                cellElement.innerHTML = '<div class="game-object"></div>';        
                rowElement.appendChild(cellElement);
                //console.log(cell);
            }
            fieldElement.appendChild(rowElement);
        }

        this._fieldElement.appendChild(fieldElement);
    }

    loadField() {
        var xmlhttp = new XMLHttpRequest();
        let response;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
               if (xmlhttp.status == 200) {
                   response =  xmlhttp.responseText;
                   //console.log(response);
               }
               else if (xmlhttp.status == 400) {
                  alert('There was an error 400');
               }
               else {
                   alert('something else other than 200 was returned');
               }
            }
        };
    
        xmlhttp.open("GET", "/field", false);
        xmlhttp.send();
        return JSON.parse(response);
    }
}

class GameObjects {
    constructor(field, player, game) {
        player.X = 9;
        player.Y = 1
        this.objects = [
            player,
            new VerticalEnemy(5, 7),
            new HorizontalEnemy(2, 5)
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
            let objectElement = document.createElement('div');
            objectElement.className = 'game-object game-object-'+ object.type;
            let element = document.getElementById('game-cell-' + object.X + '-' + object.Y);
            element.innerHTML = '';
            element.appendChild(objectElement);
            
            if(object instanceof Player && field !== null) {
                if(field[object.X - 1] !== undefined && field[object.X - 1][object.Y] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + (object.X - 1) + '-' + object.Y);
                    element.className += ' game-cell-move';
                    element.onclick = function() {
                        game.move(object.X - 1, object.Y);
                    }
                }
                if(field[object.X + 1] !== undefined && field[object.X + 1][object.Y] instanceof Floor) {
                    let element = document.getElementById('game-cell-' + (object.X + 1) + '-' + object.Y);
                    element.className += ' game-cell-move';
                    element.onclick = function() {
                        game.move(object.X + 1, object.Y);
                    }
                }
                if(field[object.X][object.Y + 1] !== undefined && field[object.X][object.Y + 1] instanceof Floor) {
                    let element = document.getElementById('game-cell-' +object.X + '-' + (object.Y + 1));
                    element.className += ' game-cell-move';
                    element.onclick = function() {
                        game.move(object.X, object.Y + 1);
                    }
                }
                if(field[object.X][object.Y - 1] !== undefined && field[object.X][object.Y - 1] instanceof Floor) {
                    let element = document.getElementById('game-cell-' +object.X + '-' + (object.Y - 1));
                    element.className += ' game-cell-move';
                    element.onclick = function() {
                        game.move(object.X, object.Y - 1);
                    }
                }
            }
        }
        
    }
}


class Game {
    constructor(size, div) {
        this.player = new Player();
        this.board = new Board(size, div);
        this.objects = new GameObjects(this.board.field, this.player, this);
    }

    move(x, y) {
        this.player.X = x;
        this.player.Y = y;
        this.board.draw();
        this.objects.draw();
    }
}

let game = new Game(10, document.getElementById('game'));

console.log(game);