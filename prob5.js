//Joe McCourt
//4/14/12

// Project Euler problem 5
// 2520 is the smallest number that can be divided by 
// each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is 
// evenly divisible by all of the numbers from 1 to 20?
function Prob5(){
	//The way I'm storing the factors would need to
	//be changed for very large numbers
	this.getPrimeFactors = function(number){
		var factors = [];
		var d = 2;
		while(d <= number){
			if(!(number%d)){
				if(!factors[d]){
					factors[d] = 1;
				}else{
					factors[d]++; 
				}
				number/=d;
			}else{
				d++;
			}
		}
		return factors;
	};

	// My approach is the idea that the prime factorization of this 
	// magical number has the maximum of all prime factorization of
	// numbers [1,20] 
	this.eval = function(){
		//The maximum number of prime factors needed
		var maxFactors = [];

		//For each number get the prime factors
		//Keep track of the maximum prime factors
		for(var i = 1; i <= 20; i++){
			var factors = this.getPrimeFactors(i);
			for(var j = 1; j < factors.length; j++){
				if(typeof factors[j] !== "undefined"){
					if(typeof maxFactors[j] === "undefined"){
						maxFactors[j] = factors[j];
					}else if(maxFactors[j] < factors[j]){
						maxFactors[j] = factors[j];
					}
				}
			}
		}

		//Calculate what this number is of max factors
		var number = 1;
		for(var j = 1; j < maxFactors.length; j++){
			if(typeof maxFactors[j] !== "undefined"){
				number *= Math.pow(j,maxFactors[j]);
			}
		}
		return number;
	};
}