// Joe McCourt
// 12/2/2013

// Project Euler problem 76
// Number of ways to write summations
// Same as problem 78 but minus 1

//Brute force plus memoiziation
var mem = {};

var p = function(n,max){
	var sum = 0;
	if(max == 1 || max == 0){return 1;}
	
	var m = mem[n*100000 + max];
	if(m){return m;}

	for(var i = max; i > 0; i--){
		var newMax = i;
		if(n-i < newMax){newMax = n-i;}
		sum += p(n-i,newMax);
	}

	mem[n*100000 + max] = sum;
	return sum;
};

for(var i = 0; i <= 100; i++){
	var numWays = p(i,i)-1;

	console.log(i,numWays);
}