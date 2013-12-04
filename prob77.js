// Joe McCourt
// 12/2/2013

// Project Euler problem 77
// Number of ways to write prime summations
// Same as problem 76, but groups must be prime
// Find first value to exceed 5000

//Seive technique is probably best for this
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

//Brute force plus memoiziation
var mem = {};

var p = function(n,max,lvl){
	var sum = 0;
	if(max == 1){return 0;}
	// if(max == 0 && isPrime(n)){return 1;}

	if(max == n && isPrime(n)){
		sum = 1; 
		// console.log(lvl+n+","+max);
	}

	var m = mem[n*100000 + max];
	if(m){return m;}

	for(var i = max; i > 0; i--){
		var newMax = i;
		if(n-i < newMax){newMax = n-i;}
		if(!isPrime(i)){
			continue;
		}
		sum += p(n-i,newMax,lvl+" ");
	}

	mem[n*100000 + max] = sum;
	return sum;
};

for(var i = 0; i <= 100; i++){
	var numWays = p(i,i);
	// var numWays = p(i,i,"");

	console.log(i,numWays);
	if(numWays > 5000){
		break;	
	}
}