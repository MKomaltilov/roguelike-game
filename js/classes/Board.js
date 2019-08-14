import Floor from './Floor.js';
import Wall from './Wall.js';
import Finish from './Finish.js';
import HealFountain from './HealFountain.js';
import Teleport from './Teleport.js';
import Trap from './Trap.js';

export default class Board {
    

    constructor(div, field = null) {
        this._fieldElement = div;
        this.field = field;

        for(let x in this.field) {
            for(let y in this.field[x]) {
                switch(this.field[x][y].charAt(0)) {
                    case '0':
                        this.field[x][y] = new Floor(x, y);
                        break;
                    case 'F': 
                        this.field[x][y] = new Finish(x, y);
                        break;
                    case 'T': 
                        this.field[x][y] = new Teleport(x, y);
                        break;
                    case 'X': 
                        this.field[x][y] = new Trap(x, y);
                        break;
                    case 'H': 
                        this.field[x][y] = new HealFountain(x, y);
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