//Joe McCourt
//4/14/12

// Project Euler problem 3
// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?
function Prob3(){

	this.isMultiple = function(number,base){
		return !(number%base);
	};

	//Simple prime number check
	this.isPrime = function(number){
		var maxCheck = Math.ceil(Math.sqrt(number));
		if(!(number%2)){return false;}
		for(var i = 3; i < maxCheck; i+=2){
			if(!(number%i)){return false;}
		}

		return true;
	};

	//My initial solution
	this.eval = function(){
		var number = 600851475143;
		var highestPrime = 1;
		var complement;

		for(var i = 1; i < number; i++){
			//If i is a factor
			if(!(number%i)){
				//Look first at complement factor
				//If is prime, it is the highest prime factor
				complement = number/i;
				console.log("Testing: ", complement);
				if(this.isPrime(number/i)){
					highestPrime = complement;
					console.log("Found Highest prime: ", complement);
					break;
				}
			}
		}
		
		return highestPrime;
	};

	//After some reading in the forums
	//http://projecteuler.net/thread=3&page=3
	this.eval2 = function(){
		var d = 2;
		var n = 600851475143;

		while(d * d < n){
			if(!(n%d)){
				n /= d;
			}else{
				d++;
			}
		}
    return n;
	};
}