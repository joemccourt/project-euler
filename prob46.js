// Joe McCourt
// 7/22/12

// It was proposed by Christian Goldbach that every odd composite number
// can be written as the sum of a prime and twice a square.
// 9 = 7 + 2*1^2
// 15 = 7 + 2*2^2
// 21 = 3 + 2*3^2
// 25 = 7 + 2*3^2
// 27 = 19 + 2*2^2
// 33 = 31 + 2*1^2
// It turns out that the conjecture was false.
// What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?

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

//can be written as the sum of a prime and twice a square
function isGoldbach(number){

	for(var square = 1; 2*square*square < number; square++){
		if(isPrime(number - 2*square*square)){
			//console.log(number,number - 2*square*square,square);
			return true;
		}
	}
	return false;
}

for(var i = 9;;i+=2){
	if(!isPrime(i)){
		if(!isGoldbach(i)){
			console.log(i);
			break;
		}
	}
}