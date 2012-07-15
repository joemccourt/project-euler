// Joe McCourt
// 7/14/12

// The number, 197, is called a circular prime because all rotations
// of the digits: 197, 971, and 719, are themselves prime.
// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
// How many circular primes are there below one million?

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

var numCircular = 0;
for(var i = 2; i < 1000000; i++){
	if(isPrime(i)){
		var circular = true;
		var strI = String(i);
		var length = strI.length;
		for(var j = 0; j<length-1; j++){
			var rotation = strI.substr(1)+strI[0];
			strI = rotation;
			if(!isPrime(parseInt(rotation))){circular=false;break;}
		}
		if(circular){
			console.log(i);
			numCircular++;
		}
	}
}

console.log(numCircular);