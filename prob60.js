// Joe McCourt
// Jan 12th, 2014
// Project Euler problem 60
// Prime pair sets

// The primes 3, 7, 109, and 673, are quite remarkable.
// By taking any two primes and concatenating them in any order
// the result will always be prime.

// For example, taking 7 and 109, both 7109 and 1097 are prime.
// The sum of these four primes, 792, represents the lowest sum
// for a set of four primes with this property.

// Find the lowest sum for a set of five primes
// for which any two primes concatenate to produce another prime.

function isPrime(number){
	if(number <= 1){return false;}
	if(number == 2){return true;}
	if(!(number%2)){return false;}
	var maxCheck = Math.floor(Math.sqrt(number));
	for(var i = 3; i <= maxCheck; i+=2){
		if(!(number%i)){return false;}
	}
	return true;
}

var primes = [];

for(var i = 0; i < 200000; i++) {
	if(isPrime(i)) {
		primes.push(i);
	}
}

var maxPrimeI = 10000;
var lowestSum = 30000;

var searchSet = function(set,index) {
	var numSet = set.length;
	var validSet = true;

	//for(var j = 0; j < numSet; j++) {
		var j = index;
		for(var i = 0; i < index; i++) {
			if(i != j) {
				var concat1 = parseInt(primes[set[j]].toString() + primes[set[i]].toString(),10);
				var concat2 = parseInt(primes[set[i]].toString() + primes[set[j]].toString(),10);

				if(!isPrime(concat1) || !isPrime(concat2)) {
				// if(primePairsSet[set[i]][set[j]] || primePairsSet[set[j]][set[i]]) {
					validSet = false;
					break;
				}
			}
		}
	//}
	// console.log(set,index,validSet);

	var sum = 0;
	for(var i = 0; i < numSet; i++) {
		sum += primes[set[i]];
	}

	if(validSet && index == set.length-1 && sum < lowestSum) {
		lowestSum = sum;
		console.log("Found sum: ", sum);
		for(var i = 0; i < numSet; i++) {
			console.log(primes[set[i]]);
		}
	}

	if(sum < lowestSum) {
		if(validSet) {
			var passSet = set.slice(0);
			if(index < numSet-1) {
				searchSet(passSet,index+1);
			}

			for(var i = index; i < numSet; i++) {
				if(set[i] < maxPrimeI && i == 0) {
					var passSet = set.slice(0);
					passSet[i]++;

					searchSet(passSet,i);
				}
			}
		} else {
			if(set[index] < maxPrimeI) {
				var passSet = set.slice(0);
				passSet[index]++;

				searchSet(passSet,index);
			}
		}
	}
}

// *** Now let's try making a faster version :) *** //
var primePairs = [];
var primePairsSet = [];
var primeTris = [];
var primeQuads = [];

// Precalc pairs that fit concat property
var memoPairs = function() {
	for(var i = 0; i < maxPrimeI; i++) {
		primePairs[i] = [];
		primePairsSet[i] = {};
		for(var j = i; j < maxPrimeI; j++) {
			var concat1 = parseInt(primes[j].toString() + primes[i].toString(),10);
			var concat2 = parseInt(primes[i].toString() + primes[j].toString(),10);

			if(isPrime(concat1) && isPrime(concat2)) {
				// console.log(concat1,concat2)
				primePairs[i].push(j);
				primePairsSet[i][j] = true;
				//primePairs[primes[i]+'-'+primes[j]] = true;
			}
		}
	}
}

var memoTris = function() {
	for(var i = 0; i < primePairs.length; i++) {
		var pairs = primePairs[i]; // i, [..]
		primeTris[i] = [];
		for(var j = 0; j < pairs.length; j++) {
			//i, pairs[j], pairsJ[k]
			var pairsJ = primePairs[pairs[j]];
			for(var k = 0; k < pairsJ.length; k++) {
				if(primePairsSet[i][pairsJ[k]]) {
					// console.log(i,pairs[j],pairsJ[k]);
					//console.log(primes[i],primes[pairs[j]],primes[pairsJ[k]]);
					primeTris[i].push([pairs[j],pairsJ[k]]);
				}
			}
		}
	}
};

var memoQuads = function() {
	for(var i = 0; i < primeTris.length; i++) {
		var tris = primeTris[i];
		primeQuads[i] = [];
		for(var j = 0; j < tris.length; j++) {
			//i, tris[j][0], tris[j][1], pairsJ1[k]
			var pairsJ1 = primePairs[tris[j][1]];
			for(var k = 0; k < pairsJ1.length; k++) {
				if(primePairsSet[i][pairsJ1[k]] && primePairsSet[tris[j][0]][pairsJ1[k]]) {
					//console.log(primes[i],primes[tris[j][0]],primes[tris[j][1]],primes[pairsJ1[k]]);
					primeQuads[i].push([tris[j][0],tris[j][1],pairsJ1[k]]);
				}
			}
		}
	}
};

var searchQuints = function() {
	for(var i = 0; i < primeQuads.length; i++) {
		var quads = primeQuads[i];
		primeQuads[i] = [];
		for(var j = 0; j < quads.length; j++) {
			//i, quads[j][0], quads[j][1], quads[j][2], pairsJ2[k]
			var pairsJ2 = primePairs[quads[j][2]];
			for(var k = 0; k < pairsJ2.length; k++) {
				if(primePairsSet[i][pairsJ2[k]] && primePairsSet[quads[j][0]][pairsJ2[k]] && primePairsSet[quads[j][1]][pairsJ2[k]]) {
					console.log(primes[i],primes[quads[j][0]],primes[quads[j][1]],primes[pairsJ2[k]]);
				}
			}
		}
	}
};

memoPairs();
// memoTris();
// memoQuads();
// searchQuints();
// memoN(3);


// for(var i = 0; i < primePairs.length; i++) {
// 	if(primePairs[i].length) {
// 		for(var j = 0; j < primePairs[i].length; j++) {
// 			console.log(primes[i],primes[primePairs[i][j]]);
// 		}
// 	}
// }

// console.log(primePairs[1][])
// console.log(primePairs);
// console.log(primeTris);
// console.log(primeQuads);

var set = [0,1,2,3];
searchSet(set,0);
