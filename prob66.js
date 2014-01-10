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

// x^2 = 1+D*y^2
// y^2 = (x^2 - 1)/D
// y = sqrt(x^2-1)/sqrt(D)
// x = sqrt(1+D*y*y)
// 

// var sqrts = {};
// var genSqrts = function(n) {
// 	for(var i = 0; i < n; i++) {
// 		sqrts[i*i] = i;
// 	}
// };

// genSqrts(100000);

var maxX = 1;
var maxD = 2;
for(var d = 2; d <= 100; d++) {
	if(Math.sqrt(d)-Math.floor(Math.sqrt(d)) == 0){ continue; }

	var x = 2;
	var y = 1;
	while(true && y*y*d < 9.0071993e+15) {

		// x*x = y*y*d+1;

		// y*y = x*x/d - 1/d

		// (y+k)^2 = y*y+2*y*k+k^2 = x*x/d-1/d

		// var x = Math.sqrt(y) * Math.sqrt(d*y+1/y);

		// var x2 = d*y*y+1;

		var y = Math.sqrt((x*x+1)/d);
		if(x-(x|0)==0) {
			if(x > maxX) {
				maxX = x;
				maxD = d;
				console.log(d,x,y);
			}
			break;
		}
		y++;
	}

	if(y*y*d >= 9.0071993e+15) {
		console.log("hit integer limit at",d,x)
	}
}







