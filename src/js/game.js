import '../scss/main.scss';
import Game from './classes/Game.js';

let level_1 = {
    levelName: 'level_1',
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
            type: 'player',
            x: 9,
            y: 0
        },
        {
            type: 'seeker-enemy',
            name: 'Hell Knight',
            x: 2,
            y: 5
        },
        {
            type: 'horizontal-enemy',
            name: 'Orb',
            x: 5,
            y: 4
        },
        {
            type: 'horizontal-enemy',
            name: 'Orb',
            x: 3,
            y: 1
        },
        {
            type: 'horizontal-enemy',
            name: 'Orb',
            x: 0,
            y: 3
        },
        {
            type: 'horizontal-enemy',
            name: 'Orb',
            x: 6,
            y: 4
        },
        {
            type: 'vertical-enemy',
            name: 'Orb',
            x: 5,
            y: 7
        },
        {
            type: 'vertical-enemy',
            name: 'Orb',
            x: 6,
            y: 6
        },
        {
            type: 'vertical-enemy',
            name: 'Orb',
            x: 3,
            y: 2
        },
        {
            type: 'vertical-enemy',
            name: 'Orb',
            x: 1,
            y: 4
        },
        {
            type: 'vertical-enemy',
            name: 'Orb',
            x: 1,
            y: 2
        }
    ]
}

let level_2 = {
    levelName: 'level_2',
    field: [
        ['H', '0', '1', '0', '0', '0', '0', '0', '0', 'F'],
        ['T', '0', '1', '0', '0', '0', '0', '0', '0', '0'],
        ['1', '1', '1', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '1', '1', '1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '1', '0', '0', '0'],
        ['1', '0', '1', '0', '1', '0', '0', '0', '1', '1'],
        ['0', '0', '1', '1', '1', '0', '1', '1', '1', 'H'],
        ['0', '1', '1', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '1', '0', '1', 'T', '1', '0']
    ],
    objects: [
        {
            type: 'player',
            x: 9,
            y: 5
        },
        {
            type: 'horizontal-enemy',
            name: 'Orb',
            x: 3,
            y: 5
        },
        {
            type: 'horizontal-enemy',
            name: 'Orb',
            x: 5,
            y: 4
        },
        {
            type: 'seeker-enemy',
            name: 'Hell Knight',
            x: 9,
            y: 9
        },
        {
            type: 'seeker-enemy',
            name: 'Hell Knight',
            x: 0,
            y: 1
        }

    ]
}


let game = new Game(level_1, document.getElementById('game-field'), document.getElementById('game-logs'), document.getElementById('game-statistic'));

console.log(game);