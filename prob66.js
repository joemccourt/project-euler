// Joe McCourt
// Jan 9th, 2014
// Project Euler problem 66
// Diophantine equation

// Consider quadratic Diophantine equations of the form:
// x^2 – D*y^2 = 1
// For example, when D=13, the minimal solution in x is 649^2 – 13×180^2 = 1.
// It can be assumed that there are no solutions in positive integers when D is square.

// By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the following:

// 3^2 – 2×2^2 = 1
// 2^2 – 3×1^2 = 1
// 9^2 – 5×4^2 = 1
// 5^2 – 6×2^2 = 1
// 8^2 – 7×3^2 = 1

// Hence, by considering minimal solutions in x for D ≤ 7,
// the largest x is obtained when D=5.

// Find the value of D ≤ 1000 in minimal solutions
// of x for which the largest value of x is obtained.

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
// x^2 = 1+D*y^2
// y^2 = (x^2 - 1)/D
// y = sqrt(x^2-1)/sqrt(D)
// x = sqrt(1+D*y*y)

// 2logx = log(1+d*y*y)

// D * square must be a square minus 1
// D = (square - 1) / square
// D = (x*x-1) / (y*y)
// D = (x/y)^2 - (1/y)^2

// x*x - 1 = x*(x-1)+x-1 = (x-1)*(x+1)
// y*y = (x-1)(x+1)/D
// y*y = (x-1)/k1 * (x+1)/k2   D = k1*k2  (x-1)/k1 = (x+1)/k2 = y
// (x-1)*k2 = (x+1)*k1
// x*(k2-k1) = k1 + k2
// x = (k1+k2)/(k2-k1)
// x = (5+1)/(5-1)
// x = (2+2.5)/(2.5-2)

for(var d = 2; d <= 10; d++) {
	if(Math.sqrt(d) == Math.floor(Math.sqrt(d))) {continue;}

	var minX = 1;
	for(var k = 1; k < Math.sqrt(d); k++) {
		if(d % k == 0) {
			var p = d/k;

			var x = (k+p)/(p-k);
			console.log(d,x,k,p);
			var trunc = x - Math.floor(x);
			if(trunc > 0) {
				x = x / trunc;
			}

			if(x >= minX) {
				minX = x;
			}
		}
	}
	console.log(d,minX);
}


// var Dmax = 100;
// var Dx = [];
// for(var x = 1; x < 100000; x++) {
// 	for(var di = 2; di < Dmax; di++) {
// 		// var y = (x*x-1) / (i*i);
		
// 		if(Math.sqrt(di) == Math.floor(Math.sqrt(di))) {}

// 		var y = Math.sqrt((x*x+1)/d)
		
// 		if(D > Dmax) {break;}
// 		if(D == Math.floor(D)) {
// 			if(!Dx[D] || i < Dx[D]) {
// 				Dx[D] = i;
// 				//console.log(D,i,j);
// 			}
// 		}
// 	}
// }

// console.log(Dx);


// var maxX = 1;
// var maxD = 2;
// for(var d = 2; d <= 60; d++) {
// 	if(Math.sqrt(d)-Math.floor(Math.sqrt(d)) == 0){ continue; }

// 	var dFactors = getPrimeFactors(d);
	
// 	var x = 2;
// 	var y = 1;
// 	while(true) {
// 		// var dFactors = dFactors0.slice(0);
// 		// x*x = y*y*d+1;

// 		// y*y = x*x/d - 1/d

// 		// (y+k)^2 = y*y+2*y*k+k^2 = x*x/d-1/d

// 		// var x = Math.sqrt(y) * Math.sqrt(d*y+1/y);

// 		// var x2 = d*y*y+1;

// 		// x = Math.sqrt(d*y*y+1);
// 		// var y = Math.sqrt((x*x+1)/d);

// 		var xP = x+1;
// 		var xM = x-1;
// 		var valid = true;
// 		for(key in dFactors) {
// 			var tmp = dFactors[key];
// 			while(tmp) {
// 				if(xP % key == 0) {
// 					tmp--;
// 					xP /= key;
// 				} else if(xM % key == 0) {
// 					tmp--;
// 					xM /= key;
// 				} else {
// 					x+=Math.min((x+1)/xP*(key-(xP%key)),(x-1)/xM*(key-(xM%key)));
// 					valid = false;
// 					break;
// 				}
// 			}
// 			if(!valid) { break; }
// 		}

// 		if(valid && Math.sqrt(xP*xM) != Math.floor(Math.sqrt(xP*xM))) {
// 			valid = false;

// 			x++;
// 			// x = Math.floor(Math.sqrt(d*Math.pow(Math.ceil(Math.sqrt(xP*xM)),2)));
// 		}

// 		if(valid) {
// 			console.log(d,x,xP*xM);
// 			if(x > maxX) {
// 				maxX = x;
// 				maxD = d;
// 			}
// 			break;
// 		}

// 		if(x*x >= 9.0071993e+13) {
// 			console.log("hit integer limit at",d,x)
// 			break;
// 		}
// 	}
// }

// console.log(maxX);





