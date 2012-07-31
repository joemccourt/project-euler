// Joe McCourt
// 7/30/12

// The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330,
// is unusual in two ways: (i) each of the three terms are prime, and,
// (ii) each of the 4-digit numbers are permutations of one another.
// There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes,
// exhibiting this property, but there is one other 4-digit increasing sequence.
// What 12-digit number do you form by concatenating the three terms in this sequence?

// Base 10 number of digits
function numDigits(n){	
	return String(n).length;
}

function isAnagram(str1, str2){
	if(str1.length != str2.length){return false;}

	var index;
	for(var i = 0; i < str1.length; i++){
		
		//Must contain every character somewhere
		index = str2.indexOf(str1.charAt(i));
		if(index < 0){
			return false;
		}

		//The number of each char must match up
		if(str1.split(str1.charAt(i)).length != str2.split(str1.charAt(i)).length){
			return false;
		}
	}
	return true;
}

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

function hasProperty(a,b){
	if(!isPrime(b)){return false;}
	
	var i = 1;

	while(numDigits(a*i+b)==4){
		 if(!isPrime(a*i+b)){
		 	return false;
		 }
		 if(!isAnagram(String(b),String(a*i+b))){return false;}
		 if(i == 2){return true;}
		 i++;
	}
	return false;
}

for(var b = 1000; b < 9999; b++){
	for(var a = 2; a < 5000; a++){
		if(hasProperty(a,b)){
			//console.log(a,b);
			console.log(b,a+b,2*a+b);
		}
	}
}

