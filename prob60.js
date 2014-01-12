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

var set = [0,1,2,3,4];
searchSet(set,0);