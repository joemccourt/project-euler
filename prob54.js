// Joe McCourt
// 2/1/4

// In the card game poker, a hand consists of five cards and are ranked,
// from lowest to highest, in the following way:

//     High Card: Highest value card.
//     One Pair: Two cards of the same value.
//     Two Pairs: Two different pairs.
//     Three of a Kind: Three cards of the same value.
//     Straight: All cards are consecutive values.
//     Flush: All cards of the same suit.
//     Full House: Three of a kind and a pair.
//     Four of a Kind: Four cards of the same value.
//     Straight Flush: All cards are consecutive values of same suit.
//     Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.

// The cards are valued in the order:
// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

// If two players have the same ranked hands then the rank made up of the highest value wins;
// for example, a pair of eights beats a pair of fives (see example 1 below).
// But if two ranks tie, for example, both players have a pair of queens,
// then highest cards in each hand are compared (see example 4 below);
// if the highest cards tie then the next highest cards are compared, and so on.

// 5H 5C 6S 7S KD 2C 3S 8S 8D TD
// 5D 8C 9S JS AC 2C 5C 7D 8S QH
// 2D 9C AS AH AC 3D 6D 7D TD QD
// 4D 6S 9H QH QC 3D 6D 7H QD QS
// 2H 2D 4C 4D 4S 3C 3D 3S 9S 9D

// The file, poker.txt, contains one-thousand random hands dealt to two players.
// Each line of the file contains ten cards (separated by a single space):
// the first five are Player 1's cards and the last five are Player 2's cards.
// You can assume that all hands are valid (no invalid characters or repeated cards),
// each player's hand is in no specific order, and in each hand there is a clear winner.
// How many hands does Player 1 win?

var fs = require('fs');

var textToArray = function(str){
	var arrayOut = [];

	arrayTmp = str.split("\n");

	var inputLength = arrayTmp.length;
	var i;
	for(i = 0; i < inputLength; i++){
		arrayOut[i] = arrayTmp[i];
	}

	return arrayOut;
};

var FILEIN  = 'poker.txt';
fs.readFile(FILEIN, 'utf8', function (err,data) {
  if (err) {
  	console.log(err);
  }

  solveProblem(textToArray(data));
});


var allSameSuit = function(hand) {
	return hand[0][1] == hand[1][1] && hand[0][1] == hand[2][1] && 
	       hand[0][1] == hand[3][1] && hand[0][1] == hand[4][1];
};

var cardIntValue = function(card) {
	var c = card[0];
	if(c == '2') {return 0;}
	if(c == '3') {return 1;}
	if(c == '4') {return 2;}
	if(c == '5') {return 3;}
	if(c == '6') {return 4;}
	if(c == '7') {return 5;}
	if(c == '8') {return 6;}
	if(c == '9') {return 7;}
	if(c == 'T') {return 8;}
	if(c == 'J') {return 9;}
	if(c == 'Q') {return 10;}
	if(c == 'K') {return 11;}
	if(c == 'A') {return 12;}
};

var highestValue = function(hand) {
	return Math.max(hand[0],hand[1],hand[2],hand[3],hand[4]);
};

var handConsecutive = function(hand) {
	var set = {};
	set[hand[0]] = 1;
	set[hand[1]] = 1;
	set[hand[2]] = 1;
	set[hand[3]] = 1;
	set[hand[4]] = 1;

	var start = Math.min(hand[0],hand[1],hand[2],hand[3],hand[4]);
	return set[start+1] && set[start+2] && set[start+3] && set[start+4];
};

var handSets = function(hand) {
	var set = {};
	set[hand[0]] = set[hand[0]] == undefined ? 1 : set[hand[0]]+1;
	set[hand[1]] = set[hand[1]] == undefined ? 1 : set[hand[1]]+1;
	set[hand[2]] = set[hand[2]] == undefined ? 1 : set[hand[2]]+1;
	set[hand[3]] = set[hand[3]] == undefined ? 1 : set[hand[3]]+1;
	set[hand[4]] = set[hand[4]] == undefined ? 1 : set[hand[4]]+1;

	var nextSet = 0;
	var maxSet = 0;
	var nextSetK = 0;
	var maxSetK = 0;
	for(var k in set) {
		if(set[k] > maxSet) {
			nextSet = maxSet;
			nextSetK = maxSetK;
			maxSet = set[k];
			maxSetK = k;
		} else if(set[k] > nextSet) {
			nextSet = set[k];
			nextSetK = k;
		}
	}
	return [maxSet,nextSet,parseInt(maxSetK,10),parseInt(nextSetK,10)];
}

var rank = function(hand) {
	var handValues = [cardIntValue(hand[0]),cardIntValue(hand[1]),cardIntValue(hand[2]),cardIntValue(hand[3]),cardIntValue(hand[4])];
	var sameSuit = allSameSuit(hand);
	var numSets = handSets(handValues);
	var consec = handConsecutive(handValues);
	var highest = highestValue(handValues);

	if(consec && sameSuit && highest == 12) {
		return [9,12];
	} else if(consec && sameSuit) {
		return [8,highest];
	} else if(numSets[0] == 4) {
		return [7,numSets[2]];
	} else if(numSets[0] == 3 && numSets[1] == 2) {
		return [6,numSets[2]];
	} else if(sameSuit) {
		return [5,highest];
	} else if(consec) {
		return [4,highest];
	} else if(numSets[0] == 3) {
		return [3,numSets[2]];
	} else if(numSets[0] == 2 && numSets[1] == 2) {
		return [2,Math.max(numSets[2],numSets[3])];
	} else if(numSets[0] == 2) {
		return [1,numSets[2]];
	} else {
		return [0,highest];
	}
};

var solveProblem = function(data) {

	var wins = 0;
// data.length
	for(var i = 0; i < 1000; i++) {
		var cards = data[i].split(' ');
		if(cards.length != 10) {continue;}
		var hand1 = [cards[0],cards[1],cards[2],cards[3],cards[4]];
		var hand2 = [cards[0+5],cards[1+5],cards[2+5],cards[3+5],cards[4+5]];

		// console.log(hand1,hand2);
		var r1 = rank(hand1);
		var r2 = rank(hand2);
		var won = false;
		if(r1[0] > r2[0] || (r1[0] == r2[0] && r1[1] > r2[1])) {
			won = true;
		} else if(r1[0] == r2[0] && r1[1] == r2[1]) {

			var h1v = [cardIntValue(hand1[0]),cardIntValue(hand1[1]),cardIntValue(hand1[2]),cardIntValue(hand1[3]),cardIntValue(hand1[4])];
			var h2v = [cardIntValue(hand2[0]),cardIntValue(hand2[1]),cardIntValue(hand2[2]),cardIntValue(hand2[3]),cardIntValue(hand2[4])];
			
			h1v = h1v.sort(function(a, b) {return b - a; });
			h2v = h2v.sort(function(a, b) {return b - a; });
			console.log(h1v,h2v);
			if(h1v[0] > h2v[0]) {
				won = true;
			}
		}

		if(won) {
			wins++;	
		}
		// console.log(hand1,hand2,won,r1,r2);
	}

	console.log(wins);
}