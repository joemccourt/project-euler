// Joe McCourt
// 8/10/12

// By replacing the 1st digit of *3, it turns out that six of the nine possible values:
// 13, 23, 43, 53, 73, and 83, are all prime.

// By replacing the 3rd and 4th digits of 56**3 with the same digit,
// this 5-digit number is the first example having seven primes among the ten generated numbers,
// yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993.
// Consequently 56003, being the first member of this family, is the smallest prime with this property.

// Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits)
// with the same digit, is part of an eight prime value family.

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

function getNumPrimes(family){
	var length = family.length;
	var numPrimes = 0;

	// Replace every wild card with 0 to 9
	// and test primality
	//  According to example, firt wild card can't be zero
	for(var j = 0; j < 10; j++){
		var number = 0;
		for(var i = 0; i < length; i++){
			if(family[i] < 0 && !(i == 0 && j == 0)){ 
				number += j*Math.pow(10,length-1-i);
			}else{
				number += family[i]*Math.pow(10,length-1-i);
			}
		}
		if(isPrime(number)){
			//console.log(number);
			numPrimes++;
		}
	}
	return numPrimes;
}

//Search up until hit family with 8
var limit = 1000000;
for(var j = 2; j < limit; j++){
	if(isPrime(j)){

		//Construct initial family without wildcards
		var tmpNumber = j;
		var family = [];
		while(tmpNumber > 0){
			family.push(tmpNumber%10);
			tmpNumber = tmpNumber/10 | 0;
		}
		family.reverse();
		//console.log(family);

		//Seach every possible wildcard combo
		var length = family.length;
		for(var i = 0; i < 10; i++){
			var tmpFamily = family.slice();
			var found = false;
			for(k = 0; k < length; k++){
				if(tmpFamily[k] == i){
					tmpFamily[k] = -1;
					found = true;
				}
			}
			if(found){
				if(getNumPrimes(tmpFamily) == 8){
					console.log(j);
					j = limit;
					break;
				}
			}
		}

	}
}

//console.log(getNumPrimes([5,6,-1,-1,3]))
