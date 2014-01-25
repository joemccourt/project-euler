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
//Assuming repeating part starts immediately
var maxP = 1;
for(var n = 12; n < 13; n++) {
	for(var p = 1; p < 10; p++) {
		var kS = (Math.pow(10,p)) / n;
		var kR = (Math.pow(10,p)-1) / n;
		var kR2 = (Math.pow(10,p-1)-(kS|0));
		console.log(p,kS,kR,kR2)
		if(kS == (kS|0)) {break;}
		if(kR == (kR|0)	) {
			if(p > maxP) {
				maxP = p;
				console.log(n,kR,maxP);
				break;
			}
		}
	}
}