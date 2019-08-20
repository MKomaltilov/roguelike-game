import '../scss/main.scss';
import Game from './classes/Game.js';

let level_1 = {
    field: [
        ['T1', '0', '0', '0', '0', '0', '0', '0', 'H', '1'],
        ['1', '1', '0', '1', '0', '1', '1', '0', '1', '1'],
        ['1', '1', '0', '1', '0', '0', '0', '0', '0', 'T0'],
        ['F', '0', '0', '0', 'X', '1', '0', '1', '1', '1'],
        ['1', '0', '0', '1', '1', '1', '0', '0', '0', '1'],
        ['1', '1', '0', '1', 'T0', '0', 'X', '0', '0', '1'],
        ['1', '1', '0', '1', '0', '0', '0', '0', '1', '1'],
        ['1', '1', '0', '1', '0', '0', '1', 'X', '0', '1'],
        ['1', '0', '1', '1', '0', '1', '1', '0', '1', '1'],
        ['0', '0', '0', '0', '0', 'X', '0', '0', '0', 'T1']
    ],
    objects: [
        {
            name: 'player',
            x: 9,
            y: 0
        },
        {
            name: 'seeker-enemy',
            x: 2,
            y: 5
        },
        {
            name: 'horizontal-enemy',
            x: 5,
            y: 4
        },
        {
            name: 'horizontal-enemy',
            x: 3,
            y: 1
        },
        {
            name: 'horizontal-enemy',
            x: 0,
            y: 3
        },
        {
            name: 'horizontal-enemy',
            x: 6,
            y: 4
        },
        {
            name: 'vertical-enemy',
            x: 5,
            y: 7
        },
        {
            name: 'vertical-enemy',
            x: 6,
            y: 6
        },
        {
            name: 'vertical-enemy',
            x: 3,
            y: 2
        },
        {
            name: 'vertical-enemy',
            x: 1,
            y: 4
        },
        {
            name: 'vertical-enemy',
            x: 1,
            y: 2
        }
    ]
}

let level_2 = {
    field: [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'F'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    ],
    objects: [
        {
            name: 'player',
            x: 9,
            y: 0
        },
        {
            name: 'horizontal-enemy',
            x: 3,
            y: 5
        },
        {
            name: 'horizontal-enemy',
            x: 5,
            y: 4
        }
    ]
}


let game = new Game(level_1, document.getElementById('game-field'), document.getElementById('game-logs'), document.getElementById('game-statistic'));

console.log(game);