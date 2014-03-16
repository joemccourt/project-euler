// Joe McCourt
// 3/13/2014
// Project Euler problem 223
// Almost right-angled triangles I

// Let us call an integer sided triangle with sides a ≤ b ≤ c
// barely acute if the sides satisfy
// a^2 + b^2 = c^2 + 1.

// How many barely acute triangles are there with perimeter ≤ 25,000,000?


// Brute force approach is too slow order of (25000000)^2
// given a is known, what can we infer from b?
// b is greater than or equal to a to prevent duplicates
// b*b = c*c - a*a + 1
// a*a - 1 = c*c - b*b
// k = c*c - b*b

// b*b = c*c - k

// b = nb 


// b*b = (b+dc)*(b+dc) - k
// 0 = 2*b*dc + dc*dc - k
// k = 2*b*dc + dc*dc

// if b1*b1 = c1*c1 - k can we find b2 and c2?
// (b1+db)^2 = (c1+dc)^2-k
// 2*b1*db + db*db = 2*c1*dc + dc*dc
// 
// && b <= a*a/2 - 1
// a + b + c <= p
var limit = 100; //10000 -> 13656
var count = 0;
for(var a = 1; a <= limit; a++) {
	var k = a*a - 1;

	count++;
	if(k%2 != 0) {continue;}
	
	var m = 1;
	var c = k/(2*m) + m;
	var b = c-m;
	while(m < k/2 && a+b+c <= limit){
		if(Math.floor(c) == c){
			console.log(a,b,c,m);
			count++;
		}

		m++;
		c = k/(2*m) + m;
		b = c-m;
	}

	// var b = 1;
	// var db = a-1;
	// var dbb = 0;
	// var c = b+db+dbb;
	// while(c > 0 && ) {
	// 	count++;
	// 	db = dbb;
	// 	dbb = -2*(b+db);
	// 	b = b+db;
	// 	c = b+db;
	// }
	
	// a*a + b*b = c*c + 1
	// c*c - b*b = a*a - 1
	
	// c*c+1 = (c-1)^2 + 2c

	// a*a + b*b - c*c = 1
	// a + b + c = p
	// a*a + b*b + c*c + 2*a*b + 2*b*c + 2*a*c = p
	// -2*c*c + 2*a*b + 2*b*c + 2*a*c = p - 1
	// a*b + b*c + a*c - c*c = (p - 1)/2

	// if (b+dc)*(b+dc) - b*b = a*a-1 is a solution:
	// 2*dc*b+dc*dc = a*a-1
	// c*c - (b+db)*(b+db) = a*a-1 
	// c*c - b*b - 2*b*db - db*db = a*a-1

	// 2*(db+ddb)*b+(db+ddb)*(db+ddb) = a*a-1
	// => 2*ddb*b+2*ddb*db+ddb*ddb = 0
	// 2*b + 2*db + dbb = 0
	// dbb = -2*(b+db)

	// for(var b = a; a+b <= limit && b <= bMax; b++) {
	// 	var c = Math.sqrt(b*b+k);
	// 	if(Math.floor(c) == c && c > 0) {
	// 		var p = a + b + c;
	// 		if(p <= limit) {
	// 			console.log(a,b,c);
	// 			count++;
	// 		}
	// 	}
	// }
}
// var ks = [];
// for(var k = 0; k <= limit; k++) {
// 	ks[k] = k*k-1;
// }

// a*a + b*b = c*c + 1
// p = a+c+b => c = p-a-b
// a*a + b*b = (p-a-b)^2+1
// a*a + b*b = p*p + b*b + a*a - 2p*a - 2p*b + 2a*b +1
// 0 = p*p - 2p*a - 2p*b + 2a*b + 1
// 2*p*a + 2*p*b + 2*a*b = p*p + 1
// p*a + p*b + a*b = (p*p+1)/2

// let k = a*a-1
// k = c*c - b*b
// let c+b = p, c-b = n
// k = c*c - (c-n)*(c-n)
// k = 2*c*n - n*n
// k = 2*c*n - n*n

// a*a + b*b = c*c + 1

// Examine difference of squares:
// let c + b = p
// c*c - b*b = (p-b)*(p-b) - b*b = p*p - 2*p*b
// When is this in the form of a*a - 1?

// p*p - 2*p*b = a*a - 1
// sqrt(p*p-2*p*b + 1) = a

// a*a + b*b - 1 = c*c
// When searching a, has form of
// b*b + k = c*c  given k = a*a-1
// c*c - b*b = k
// c == b and k = 0 or
// b = 1 and c = k or

// cmax*cmax - bmax*bmax = k

// min delta squares = (n+1)^2 - n^2 = 2n + 1 = a*a - 1
// 2*bmax + 1 = a*a-1
// bmax = a*a/2 - 1


// c = b+dc,
// 2*c*dd + dc*dc = k


// for(var cb = 1; cb <= limit; cb++) {

// 	var ki = 1;
// 	var k = ki*ki-1;
// 	var n = 1;
// 	while(k < cb*cb && ki + cb <= limit) {

// 		if(cb%2==0) {
// 			n = k / cb / 2;
// 			if(Math.floor(n) == n) {
// 				// console.log(n,cb,ki)
// 				count++;
// 				ki = Math.ceil(Math.sqrt(2*cb+k+1));
// 			} else {
// 				// var kiNew = ki;
// 				ki++;
// 			}
// 			// n = Math.floor(n) + 1;
// 			// if(ki == kiNew) {ki++;} else {ki = kiNew;}
// 		} else {
// 			n = (k / cb + 1) / 2;
// 			if(Math.floor(n) == n) {
// 				// console.log(n,cb,ki)
// 				count++;
// 				ki = Math.ceil(Math.sqrt(2*cb+k+1));
// 			}else {
// 				ki++;//Math.ceil(Math.sqrt(2*cb+k)+1)
// 			}
// 		}

// 		// kNew - k >= 2*cb
// 		// kiNew*kiNew-1 -k >= 2*cb
// 		// kiNew = Math.ceil(Math.sqrt(2*cb+k+1))
// 		// var ki = k+2*cb;
// 		var k = ki*ki-1;

// 	}

// }

console.log(count);


// 1 1 1
// 1 2 2
// 1 3 3
// 1 4 4
// 1 5 5
// 1 6 6
// 1 7 7
// 1 8 8
// 1 9 9
// 1 10 10
// 1 11 11
// 1 12 12
// 1 13 13
// 1 14 14
// 1 15 15
// 1 16 16
// 1 17 17
// 1 18 18
// 1 19 19
// 1 20 20
// 1 21 21
// 1 22 22
// 1 23 23
// 1 24 24
// 1 25 25
// 1 26 26
// 1 27 27
// 1 28 28
// 1 29 29
// 1 30 30
// 1 31 31
// 1 32 32
// 1 33 33
// 1 34 34
// 1 35 35
// 1 36 36
// 1 37 37
// 1 38 38
// 1 39 39
// 1 40 40
// 1 41 41
// 1 42 42
// 1 43 43
// 1 44 44
// 1 45 45
// 1 46 46
// 1 47 47
// 1 48 48
// 1 49 49
// 4 7 8
// 5 5 7
// 6 17 18
// 7 11 13
// 8 9 12
// 8 31 32
// 9 19 21
// 10 15 18
// 11 13 17
// 11 29 31
// 13 19 23
// 13 41 43
// 14 17 22
// 14 31 34
// 15 26 30
// 16 23 28
// 17 21 27
// 17 34 38
// 19 27 33
// 20 25 32
// 22 31 38
// 23 29 37
// 29 29 41
// 72