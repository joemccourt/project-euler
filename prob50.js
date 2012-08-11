// Joe McCourt
// 8/10/12

// The prime 41, can be written as the sum of six consecutive primes:
// 41 = 2 + 3 + 5 + 7 + 11 + 13
// This is the longest sum of consecutive primes that adds to a prime below one-hundred.
// The longest sum of consecutive primes below one-thousand that adds to a prime,
// contains 21 terms, and is equal to 953.
// Which prime, below one-million, can be written as the sum of the most consecutive primes?

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

function arraySum(array){
	var sum = 0;
	var length = array.length;
	for(var i = 0; i < length; i++){
		sum += array[i];
	}
	return sum;
}

var maxLength = 0;
var maxFound = 2;
var limit = 1000000;
for(var j = 2; j < limit; j++){

	if(isPrime(j)){
		var primesLength = 0;
		var sum = 0;
		for(var i = j; sum < limit; i++){
			if(isPrime(i)){
				sum += i;
				primesLength++;

				if(primesLength > maxLength && isPrime(sum)){
					maxLength = primesLength;
					maxFound = sum;
					//console.log(sum,primesLength);
				}
			}
		}
	}
}

console.log(maxFound);
