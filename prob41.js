// Joe McCourt
// 7/21/12

// We shall say that an n-digit number is pandigital if it makes use of
// all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
// What is the largest n-digit pandigital prime that exists?

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

function isPrimeArray(number){
	return isPrime(parseInt(""+number[0]+number[1]+number[2]+number[3]+number[4]+number[5]+number[6]+number[7]+number[8]));
}

function search(number){
	if(isPrimeArray(number)){
		console.log(number);
	}
	searchH(number,0);
}

function searchH(number,index){
	if(index >= number.length){return;}
	searchH(number,index+1);
	
	var copy;
	var indexNumber = number[index];
	for(var i = index+1; i < number.length; i++){
		copy = number.slice();
		copy[index] = number[i];
		copy[i] = indexNumber;

		searchH(copy,index+1);
		if(isPrimeArray(copy)){
			console.log(copy);
		}
	}
};

search([9,8,7,6,5,4,3,2,1]); //None found here
search([8,7,6,5,4,3,2,1]); //None found here
search([7,6,5,4,3,2,1]); //First ones found here