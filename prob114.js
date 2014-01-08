// Joe McCourt
// Jan 7th, 2014
// Project Euler problem 114
// Counting block combinations I

// A row measuring seven units in length has red blocks
// with a minimum length of three units placed on it,
// such that any two red blocks (which are allowed to be different lengths)
// are separated by at least one black square. There are exactly seventeen ways of doing this.

// How many ways can a row measuring fifty units in length be filled?

var memo = {};
var numCombos = function(v,index) {
	var sum = 1;

	if(memo[v.length - index] && (index == 0 || v[index-1] == 0)){
		console.log("memo");
		return memo[v.length - index];
	}

	for(var i = index; i+2 < v.length; i++) {
		if(i == 0 || v[i-1] == 0) {
			if(memo[v.length - i]){
				// console.log("memo");
				sum += memo[v.length - i]-1;
				break;
			}else{
				for(var j = i+2; j < v.length; j++) {
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
for(var i = 0; i < 51; i++) {
	numCombos(genVector(i),0);
}

console.log(memo)