// Joe McCourt
// 3/19/2014
// Project Euler problem 106	
// Special subset sums: meta-testing

// Let S(A) represent the sum of elements in set A of size n.
// We shall call it a special sum set if for any two non-empty
// disjoint subsets, B and C, the following properties are true:

//     S(B) ≠ S(C); that is, sums of subsets cannot be equal.
//     If B contains more elements than C then S(B) > S(C).

// For this problem we shall assume that a given set contains
// n strictly increasing elements and it already satisfies the second rule.

// Surprisingly, out of the 25 possible subset pairs
// that can be obtained from a set for which n = 4,
// only 1 of these pairs need to be tested for equality (first rule).
// Similarly, when n = 7, only 70 out of the 966 subset pairs need to be tested.

// For n = 12, how many of the 261625 subset pairs
// that can be obtained need to be tested for equality?

// for n = 4, say we have {a,b,c,d} where a < b < c < d
// Don't have to compare any of the 6 set pairs of single elements
// Because of strictly increasing, we also know that:

// a+b != a+c (a == a && b < c)
// a+b != a+d (a == a && b < d)
// a+b != b+c (b == b && b < c)
// a+b != b+d (b == b && b < d)
// a+b != c+d (a < c && b < d)

// a+c != a+d (a == a && c < d)
// a+c != b+d (a < b && c < d)
// a+c != c+d (c == c && c < d)
// a+c != b+c (c == c && a < b)

// b+c != c+d (c == c && b < d)
// b+c != b+d (b == b && c < d)
// b+c ?? a+d

// c+d != a+d (d == d && c < d)

// a+b+c != b+c+d
// a+b+d != b+c+d
// a+c+d != b+c+d

// a+b+c != a+b+d
// a+b+c != a+c+d

// a+c+d != a+b+d

var tested = {};

var testedEquality = function(setA, setB) {
	if(setA.length == 0) {return true;}
	for(var i = 0; i < setA.length; i++) {
		for(var j = 0; j < setB.length; j++) {
			if(setA[i] == setB[j]) {
				var subsetA = setA.slice(0,i).concat(setA.slice(i+1));
				var subsetB = setB.slice(0,j).concat(setB.slice(j+1));
				return testedEquality(subsetA,subsetB);
			}
		}
	}

	var hash = setA.toString() + ":" + setB.toString();
	if(tested[hash]) {return true;}
	return false;
}


var reduceSubsets = function(setA, setB, comp) {
	// console.log(setA,setB);

	if(setA.length == 0) {return true;}
	if(comp == 0 && testedEquality(setA,setB)){
		return true;
	}

	var reduced = false;
	var stop = false;
	for(var i = 0; !stop && i < setA.length; i++) {
		for(var j = 0; !stop && j < setB.length; j++) {

			if(setA[i] == setB[j]) {
				var subsetA = setA.slice(0,i).concat(setA.slice(i+1));
				var subsetB = setB.slice(0,j).concat(setB.slice(j+1));
				reduced = reduceSubsets(subsetA,subsetB,comp);
				stop = true;
			} else if(comp <= 0 && setA[i] < setB[j]) {
				comp = -1;
				var subsetA = setA.slice(0,i).concat(setA.slice(i+1));
				var subsetB = setB.slice(0,j).concat(setB.slice(j+1));
				reduced = reduceSubsets(subsetA,subsetB,comp);
				stop = true;
			} else if(comp >= 0 && setA[i] > setB[j]) {
				comp = 1;
				var subsetA = setA.slice(0,i).concat(setA.slice(i+1));
				var subsetB = setB.slice(0,j).concat(setB.slice(j+1));
				reduced = reduceSubsets(subsetA,subsetB,comp);
				stop = true;
			}
		}
	}

	if(!reduced) {
		var hash = setA.toString() + ":" + setB.toString();
		tested[hash] = true;
		return false;
	} else {
		return true;
	}
};


var getSubsets = function(n) {
	var subsets = [];
	var limit = Math.pow(2,n);
	for(var i = 1; i < limit; i++) {
		// console.log(maxNum)
		var set = [];
		for(var j = 0; j < n; j++) {
			if(i & (1 << j)) {
				set.push(j);
			}
		}
		subsets[i-1] = set;
	}

	return subsets;
};

var subsets = getSubsets(12);
// console.log(subsets);
var count = 0;
for(var i = 0; i < subsets.length; i++) {
	for(var j = i+1; j < subsets.length; j++) {
		var setI = subsets[i];
		var setJ = subsets[j];
		if(setI.length == setJ.length) {
			// console.log(setI,setJ);
			if(!reduceSubsets(setI,setJ,0)) {
				// console.log(setI,setJ);
				count++;
			}
		}
	}
}

console.log(count);
// console.log(tested);

// console.log(reduceSubsets([1,1,5],[1,2,3],0));
// console.log(reduceSubsets([1,3,7,8,9],[2,3,4,1,5]));

