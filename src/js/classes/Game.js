import Player from './Player.js';
import GameObjects from './GameObjects.js';
import Floor from './Floor.js';
import Instruments from './Instruments.js';
import Board from './Board.js';
import Enemy from './Enemy.js'; 

export default class Game {
    constructor(gameDiv, logsDiv, statisticDiv) {
        this.levelName;
        this.turns;
        this.enemiesKilled;
        this.player;
        this.board;
        this.gameDiv = gameDiv;
        this.objects;
        this.instruments;
        this.logsElement = logsDiv;
        this.statisticElement = statisticDiv;
        // this.drawStatistic();
        this.logs;
    }

    init(gameData) {
        this.drop();
        this.levelName = gameData.levelName;
        this.turns = 0;
        this.enemiesKilled = 0;
        this.player = new Player();
        this.board = new Board(this.gameDiv, gameData.field);
        this.objects = new GameObjects(gameData.objects, this.board.field, this.player, this);
        this.instruments = new Instruments();
        // this.logsElement = logsDiv;
        // this.statisticElement = statisticDiv;
        this.drawStatistic();
        this.logs = [];
    }

    drop() {
        this.levelName = undefined;
        this.turns = undefined;
        this.enemiesKilled = undefined;
        this.player = undefined;
        this.board = undefined;
        // this.gameDiv = gameDiv;
        this.objects = undefined;
        this.instruments = undefined;
        // this.logsElement = logsDiv;
        // this.statisticElement = statisticDiv;
        // this.drawStatistic();
        this.logs = undefined;
    }

    action(x, y) {
        this.turns++;
        if(this.board.field[x][y] instanceof Floor && this.board.field[x][y].object === undefined) {
            this.log('Move to ' + x + ', ' + y);
            this.board.field[this.player.X][this.player.Y].object = undefined; 
            //this.board.field[this.player.X][this.player.Y].isBlocked = false;
            this.player.X = x;
            this.player.Y = y;
            this.board.field[this.player.X][this.player.Y].object = this.player;
            
        } else if(this.board.field[x][y].object !== undefined && !(this.board.field[x][y].object instanceof Player)) {
            let interaction = this.board.field[x][y].object.interact(this);
            this.log(interaction.log);
            if(interaction.result === 'kill') {
                // console.log(this.board.field[x][y].object.interact(this).result);
                for(let i in this.objects.objects) {
                    if(this.objects.objects[i].X === x && this.objects.objects[i].Y === y) {
                        this.objects.objects.splice(i, 1);
                    }
                }
                this.enemiesKilled++;
                this.board.field[x][y].object = undefined;
                this.board.field[x][y].isBlocked = false;
                // console.log(this.board.field[x][y]);
            };
        }

        this.board.field[this.player.X][this.player.Y].onStep(this, this.player);
        
        this.board.draw();
        this.objects.draw();
        this.drawStatistic();

        for(let enemy of this.objects.objects) {
            if(enemy instanceof Enemy) {
                enemy.action(this);
                this.board.draw();
                this.objects.draw();
            }
        }

        this.board.draw();
        this.objects.draw();
        this.drawStatistic();

        this.checkEnd();
    }

    drawStatistic() {
        this.statisticElement.innerHTML = '';
        let playerHP = document.createElement('span');
        playerHP.innerHTML = 'Player HP: ' + this.player.hitPoints + ' | Turns: ' + this.turns + ' | Enemies killed: ' + this.enemiesKilled;
        this.statisticElement.appendChild(playerHP);
    }

    hitPlayer() {
        this.player.hitPoints--;
        this.log('Player\'s HP: ' + this.player.hitPoints);
    }

    log(string) {
        this.logs.push(this.instruments.getTime() + ' : ' + string);
        this.drawLogs();
    }

    drawLogs() {
        this.logsElement.innerHTML = '';
        for(let i = this.logs.length - 1; i >= 0; i--) {
            let line = document.createElement('p');
            line.innerHTML = this.logs[i];
            this.logsElement.appendChild(line);
        }
    }

    checkEnd() {
        if(this.player.hitPoints <= 0) {
            alert('Player died. Game over.');
            location.reload();
        }
    }
}