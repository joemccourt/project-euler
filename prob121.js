// Joe McCourt
// Jan 30th, 2014
// Project Euler problem 121
// Disc game prize fund

// A bag contains one red disc and one blue disc.
// In a game of chance a player takes a disc at random and its colour is noted.
// After each turn the disc is returned to the bag, an extra red disc is added,
// and another disc is taken at random.

// The player pays £1 to play and wins if they have taken more blue discs
// than red discs at the end of the game.

// If the game is played for four turns,
// the probability of a player winning is exactly 11/120,
// and so the maximum prize fund the banker should allocate
// for winning in this game would be £10 before they would expect to incur a loss.
// Note that any payout will be a whole number of pounds and also includes
// the original £1 paid to play the game, so in the example given the player actually wins £9.

// Find the maximum prize fund that should be allocated to a single game
// in which fifteen turns are played.

var states = {
	'state1': {
		'probability': 1,
		'bluePicked': 0,
		'blue': 1,
		'red': 1
	}
};

var newTurn = function(states) {
	var newStates = {};
	var newStateID = 0;
	for(var stateID in states) {
		var state = states[stateID];
		var prob = state.probability;

		var probPickRed = state.red / (state.red + state.blue);

		//Pick red
		var newProb = prob * probPickRed;

		if(newProb > 0) {
	
			//Random add red
			var newState = {
				probability: newProb,
				bluePicked: state.bluePicked,
				blue: state.blue,
				red: state.red+1
			};

			newStates['state'+newStateID] = newState;
			newStateID++;

			// //Random add blue
			// var newState = {
			// 	probability: newProb * 0.5,
			// 	bluePicked: state.bluePicked,
			// 	blue: state.blue+1,
			// 	red: state.red
			// };

			// newStates['state'+newStateID] = newState;
			// newStateID++;
		}

		//Pick blue
		newProb = prob * (1 - probPickRed);

		//Random add red
		if(newProb > 0) {
			var newState = {
				probability: newProb,
				bluePicked: state.bluePicked+1,
				blue: state.blue,
				red: state.red+1
			};

			newStates['state'+newStateID] = newState;
			newStateID++;

			// //Random add blue
			// var newState = {
			// 	probability: newProb * 0.5,
			// 	bluePicked: state.bluePicked+1,
			// 	blue: state.blue,
			// 	red: state.red+1
			// };

			// newStates['state'+newStateID] = newState;
			// newStateID++;
		}
	}

	//Reduce states step
	for(var key1 in newStates) {
		var state1 = newStates[key1];
		for(var key2 in newStates) {
			var state2 = newStates[key2];
			if(state2.reduced || state1 == state2) {continue;}

			var match = state1.bluePicked == state2.bluePicked;

			if(match) {
				state1.probability += state2.probability;
				state2.probability = 0;
				state2.reduced = true;
			}
		}
	}


	for(var key in newStates) {
		var state = newStates[key];

		if(state.probability == 0) {
			delete newStates[key];
		}
	}

	return newStates;
};

var turns = 15;
for(var i = 0; i < turns; i++) {
	states = newTurn(states);
}

console.log(states);

// Sum prob of states where bluePicked > blue+red-2
var winProb = 0;
var total = 0;
for(var id in states) {
	var state = states[id];
	total += state.probability;
	if(state.bluePicked > turns/2) {
		winProb += state.probability;
	}
}

console.log(winProb,total);
var payment = 1/winProb | 0;
console.log(payment)

// var probNBlue = [0,0,0,0,0];
// var expectedBlue = 0;
// for(var n = 0; n < 4; n++) {
// 	var probBlue = 1 / (2+n);

// 	probNBlue[0] = 1 - (1-probBlue)*(1-probNBlue[0]);
// 	for(var i = 1; i < n; i++) {
// 		probNBlue[i] = probNBlue[i-1]*(1 - (1-probBlue)*(1-probNBlue[i]));
// 	}
	

// }

// console.log(probNBlue);


