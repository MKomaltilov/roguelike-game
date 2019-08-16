import Floor from './Floor.js';

export default class PathFinder {
    static getNextPoint(game, startPoint, targetPoint) {
		if (startPoint === undefined || targetPoint === undefined) {
			return undefined;
		}
        let field = game.board.field;
        let nextStepPoint = [];
		
		let pathGrid = new Array(game.board.field.length);
		for (let i = 0; i < game.board.field.length; i++) {
			pathGrid[i] = new Array(game.board.field[i].length);
			for (let j = 0; j < game.board.field[i].length; j++) {
				pathGrid[i][j] = (game.board.field[i][j] instanceof Floor ? "+": "*");
			}
		}
		pathGrid[startPoint[0]][startPoint[1]] = "0";
		pathGrid[targetPoint[0]][targetPoint[1]] = "F";
		//console.log(pathGrid);
		
		console.log("[Matrix analyzer] Start...");
		let dt = 0;
		let queue = [];
		let found = false;
		let resultPoint = [];
		
		queue.push([startPoint[0], startPoint[1], dt]);
		while (queue.length > 0 && !found) {
			let point = queue.shift();
			
			let dxR = pathGrid[point[0]] === undefined ? undefined : (pathGrid[point[0]][point[1] + 1] === undefined ? undefined : pathGrid[point[0]][point[1] + 1]);
			let dxL = pathGrid[point[0]] === undefined ? undefined : (pathGrid[point[0]][point[1] - 1] === undefined ? undefined : pathGrid[point[0]][point[1] - 1]);
			let dyU = pathGrid[point[0] - 1] === undefined ? undefined : (pathGrid[point[0] - 1][point[1]] === undefined ? undefined : pathGrid[point[0] - 1][point[1]]);
			let dyD = pathGrid[point[0] + 1] === undefined ? undefined : (pathGrid[point[0] + 1][point[1]] === undefined ? undefined : pathGrid[point[0] + 1][point[1]]);
			
			if (dxR === "+" || dxR === "F") {
				if (dxR === "F") {
					pathGrid[point[0]][point[1] + 1] = point[2] + 1;
					resultPoint = [point[0], point[1] + 1];
					found = true;
				} else {
					pathGrid[point[0]][point[1] + 1] = point[2] + 1;
					queue.push([ point[0], (point[1] + 1), (point[2] + 1) ]);
				}
			}
			
			if (dxL === "+" || dxL === "F") {
				if (dxL === "F") {
					pathGrid[point[0]][point[1] - 1] = point[2] + 1;
					resultPoint = [point[0], point[1] - 1];
					found = true;
				} else {
					pathGrid[point[0]][point[1] - 1] = point[2] + 1;
					queue.push([ point[0], (point[1] - 1), (point[2] + 1) ]);
				}
			}
			
			if (dyU === "+" || dyU === "F") {
				if (dyU === "F") {
					pathGrid[point[0] - 1][point[1]] = point[2] + 1;
					resultPoint = [point[0] - 1, point[1]];
					found = true;
				} else {
					pathGrid[point[0] - 1][point[1]] = point[2] + 1;
					queue.push([ (point[0] - 1), point[1], (point[2] + 1) ]);
				}
			}
			
			if (dyD === "+" || dyD === "F") {
				if (dyD === "F") {
					pathGrid[point[0] + 1][point[1]] = point[2] + 1;
					resultPoint = [point[0] + 1, point[1]];
					found = true;
				} else {
					pathGrid[point[0] + 1][point[1]] = point[2] + 1;
					queue.push([ (point[0] + 1), point[1], (point[2] + 1) ]);
				}
			}
			
			// console.log("\n");
			// printArray(pathGrid); // For debug a matrix
		}
		
		if (found) {
			console.log("[Matrix analyzer] Done! ", resultPoint);
			console.log("[PathBuilder] Start...");
			
			let i = pathGrid[resultPoint[0]][resultPoint[1]];
			let iterPoint = [ resultPoint[0], resultPoint[1] ];
			while (i > 1) {
				let dxr = pathGrid[iterPoint[0]] === undefined ? undefined : pathGrid[iterPoint[0]][iterPoint[1] + 1] === undefined ? undefined : pathGrid[iterPoint[0]][iterPoint[1] + 1];
				let dxl = pathGrid[iterPoint[0]] === undefined ? undefined : pathGrid[iterPoint[0]][iterPoint[1] - 1] === undefined ? undefined : pathGrid[iterPoint[0]][iterPoint[1] - 1];
				let dyu = pathGrid[iterPoint[0] - 1] === undefined ? undefined : pathGrid[iterPoint[0] - 1][iterPoint[1]] === undefined ? undefined : pathGrid[iterPoint[0] - 1][iterPoint[1]];
				let dyd = pathGrid[iterPoint[0] + 1] === undefined ? undefined : pathGrid[iterPoint[0] + 1][iterPoint[1]] === undefined ? undefined : pathGrid[iterPoint[0] + 1][iterPoint[1]];
				
				if (dxr === (i - 1)) {
					iterPoint = [iterPoint[0], iterPoint[1] + 1];
				} else if (dxl === (i - 1)) {
					iterPoint = [iterPoint[0], iterPoint[1] - 1];
				} else if (dyu === (i - 1)) {
					iterPoint = [iterPoint[0] - 1, iterPoint[1]];
				} else if (dyd === (i - 1)) {
					iterPoint = [iterPoint[0] + 1, iterPoint[1]];
				}
				// console.log("Path generation = ", iterPoint, ", pathGrid = ", pathGrid[iterPoint[0]][iterPoint[1]], " i = ", i);
				if (--i === 1) {
					console.log("[PathBuilder] Done [", [iterPoint[0], iterPoint[1]], "]");
					if (!game.board.field[iterPoint[0]][iterPoint[1]].isBlocked) {
						return [iterPoint[0], iterPoint[1]];
					}
					console.log("[PathBuilder] But [", [iterPoint[0], iterPoint[1]], "] is blocked!");
					return undefined;
				}
			}
			console.warn("[PathBuilder] Done without result!");
		} else {
			console.log("[Matrix analyzer] Done without result!");
			return undefined;
		}
		
		function printArray(array) {
			for (let i = 0; i < array.length; i++) {
				console.log(array[i].join('\t'));
			}
		}
    }
}