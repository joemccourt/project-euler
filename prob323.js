// Joe McCourt
// 3/18/2014
// Project Euler problem 323
// Bitwise-OR operations on random integers

// Let y0, y1, y2,... be a sequence of random unsigned 32 bit integers
// (i.e. 0 ≤ yi < 232, every value equally likely).

// For the sequence xi the following recursion is given:

//     x0 = 0 and
//     xi = xi-1 | yi-1, for i > 0. ( | is the bitwise-OR operator)

// It can be seen that eventually there will be an index N such that
// xi = 232 -1 (a bit-pattern of all ones) for all i ≥ N.

// Find the expected value of N.
// Give your answer rounded to 10 digits after the decimal point.

// Each bit can be thought of independently
// Once a bit flips to true it will never become false again
// uniform probability 0.5 of given y bit equal to true

// For an individual bit, every random number
// has 50% chance of being true and keeping bit true
// prob true for one bit = 1 - 0.5^N
// But this should be expectation, think about Poisson distro
// prob(X = 0) = e^(-lambda) = e^(-(1-0.5^N))

// e^(-(1-0.5^N))^32 = 0.5
// e^(-(1-0.5^N)) = 0.5^(1/32)
// -(1-0.5^N) = log(0.5^(1/32))
// 0.5^N = 1+log(0.5^(1/32))
// N*log(0.5) = log(1+log(0.5^(1/32)))
// N = log(1+log(0.5^(1/32))) / log(0.5)


// prob true for 32 bits = (1 - 0.5^N)^32
// For expectation value, want when prob = 0.5
// thus 0.5 ^ (1/32) = 1 - 0.5^N
// log(1 - 0.5 ^ (1/32)) = N * log(0.5)
// log(1 - 0.5 ^ (1/32)) / log(0.5) = N

var n = Math.log(1 - Math.pow(0.5,1/32)) / Math.log(0.5);
// var n = Math.log(1 + Math.log(Math.pow(0.5,1/32))) / Math.log(0.5);

console.log(n);

