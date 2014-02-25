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

	stateQueue.push({s:state.slice(0),p:path});

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
			continue;
		} else {
			// console.log(stateHash)
			visited[stateHash] = state.p.length;
		}

		// && visited[stateHash] < state.p.length
		// if(visited[stateHash] < state.p.length) {

		// }

		if(goalDiff == 0) {
			console.log("Hit goal!");
			console.log(state.p.length,state.p);
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
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY)+moveX-1];
			newState[4*(moveY)+moveX-1] = 2;
			stateQueue.push({s:newState,p:state.p+"R"});
		}
		if(moveY != 0) {
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY-1)+moveX];
			newState[4*(moveY-1)+moveX] = 2;
			stateQueue.push({s:newState,p:state.p+"D"});
		}
		if(moveY != 3) {
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY+1)+moveX];
			newState[4*(moveY+1)+moveX] = 2;
			stateQueue.push({s:newState,p:state.p+"U"});
		}
		if(moveX != 3) {
			newState = state.s.slice(0);
			newState[4*(moveY)+moveX] = state.s[4*(moveY)+moveX+1];
			newState[4*(moveY)+moveX+1] = 2;
			stateQueue.push({s:newState,p:state.p+"L"});
		}
	}
};


search(start,"");

console.log(numPaths)




