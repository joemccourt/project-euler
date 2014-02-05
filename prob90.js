// Joe McCourt
// Feb 4th, 2014
// Project Euler problem 90
// Cube digit pairs

// Each of the six faces on a cube has a different digit (0 to 9) written on it;\
// the same is done to a second cube. By placing the two cubes side-by-side
// in different positions we can form a variety of 2-digit numbers.

// For example, the square number 64 could be formed:
// In fact, by carefully choosing the digits on both cubes it is possible
// to display all of the square numbers below one-hundred:
// 01, 04, 09, 16, 25, 36, 49, 64, and 81.

// For example, one way this can be achieved is by placing {0, 5, 6, 7, 8, 9}
// on one cube and {1, 2, 3, 4, 8, 9} on the other cube.

// However, for this problem we shall allow the 6 or 9 to be turned upside-down
// so that an arrangement like {0, 5, 6, 7, 8, 9} and {1, 2, 3, 4, 6, 7}
// allows for all nine square numbers to be displayed;
// otherwise it would be impossible to obtain 09.

// In determining a distinct arrangement we are interested
// in the digits on each cube, not the order.

// {1, 2, 3, 4, 5, 6} is equivalent to {3, 6, 4, 1, 2, 5}
// {1, 2, 3, 4, 5, 6} is distinct from {1, 2, 3, 4, 5, 9}

// But because we are allowing 6 and 9 to be reversed,
// the two distinct sets in the last example both represent
// the extended set {1, 2, 3, 4, 5, 6, 9} for the purpose of forming 2-digit numbers.

// How many distinct arrangements of the two cubes allow for all
// of the square numbers to be displayed?


// There are two sets, the constraint is that must be able to 
// Let's call them set A and set B, to form a number, xy
// x must be in A and y in B or x in B and y in A

// Must form: 
// 01, 04, 09, 16, 25, 36, 49, 64, and 81
// the most repeated numbers are 0,4,6  Then 1,9,2,3,5,	8

// number to check for brute force = 10^12  (This is too big)
// But elements distinct and we only care about what's in the set, not order
// so it's (10 choose 6)^2 = 210 ^ 2 (which is deff small enough)
// 

var getSetVHash = function(setV) {
	return setV[0] + setV[1]*2 + setV[2]*4 + setV[3]*8 + setV[4]*16 + setV[5]*32 + setV[6]*64 + setV[7]*128 + setV[8]*256 + setV[9]*512;
};

var setHashes = {};
var setVs = [];

var genSets = function(setV,index) {
	var length = setV.length;
	if(index >= length) {return;}
	for(var i = index+1; i < length; i++) {
		if(!setV[i] && setV[index]) {
			var newSetV = setV.slice(0);
			newSetV[index] = 0;
			newSetV[i] = 1;

			var h = getSetVHash(newSetV);
			if(!setHashes[h]) {
				setHashes[h] = true;
				setVs.push(newSetV);
				genSets(newSetV,index+1);
			}
		} else if(setV[i] && !setV[index]) {
			var newSetV = setV.slice(0);
			newSetV[index] = 1;
			newSetV[i] = 0;
			var h = getSetVHash(newSetV);
			if(!setHashes[h]) {
				setHashes[h] = true;
				setVs.push(newSetV);
				genSets(newSetV,index+1);
			}
		}
	}

	genSets(setV,index+1);
};

setVs[0] = [1,1,1,1,1,1,0,0,0,0];
genSets(setVs[0],0);

// console.log(setVs);

// Augment 6/9 digits
for(var i = 0; i < setVs.length; i++) {
	var setV = setVs[i];
	if(setV[6] || setV[9]) {
		setV[6] = 1;
		setV[9] = 1;
	}
}

// Search for valid combinations
var numValid = 0;
var pairs = [[0,1],[0,4],[0,9],[1,6],[2,5],[3,6],[4,9],[6,4],[8,1]];
for(var i = 0; i < setVs.length; i++) {
	var setVI = setVs[i];
	for(var j = i; j < setVs.length; j++) {
		var setVJ = setVs[j];
		valid = true;
		for(var k = 0; k < pairs.length; k++) {
			var pair = pairs[k];
			if(setVI[pair[0]] && setVJ[pair[1]] || setVI[pair[1]] && setVJ[pair[0]]) {
				// valid
			} else {
				valid = false;
				break;
			}
		}

		if(valid) {numValid++}
	}
}

console.log(setVs.length*setVs.length,numValid);


