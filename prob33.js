// Joe McCourt
// 7/14/12

// The fraction 49/98 is a curious fraction, as an inexperienced mathematician in
// attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct,
// is obtained by cancelling the 9s.
// We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
// There are exactly four non-trivial examples of this type of fraction, less than one in value,
// and containing two digits in the numerator and denominator.
// If the product of these four fractions is given in its lowest common terms,
// find the value of the denominator.

//Iterate over every possible fraction
//Be careful with floating point equality
var prodN = 1;
var prodD = 1;
for(var numerator = 10; numerator < 100; numerator++){
	var numFirstDigit  = Math.floor(numerator/10);
	var numSecondDigit = numerator%10;
	for(var denominator = numerator+1; denominator < 100; denominator++){
		var denFirstDigit  = Math.floor(denominator/10);
		var denSecondDigit = denominator%10;
		var ratio = numerator/denominator;
		if(numFirstDigit == denFirstDigit){
			if(ratio == numSecondDigit / denSecondDigit){
				console.log(numerator,denominator);	
				prodN *= numerator;
				prodD *= denominator;
			}
		}

		if(numSecondDigit == denFirstDigit){
			if(ratio == numFirstDigit / denSecondDigit){
				console.log(numerator,denominator);	
				prodN *= numerator;
				prodD *= denominator;	
			}
		}
		//Was going to test for more here but I found all four in previous case
	}
}

console.log(prodN,prodD);
//By inspection answer is 100