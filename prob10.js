//Joe McCourt
//4/14/12

// Project Euler problem 10
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.
function Prob10(){

	//Simple prime number check
	this.isPrime = function(number){
		if(number === 1){return false;}
		var maxCheck = Math.floor(Math.sqrt(number));
		if(!(number%2)){return false;}
		for(var i = 3; i <= maxCheck; i+=2){
			if(!(number%i)){return false;}
		}

		return true;
	};

	//Evaluating somewhat slow so use
	//isPrime test from pdf for prob7
	//Truns out to not be any faster than my original one
	this.isPrimeFaster = function(n){
		if(n==1){return false;}
		if(n<4){return true;} //2 and 3 are prime
		if(!(n%2)){return false;}
		if(n<9){return true;} //we have already excluded 4,6 and 8.
		if(!(n%3)){return false;}

		var r = Math.floor(Math.sqrt(n)); // n rounded to the greatest integer r so that r*r<=n
		var f = 5;
		while(f<=r){
			if((n%f)==0 || (n%(f+2))==0){return false;}
			f+=6;
		}
		return true;
	}

	//Could be a lot faster using seive method
	//But this is okay at ~4 seconds
	this.eval = function(){
		//Simple sum
		var sum = 2;
		for(var i = 3; i <= 2000000; i+=2){
			if(this.isPrime(i)){
				sum+=i;
			}
		}
		return sum;
	};
}