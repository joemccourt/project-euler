// Joe McCourt
// 7/14/12

// The number 3797 has an interesting property. Being prime itself,
// it is possible to continuously remove digits from left to right,
// and remain prime at each stage: 3797, 797, 97, and 7.
// Similarly we can work from right to left: 3797, 379, 37, and 3.
// Find the sum of the only eleven primes that are both truncatable from left to right and right to left.
// NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.

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

function isTruncatableL2R(number){
	if(!isPrime(number)){return false;}
	var numStr = String(number);
	if(numStr.length == 1){return true;}
	var l2r = parseInt(numStr.substr(1));

	return isTruncatableL2R(l2r);
}

function isTruncatableR2L(number){
	if(!isPrime(number)){return false;}
	var numStr = String(number);
	if(numStr.length == 1){return true;}
	var r2l = parseInt(numStr.substr(0,numStr.length-1));

	return isTruncatableR2L(r2l);
}

function isTruncatable(number){
	return isTruncatableR2L(number)&&isTruncatableL2R(number);
}

// I have no idea what the upper limit is, but since I know there are only eleven,
// I can stop once I find that many.
var numFound = 0;
var sum = 0;
var i = 11;
while(numFound < 11){
	if(isTruncatable(i)){
		numFound++;
		console.log(i);
		sum+=i;
	}

	i++;
}

console.log(sum);
//console.log(isTruncatable(3797))