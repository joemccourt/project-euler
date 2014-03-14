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
// b*b = (b+dc)*(b+dc) - k
// 0 = 2*b*dc + dc*dc - k
// k = 2*b*dc + dc*dc

// if b1*b1 = c1*c1 - k can we find b2 and c2?
// (b1+db)^2 = (c1+dc)^2-k
// 2*b1*db + db*db = 2*c1*dc + dc*dc
// 

// a + b + c <= p
var limit = 100;
var count = 0;
for(var a = 1; a <= limit; a++) {
	var k = a*a - 1;
	for(var b = a; a+b <= limit; b++) {
		var c = Math.sqrt(b*b+k);
		if(Math.floor(c) == c) {
			var p = a + b + c;
			if(p <= limit) {
				// console.log(a,b,c);
				count++;
			}
		}
	}
}

console.log(count);