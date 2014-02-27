// Sliders
// Problem 244

// You probably know the game Fifteen Puzzle.
// Here, instead of numbered tiles, we have seven red tiles and eight blue tiles.

// A move is denoted by the uppercase initial of the direction (Left, Right, Up, Down)
// in which the tile is slid, e.g. starting from configuration (S),
// by the sequence LULUR we reach the configuration (E):

// For each path, its checksum is calculated by (pseudocode):
// checksum = 0
// checksum = (checksum × 243 + m1) mod 100 000 007
// checksum = (checksum × 243 + m2) mod 100 000 007
//    …
// checksum = (checksum × 243 + mn) mod 100 000 007
// where mk is the ASCII value of the kth letter in the move sequence and the ASCII values for the moves are:
// L   76
// R   82
// U   85
// D   68

// For the sequence LULUR given above, the checksum would be 19761398.

// Now, starting from configuration (S),
// find all shortest ways to reach configuration (T).

// What is the sum of all checksums for the paths having the minimal length?


//Found a solution at 32 moves
//Upper limit of 4^32 paths ~ 2E19

// Example check sum addition ?
// Each checksum likely, but not guaranteed to be unique

var checksumPath = function(path) {
	var checksum = 0;
	while(path.length) {
		var m = 0;
		if(path[0] == "L") {
			m = 76
		} else if(path[0] == "R") {
			m = 82
		} else if(path[0] == "U") {
			m = 85
		} else if(path[0] == "D") {
			m = 68;
		}

		checksum = (checksum * 243 + m) % 100000007;
		path = path.substr(1);
	}
	return checksum;
};

var start = [
	2,0,1,1,
	0,0,1,1,
	0,0,1,1,
	0,0,1,1];

var goal = [
	2,1,0,1,
	1,0,1,0,
	0,1,0,1,
	1,0,1,0];

var visited = {};
var numPathsToState = {};
var stateQueue = [];
var numPaths = 0;

var search = function(state,path) {

	stateQueue.push({s:state.slice(0),p:path,paths:[path]});

	while(stateQueue.length > 0) {
		state = stateQueue.shift();

		var goalDiff = 0;
		var moveX = 0;
		var moveY = 0;
		var stateHash = "";
		for(var y = 0; y < 4; y++) {
			for(var x = 0; x < 4; x++) {
				var index = 4*y+x;
				if(state.s[index] == 2) {
					moveX = x;
					moveY = y;
				}

				stateHash += state.s[index];
				if(state.s[index] != goal[index]) {
					goalDiff++;
				}
			}
		}

		// if(!numPathsToState[stateHash]) {
		// 	numPathsToState[stateHash]
		// }
		//Tmp to speed up search
		//removes some paths
		if(visited[stateHash]) {
			if(visited[stateHash].pathLength == state.p.length) {
				var states = visited[stateHash].states;

				if(states.indexOf(state) < 0) {
					var lastState = states[states.length-1];
					states.push(state);

					//Replace in queue so only last one found is run
					stateQueue[stateQueue.indexOf(lastState)] = state;
					continue;
				} else {
					for(var i = 0; i < states.length; i++) {
						if(state != states[i]) {
							state.paths = state.paths.concat(states[i].paths);
						}
					}
					// if(state.p.length < 10) {
					// 	console.log(states.length,state.paths.length,state.paths);
					// }
				}
			} else {
				continue;
			}
		} else {
			// console.log(stateHash)
			visited[stateHash] = {pathLength:state.p.length,states:[state]};
			stateQueue.push(state);
			continue;
		}

		// && visited[stateHash] < state.p.length
		// if(visited[stateHash] < state.p.length) {

		// }

		if(goalDiff == 0) {
			console.log("Hit goal!");
			console.log(state.p.length,state.p);
			console.log(stateHash);
			console.log(state.paths);
			numPaths++;
			continue;
		}

		if(state.p.length >= 32) {
			continue;
		}

		// console.log(moveX,moveY,goalDiff)

		// Move up
		var newState;
		if(moveX != 0) {
			var newPathsR = [];
			for(var i = 0; i < state.paths.length; i++) {
				newPathsR[i] = state.paths[i] + "R";
			}
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY)+moveX-1];
			newState[4*(moveY)+moveX-1] = 2;
			stateQueue.push({s:newState,p:state.p+"R",paths:newPathsR});
		}
		if(moveY != 0) {
			var newPathsD = [];
			for(var i = 0; i < state.paths.length; i++) {
				newPathsD[i] = state.paths[i] + "D";
			}
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY-1)+moveX];
			newState[4*(moveY-1)+moveX] = 2;
			stateQueue.push({s:newState,p:state.p+"D",paths:newPathsD});
		}
		if(moveY != 3) {
			var newPathsU = [];
			for(var i = 0; i < state.paths.length; i++) {
				newPathsU[i] = state.paths[i] + "U";
			}
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY+1)+moveX];
			newState[4*(moveY+1)+moveX] = 2;
			stateQueue.push({s:newState,p:state.p+"U",paths:newPathsU});
		}
		if(moveX != 3) {
			var newPathsL = [];
			for(var i = 0; i < state.paths.length; i++) {
				newPathsL[i] = state.paths[i] + "L";
			}
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY)+moveX+1];
			newState[4*(moveY)+moveX+1] = 2;
			stateQueue.push({s:newState,p:state.p+"L",paths:newPathsL});
		}
	}
};


search(start,"");

var pathSolution = visited["2101101001011010"].states[0].paths[0];
console.log(checksumPath(pathSolution));
// // Find all path checksums here
// var solutionPaths = [pathSolution];
// var pathSolutionStart = pathSolution;
// var pathSolutionEnd = "";

// while(pathSolutionStart.length > 0) {
// 	pathSolutionStart = pathSolution.substr(0,pathSolutionStart.length-1);
// 	pathSolutionEnd = pathSolution.substr(pathSolutionStart.length);
	
// 	var moveRev = pathSolution[pathSolutionStart.length];
// 	// var moveX = 0;
// 	// var moveY = 0;
// 	// var stateHash = "";
// 	// for(var y = 0; y < 4; y++) {
// 	// 	for(var x = 0; x < 4; x++) {
// 	// 		var index = 4*y+x;
// 	// 		if(state.s[index] == 2) {
// 	// 			moveX = x;
// 	// 			moveY = y;
// 	// 		}

// 	// 		stateHash += state.s[index];
// 	// 	}
// 	// }

// 	console.log(pathSolutionStart,pathSolutionEnd);
// }
