// Joe McCourt
// Jan 18th, 2014
// Project Euler problem 151
// Paper sheets of standard sizes: an expected-value problem.

// A printing shop runs 16 batches (jobs) every week and each batch
// requires a sheet of special colour-proofing paper of size A5.
// Every Monday morning, the foreman opens a new envelope,
// containing a large sheet of the special paper with size A1.
// He proceeds to cut it in half, thus getting two sheets of size A2.
// Then he cuts one of them in half to get two sheets of size A3 and so on
// until he obtains the A5-size sheet needed for the first batch of the week.
// All the unused sheets are placed back in the envelope.
// At the beginning of each subsequent batch, he takes from the envelope
// one sheet of paper at random. If it is of size A5, he uses it.
// If it is larger, he repeats the 'cut-in-half' procedure until he has what
// he needs and any remaining sheets are always placed back in the envelope.
// Excluding the first and last batch of the week, find the expected number of times
// (during each week) that the foreman finds a single sheet of paper in the envelope.
// Give your answer rounded to six decimal places using the format x.xxxxxx .


// Idea represent probabilities of different states.

var states = {
	'batch1': {
		'state1': {
			'probability': 1,
			'papers': [1,0,0,0,0],
			'numPapers': 1
		}
	}
};

var splitPapers = function(papers,paperPicked) {
	while(paperPicked < papers.length-1) {
		papers[paperPicked]--;
		papers[paperPicked+1]++;
		papers[paperPicked+1]++;
		paperPicked++;
	}

	papers[paperPicked]--;
	return papers;
};

var runBatch = function(states,day) {
	var batch = states['batch'+day];
	var newBatch = 'batch'+(day+1);
	states[newBatch] = {};

	var newStateID = 1;
	for(var stateID in batch) {
		var state = batch[stateID];
		var prob = state.probability;

		if(day > 1 && state.numPapers == 1) {
			numSinglePaper += prob;
		}

		for(var i = 0; i < state.papers.length; i++) {
			var weight = state.papers[i] / state.numPapers;
			var newProb = prob * weight;
			if(newProb > 0) {
				var newPapers = splitPapers(state.papers.slice(0),i);

				var sum = 0;
				for(var j = 0; j < newPapers.length; j++) {
					sum+=newPapers[j];
				}

				var newState = {
					probability: newProb,
					papers: newPapers,
					numPapers: sum
				};

				states[newBatch]['state'+newStateID] = newState;
				newStateID++;
				// console.log(newState);
			}
		}	
	}

	//Reduce states step
	for(var state1Key in states[newBatch]) {
		var state1 = states[newBatch][state1Key];
		for(var state2Key in states[newBatch]) {
			var state2 = states[newBatch][state2Key];
			if(state2.reduced || state1 == state2) {continue;}

			var match = true;
			for(var k = 0; k < state1.papers.length; k++) {
				if(state1.papers[k] != state2.papers[k]) {
					match = false;
					break;
				}
			}

			if(match) {
				state1.probability += state2.probability;
				state2.probability = 0;
				state2.reduced = true;
			}
		}
	}
};

// Sanity check
var sumStateProb = function(states,day) {
	var batch = states['batch'+day];
	var sumProb = 0;
	for(var stateID in batch) {
		var state = batch[stateID];
		sumProb += state.probability;
	}
	return sumProb;
};

var numSinglePaper = 0;
for(var i = 1; i < 16; i++) {
	runBatch(states,i);
	// console.log(sumStateProb(states,i+1))
}

// console.log(states);
console.log(numSinglePaper);