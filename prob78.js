// Joe McCourt
// 12/2/2013

// Project Euler problem 78
// Let p(n) represent the number of different ways in which
// n coins can be separated into piles.
// For example, five coins can separated
// into piles in exactly seven different ways, so p(5)=7.

// OOOOO
// OOOO   O
// OOO   OO
// OOO   O   O
// OO   OO   O
// OO   O   O   O
// O   O   O   O   O

// Find the least value of n for which p(n) is divisible by one million.

// Fist some observations
// Coins are indistinguishable

// If piles were distinguishable:
// Same as choosing binary points in between coins, e.g. :
// O|O|O|O|O  where '|' is binary value to separate or not at that point
// For n coins there are n-1 separation points
// Every separation points has two possible values, so
// pDistinguishable(n) = 2^(n-1)


// P(0) = 1
// p(1) = 1
// p(2) = 2
// p(3) = 3
// p(4) = 5
// p(5) = 7
// p(6) = 11

// n = 3
// P(0)
// OOO

// P(1)
// OO O

// P(2) - P(0)
//XO OO
// O O O

// for n = 6:
// P(0)
// OOOOOO

// P(1)
// OOOOO O

// P(2)
// OOOO OO
// OOOO O O

// P(3)
// OOO OOO
// OOO OO O
// OOO O O O

// P(4) - P(0) - P(1)
//XOO OOOO
//XOO OOO O
// OO OO OO
// OO OO O O
// OO O O O O

// P(5)
//XO OOOOO
//XO OOOO O
//XO OOO OO
//XO OOO O O
//XO OO OO O
//XO OO O O O
// O O O O O O

// However, piles are indistinguishable, so need to find way of knowing duplicates
// Duplicates must have same sum
// Some duplicate examples
// 10 == 01

// 4: 000  0
// 3,1: 001 == 100  1,4
// 2,2: 010 2
// 2,1,1: 011 == 110 == 101 3,6,5
// 1,1,1,1: 111 7

// 2,2,1 0101 == 0110 == 1010
// 1001 != 0110

// n1, n2, n3, n4, n5
// n1+n2+n3+n4+n5 = 5

// p(2)
// 0
// 1

// p(3)
// 00
// 01 == 10
// 11

// p(4)
// 000
// 001    ==     100
// 010
// 011 == 101 == 110
// 111

// p(5)
// 5:       0000
// 4,1:     0001         ==         1000
// 3,2:     0010         ==         0100
// 3,1,1:   0011 ==     1001     == 1100
// 2,2,1:   0101 ==     0110     == 1010
// 2,1,1,1: 0111 == 1011 == 1101 == 1110
// 1,1,1,1: 1111

// p(6)
// 6:           00000
// 5,1:         00001                   ==                   10000
// 4,2:         00010                   ==                   01000
// 4,1,1:       00011 ==              10001               == 11000
// 3,3:         00100
// 3,2,1:       00101 == 00110 == 10010 == 01001 == 01100 == 10100
// 3,1,1,1:     00111 ==     10011      ==      11001     == 11100
// 2,2,2:       01010
// 2,2,1,1:     01011 == 01101 == 10101 == 10110 == 01110 == 11010
// 2,1,1,1,1:   01111 ==     10111 == 11011 == 11101      == 11110
// 1,1,1,1,1,1: 11111


var p = function(n){
	return 0;
};

for(var i = 0; i < 10; i++){
	console.log(i,p(i));
}