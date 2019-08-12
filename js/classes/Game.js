import Player from './Player.js';
import GameObjects from './GameObjects.js';
import Floor from './Floor.js';
import Instruments from './Instruments.js';
import Board from './Board.js';
import Enemy from './Enemy.js'; 

export default class Game {
    constructor(size, gameDiv, logsDiv, statisticDiv) {
        this.player = new Player();
        this.board = new Board(size, gameDiv);
        this.objects = new GameObjects(this.board.field, this.player, this);
        this.instruments = new Instruments();
        this.logsElement = logsDiv;
        this.statisticElement = statisticDiv;
        this.drawStatistic();
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
            if(this.instruments.getRandomInRange(1, 6) >= this.player.hitChance) {
                this.log('Player hits enemy');
                this.board.field[x][y].object.hitPoints--;
            } else {
                this.log('Player misses');
            }
            
            if(this.board.field[x][y].object.hitPoints <= 0) {
                this.log('Enemy died');
                for(let i in this.objects.objects) {
                    if(this.objects.objects[i].X === x && this.objects.objects[i].Y === y) {
                        this.objects.objects.splice(i, 1);
                    }
                }
                this.board.field[x][y].object = undefined;
            } else {

            }
        }

        this.board.field[this.player.X][this.player.Y].onStep(this);
        
        this.board.draw();
        this.objects.draw();
        this.drawStatistic();

        for(let enemy of this.objects.objects) {
            if(enemy instanceof Enemy) {
                enemy.action(this);
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
        playerHP.innerHTML = 'Player HP: ' + this.player.hitPoints;
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
            alert('game over');
            location.reload();
        }
    }
}