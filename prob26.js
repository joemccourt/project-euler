// Joe McCourt
// 4/28/13

// Project Euler problem 26
// Find the value of d  1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.

// var i;

// var longest = 0;
// for(i = 2; i < 1000; i++){
// 	var fraction = (1/i).toString();


// 	if(i >= 10){
// 		var fraction = (10/i).toString();
// 	}

// 	if(i >= 100){
// 		var fraction = (100/i).toString();
// 	}

// 	var decimal = fraction.substr(2);

// 	var k,j;
// 	var longestCycle = 0;
// 	var offset = 0;
// 	while(longestCycle == 0 && offset <= decimal.length/2){
// 		for(j = 1; j < decimal.length - 3 - offset; j++){
// 			var cycle = true;
// 			for(k = j + offset; k < decimal.length; k++){
// 				if(decimal[k] != decimal[k-j]){
// 					cycle = false;
// 					break;
// 				}
// 			}
// 			if(cycle && j > longestCycle){
// 				longestCycle = j;
// 				break;
// 			}
// 		}

// 		offset++;
// 	}

// 	if(longestCycle > 1){
// 	}

// 	if(longest <= longestCycle){
// 		console.log(longestCycle,fraction,i);
// 		longest = longestCycle
// 	}
// }


// Another attempt 1/24/14
// 1/n = k/10^p
// 10^p = k*n
// 5^p*2^p = k*n + 1

// 10^3 = 125*8
// 10^6 = 142857*7 + 1
// 10^1 = 3*3 + 1
// 10^2 = 10*6 + 6*6

//k = (10^p-1) / n;

// 10^p = k*n + 1 + q
// k = (10^p - 1 - q)/n

// 1/6 = 0.1 + 0.066666
// 1 = 0.6 + 6*0.06666
// 1 = 0.6 + 6*2/3*0.09999
// 1 = 0.6 + 0.4*(10^p-1)
// 1 - n*p/10^p

// 1 = 0.6 + 0.4*0.99999
// 1/6-0.1=0.066666
// 10/6-1 = 0.6666 = 6*0.1111 = 6/9*0.9999
// 10 - n = k*n/9*0.999
// k = 9*(10-n)/(0.9999)
// k = (10-1)*(10-n)/

function getPrimeFactors(number){
	var factors = {};
	var d = 2;
	var limit = Math.ceil(Math.sqrt(number));

	while(d <= limit){
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

	if(d <= number) {
		factors[number] = 1;
	}
	return factors;
};

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

var bigMod = function(digits,n) {
	var mod = 1;
	var tenMod0 = (2 % n) * (5 % n) % n;
	for(var i = 1; i < digits; i++) {
		var tenMod = 1;//Math.pow(tenMod0,i) % n;
		for(var j = 0; j < i; j++) {
			tenMod = tenMod0 * tenMod % n;
		}

		mod = (mod + tenMod)%n; 
	}
	return mod;
};

// console.log(bigMod([1,1,1,1,1,1],38))

//Assuming repeating part starts immediately
// var maxP = 1;
// for(var n = 3; n < 4; n++) {
// 	var nFactors = getPrimeFactors(n);
// 	for(var p = 1; p < 10; p++) {
// 		var kFactors = getPrimeFactors(Math.pow(10,p)-1);
// 		console.log(kFactors)
// 		var kS = (Math.pow(10,p)) / n;
// 		var kR = (Math.pow(10,p)-1) / n;

// 		// console.log(p,kS,kR,kR2)
// 		// if(kS == Math.floor(kS)) {break;}
// 		if(kR == Math.floor(kR)) {
// 			if(p > maxP) {
// 				maxP = p;
// 				console.log(n,kR,maxP);
// 				console.log(kFactors);
// 			}
// 			// break;
// 		}
// 	}
// }

// Search for prime divisible only by highest repeating 9
// Nines always divisible by 9, search 1s

//Notice pattern with 1s factors
//Only distinct primes
//Divisible by 11 every 2 digits, 3, 37 every 3, 11, 101 every 4
var found = {};
var nines = [];
var ones = [];
var nine = 0;
for(var digits = 1; digits < 1000; digits++) {
	
	ones.push(1);

	for(var d = 3; d < 1000; d++) {
		if(!found[d] && bigMod(digits,d) == 0) {
			console.log("New highest",d,digits)
			found[d] = digits;
		}
	}

	// nine = nine*10 + 1;

	// nines[digits] = nine;

	// console.log(nine);
	// var factorsNine = getPrimeFactors(nine);

	// for(var key in factorsNine) {
	// 	if(!found[key]  && parseInt(key,10) < 1000) {
	// 		// console.log("New highest",key,digits)
	// 		found[key] = digits;
	// 	}
	// }
	// console.log(factorsNine,digits)
}

for(var i = 3; i < 1000; i++) {
	if(!found[i] && isPrime(i)) {
		console.log("not found",i)
	}
}

// console.log(found)