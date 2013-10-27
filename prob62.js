// Joe McCourt
// 10/27/13

// Project Euler Problem 62

// Cubic permutations
// The cube, 41063625 (345^3), can be permuted to produce two other cubes:
// 56623104 (384^3) and 66430125 (405^3). In fact, 41063625 is the smallest cube
// which has exactly three permutations of its digits which are also cube.
// Find the smallest cube for which exactly five permutations of its digits are cube.

// Find permutations such that p = n*n*n
// Search cubes instead of permutations, then find which are permutations
var cubes = [];

for(var n = 0; n < 10000; n++){

	cubes[n] = n*n*n;

}

// Hash that is digit position idependent
// Hope that large relative primes will decrease chance of collisions
var cubeHashes = {};
var relativePrimes = [2,3,5,7,11,13,17,19,23,27,29];
for(var n = 0; n < cubes.length; n++){
	var cubesStr = cubes[n].toString();
	var hash = 1;

	for(var i = 0; i < cubesStr.length; i++){
		hash *= relativePrimes[cubesStr[i]];
	}
	if(typeof cubeHashes[hash] !== 'object'){
		cubeHashes[hash] = {'cubes':[]};
	}
	cubeHashes[hash]['cubes'].push(cubes[n]);
}

// Find largest num of cubes per hash
// Perhaps not strictly correct because
// we're looking for smallest in series
var max = 0;
var maxI = 0;
var goal = 5;
for(var k in cubeHashes){
	if(cubeHashes.hasOwnProperty(k)){
		if(cubeHashes[k].cubes.length > max){
			max = cubeHashes[k].cubes.length;
			maxI = k;
			if(max == goal){break;}
		}
	}
}
console.log(maxI,cubeHashes[maxI]);