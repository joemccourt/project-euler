// Joe McCourt
// Jan 7th, 2014
// Project Euler problem 114 and 115
// Counting block combinations I

// A row measuring seven units in length has red blocks
// with a minimum length of three units placed on it,
// such that any two red blocks (which are allowed to be different lengths)
// are separated by at least one black square. There are exactly seventeen ways of doing this.

// How many ways can a row measuring fifty units in length be filled?

// *** Part II Prob 115 *** //
// A row measuring n units in length has red blocks with
// a minimum length of m units placed on it, such that any two red blocks
// (which are allowed to be different lengths) are separated by at least one black square.
// Let the fill-count function, F(m, n), represent
// the number of ways that a row can be filled.
// For example, F(3, 29) = 673135 and F(3, 30) = 1089155.
// That is, for m = 3, it can be seen that n = 30 is the smallest value
// for which the fill-count function first exceeds one million.
// In the same way, for m = 10, it can be verified that
// F(10, 56) = 880711 and F(10, 57) = 1148904,
// so n = 57 is the least value for which the fill-count function first exceeds one million.
// For m = 50, find the least value of n 
// for which the fill-count function first exceeds one million.

var memo = {};
var numCombos = function(v,index) {
	var sum = 1;

	if(memo[v.length - index] && (index == 0 || v[index-1] == 0)){
		console.log("memo");
		return memo[v.length - index];
	}

	for(var i = index; i+m-1 < v.length; i++) {
		if(i == 0 || v[i-1] == 0) {
			if(memo[v.length - i]){
				// console.log("memo");
				sum += memo[v.length - i]-1;
				break;
			}else{
				for(var j = i+m-1; j < v.length; j++) {
					var vPrime = v.slice(0);
					var k = i;
					while(k <= j) {
						vPrime[k] = 1;
						k++
					}
					sum += numCombos(vPrime,j);
				}
			}
		}
	}

	if(typeof memo[v.length-index] && (index == 0 || v[index-1] == 0)) {
		memo[v.length-index] = sum;
	}

	// console.log(v,v.length-index,sum)
	return sum;
};

var genVector = function(n) {
	var v = [];
	for(var i = 0; i < n; i++) {
		v[i] = 0;
	}
	return v;
}

//7: 17
//20: 8855
var m = 50;
var goal = 1000000;
var num = 0;
for(var i = 0; i < 1000 && num <= goal; i++) {
	var num = numCombos(genVector(i),0);
}

console.log(memo)