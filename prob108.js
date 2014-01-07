// Joe McCourt
// Jan 5th, 2014
// Project Euler problem 108
// Diophantine reciprocals I

// In the following equation x, y, and n are positive integers.
// 1/x	+ 1/y = 1/n
// For n = 4 there are exactly three distinct solutions:
// 1/5 + 1/20 = 1/4
// 1/6 + 1/12 = 1/4
// 1/8 + 1/8 = 1/4

// What is the least value of n for which the number of
// distinct solutions exceeds one-thousand?

// 1/x + 1/y = 1/n
// y + x = x*y/n  => (x*y)%n = 0
// n = x*y/(x+y) => (x*y)%(x+y) = 0
// y*n+x*n=x*y
// y*(n-x) = -x*n
// y = x*n/(x-n)

//Note these numbers all have many primefactors
//Search in order of prime factors instead of numerical value
var primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59];
var pVector = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var evalVector = function(v) {
	return Math.pow(2,v[0])*Math.pow(3,v[1])*Math.pow(5,v[2])*Math.pow(7,v[3])*Math.pow(11,v[4])*Math.pow(13,v[5])*Math.pow(17,v[6])*Math.pow(19,v[7])*Math.pow(23,v[8])*
	Math.pow(29,v[9])*Math.pow(31,v[10])*Math.pow(37,v[11])*Math.pow(41,v[12])*Math.pow(43,v[13])*Math.pow(47,v[14])*Math.pow(53,v[15])*Math.pow(59,v[16]);
};

// n, num solutions, factorization
// 2 2 [1]
// 4 3 [2]
// 6 5 [1,1]
// 12 8 [2,1]
// 24 11 [3,1]
// 30 14 [1,1,1]
// 60 23 [2,1,1]
// 120 32 [3,1,1]
// 180 38 [2,2,1]
// 210 41 [1,1,1,1]
// 360 53 [3,2,1]
// 420 68 [2,1,1,1]
// 840 95
// 1260 113
// 1680 122
// 2520 158
// 4620 203
// 7560 221
// 9240 284
// 13860 338
// 18480 365
// 27720 473
// 55440 608 [4,2,1,1,1]
// 83160 662 [3,3,1,1,1]
// 110880 743 [5,2,1,1,1]
// 120120 851 [3,1,1,1,1,1]
// 180180 1013 [2,2,1,1,1,1]

//Looking at this I see that next highest
//prime factor is never larger

//Gen numbers to search
var primesL = primes.length;
var maxPower = 20;
var maxValue = 200000000000000000;
var maxSolutions = 4000000;

var nArray = [];

var genArray = function(index,v) {
	var n = evalVector(v);
	if(n < maxValue) {
		nArray.push({value:n,vec:v});

		for(var i = index; i < primesL; i++) {
			if(v[i] < maxPower) {
				var vPass = v.slice(0);
				vPass[i]++;
				if(i == 0 || vPass[i-1] >= vPass[i]) {
					genArray(i,vPass);
				}
			}
		}
	}
};

genArray(0,pVector);
console.log(nArray.length)

// Sort array of numbers to check
nArray.sort(function(a, b) {
	return a.value - b.value;
});

//This function could be speed up
//Just not sure how yet hmmmm....

// 6 1 42 7:2^4*3
// 6 2 24 2^3:2^3*3
// 6 3 18 3^2:2*3^2
// 6 4 15 2*5:3*5
// 6 6 12 2^2*3:2^2*3

//19947543780003840000 4350308
//139885119141768000 4086183

// x-n can't be relatively prime to n

var numSolutions = function(n) {
	var solutions = 0;
	var lastX = 0;
	for(var x = n+1; x <= 2*n; x++) {
		// var y = x*n/(x-n);
		console.log(x,(x*n),(x-n));
		if((x*n)%(x-n)==0) {
			solutions++;
			console.log(x,x*n/(x-n));
			lastX = x;
		}
	}
	return solutions;
};

maxPower *= 2;
var numSolutionsV2 = function(n,index,v) {
	var sum = 1;
	if(evalVector(v) > evalVector(n)){return 0;}
	// console.log(evalVector(n),evalVector(v))
	for(var i = index; i < primesL; i++) {
		if(v[i] < maxPower) {
			var vPass = v.slice(0);
			vPass[i]++;
			if(vPass[i] <= 2*n[i]) {
				sum += numSolutionsV2(n,i,vPass);
			}
		}
	}
	return sum;
};

var numSolutionsV3 = function(n,index,v,nVal,vVal) {
	var sum = 1;
	// if(vVal > nVal){
	// // console.log(n,v)
	// return 0;}
	 for(var i = index; i < primesL; i++) {
		if(v[i] < maxPower) {
			var vPass = [v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9]];
			vPass[i]++;

			if(vVal*primes[i] > nVal) {
				break;
			}

			if(vPass[i] <= 2*n[i]) {
				sum += numSolutionsV3(n,i,vPass,nVal,vVal*primes[i]);
			}
		}
	}
	return sum;
};


var numSolutionsV4 = function(n,index,v,n_v) {
	var sum = 1;
	 for(var i = index; i < primesL; i++) {
		if(v[i] < maxPower) {
			var vPass = [v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12],v[13],v[14],v[15],v[16]];
			vPass[i]++;

			if(n_v/primes[i] < 1) {
				break;
			}

			if(vPass[i] <= 2*n[i]) {
				sum += numSolutionsV4(n,i,vPass,n_v/primes[i]);
			}
		}
	}
	return sum;
};

var pVector = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// console.log(numSolutions(18378360)); //5954
// console.log(numSolutions(120)); //32
//console.log(numSolutionsV3([3,1,1,0,0,0,0,0,0,0],0,[0,0,0,0,0,0,0,0,0,0]));

// console.log(nArray)
var mostSolutions = 0;
var minIndex = 11765;
// var minIndex = 18860;//17982; //Found by multiple runs

// var n = nArray[18860];
// console.log(numSolutionsV2(n.vec,0,[0,0,0,0,0,0,0,0,0,0]));
// console.log(n.value,n.vec); //139885119141768000 [ 6, 4, 3, 2, 2, 2, 1, 1, 1, 1 ]

//18860 139885119141768000 4146188
for(var nIndex = minIndex; nIndex < nArray.length; nIndex++) {
	var n = nArray[nIndex];
	// var solutions = numSolutions(n);
	//16399:3253163
	var solutions = numSolutionsV4(n.vec,0,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n.value);

	if(solutions > mostSolutions) {
		mostSolutions = solutions;
		console.log(nIndex,n.value,solutions,n.vec);

		if(mostSolutions > maxSolutions) {
			break;
		}
	}
}

//console.log(solutions);