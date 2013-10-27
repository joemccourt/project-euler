// Joe McCourt
// 10/26/13

// Project Euler problem 57

// It is possible to show that the square root of two can be
// expressed as an infinite continued fraction.
// sqrt(2) = 1 + 1/(2 + 1/(2 + 1/(2 + ... ))) = 1.414213...
// By expanding this for the first four iterations, we get:
// 1 + 1/2 = 3/2 = 1.5
// 1 + 1/(2 + 1/2) = 7/5 = 1.4
// 1 + 1/(2 + 1/(2 + 1/2)) = 17/12 = 1.41666...
// 1 + 1/(2 + 1/(2 + 1/(2 + 1/2))) = 41/29 = 1.41379...
// The next three expansions are 99/70, 239/169, and 577/408, 
// but the eighth expansion, 1393/985, is the first example
// where the number of digits in the numerator exceeds the number of digits in the denominator.
// In the first one-thousand expansions, how many fractions
// contain a numerator with more digits than denominator?

//Add n2 to n1 (n1+=n2)
//Assume n1 > n2
var bigAdd = function(n1,n2){
        
        //Init carry
        var length = n1.length;
        var carry = [];
        while(carry.length<length){carry[carry.length]=0;}
        while(n2.length<length){n2[n2.length]=0;}

        for(var j = 0; j < length; j++){
                var temp = n1[j]+n2[j];
                if(temp > 9){
                        n1[j] = temp%10;
                        carry[j+1] = temp/10|0;
                        if(j==length-1){
                                length++;
                                n1[j+1]=0;
                                n2[j+1]=0;
                        }
                }else{
                        n1[j] = temp;
                        carry[j+1] = 0;
                }
        }

        //Add carry
        for(var j = 0; j < length; j++){
                if(carry[j]){
                        var temp = n1[j] + carry[j];

                        if(temp > 9){ //carry again
                                //Check if need to expand arrays
                                if(j==length-1){
                                        length++;
                                        n1[j+1]=0;
                                        carry[j+1]=0;
                                }
                                n1[j] = temp%10;
                                carry[j+1] += temp/10|0;
                        }else{
                                n1[j] = temp;
                        }
                }
        }

        return n1;
};

var getPrimeFactors = function(number){
	var factors = {};
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

var reduceFraction = function(n,d){
	var nF = getPrimeFactors(n);
	var dF = getPrimeFactors(d);

	var sF; //search factors smaller
	var xF; //The other one
	if(nF.length < dF.length){
		sF = nF;
		xF = dF;
	}else{
		sF = dF;
		xF = nF;
	}

	for(f in sF){
		if(sF.hasOwnProperty(f)){
			if(typeof xF[f] === 'number'){
				// console.log(f,sF[f],xF[f]);
				var min = Math.min(sF[f],xF[f]);
				sF[f] -= min;
				xF[f] -= min;
			}
		}
	}

	var nR = 1;
	var dR = 1;
	for(f in nF){
		if(nF.hasOwnProperty(f) && nF[f] > 0){
			nR *= Math.pow(f,nF[f]);
		}
	}
	for(f in dF){
		if(dF.hasOwnProperty(f) && dF[f] > 0){
			dR *= Math.pow(f,dF[f]);
		}
	}

	return [nR,dR];
}

// //Would like a better way of doing this :/
// function numDigits(n){
// 	return (""+n).length;
// }

var i = 2;
var n = [3];
var d = [2];
var tmp;
var solution = 0;
while(i <= 1000){

	// n = d + n;
	// tmp = n;
	// n = d + n;
	// d = tmp;

	bigAdd(n,d);
	tmp = n.slice(0);
	bigAdd(n,d);
	d = tmp.slice(0);

	// console.log(i,n,d);
	if(n.length > d.length){
		solution++;
	}

	i++;
}

console.log(solution);
// console.log(reduceFraction(4,8));

