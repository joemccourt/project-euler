// Joe McCourt
// Mar 8th, 2014
// Project Euler problem 64
// Odd period square roots

// All square roots are periodic when written as continued fractions
// and can be written in the form:

// It can be seen that the sequence is repeating.
// For conciseness, we use the notation √23 = [4;(1,3,1,8)],
// to indicate that the block (1,3,1,8) repeats indefinitely.

// The first ten continued fraction representations of (irrational)
// square roots are:

// √2=[1;(2)], period=1
// √3=[1;(1,2)], period=2
// √5=[2;(4)], period=1
// √6=[2;(2,4)], period=2
// √7=[2;(1,1,1,4)], period=4
// √8=[2;(1,4)], period=2
// √10=[3;(6)], period=1
// √11=[3;(3,6)], period=2
// √12= [3;(2,6)], period=2
// √13=[3;(1,1,1,1,6)], period=5

// Exactly four continued fractions, for N ≤ 13, have an odd period.

// How many continued fractions for N ≤ 10000 have an odd period?


var isOddPeriod = function(n) {
	var goal = Math.sqrt(n);

	var coef = [];
	var startState = "";
	for(var i = 0; i < 20; i++) {
		var first = Math.floor(goal);
		var remainder = goal - first;

		if(remainder == 0) {return false;}
		// console.log(n,first,remainder);

		var stateHash = ""+first+"-"+Math.round(remainder*100000000);

		coef.push(first);
		if(i == 0) {
			// startState = stateHash;
		} else if (first == 2*coef[0]) {
			console.log(n,coef);
			return i % 2 == 1;
		}

		// mapState[stateHash] = i;
 // 0.2782329983125269
		goal = 1/remainder;
	}

	console.log("Warning:",n,coef);
	return false;
};

var count = 0;
for(var i = 1; i <= 1000; i++) {
	if(isOddPeriod(i)) {
		count++;
	}
}

// Look at first 50
// 1 	       1
// 2  [ 1            2 ]   ODD
// 3  [ 1      1     2 ]
// 4  		   2
// 5  [ 2            4 ]  ODD
// 6  [ 2      2     4 ]
// 7  [ 2   1  1  1  4 ]
// 8  [ 2      1     4 ]
// 9           3
// 10 [ 3            6 ]   ODD
// 11 [ 3      3     6 ]
// 12 [ 3      2     6 ]
// 13 [ 3   1 1 1 1  6 ]    ODD!
// 14 [ 3    1 2 1   6 ]
// 15 [ 3      1     6 ]
// 16           4
// 17 [ 4               8 ]  ODD
// 18 [ 4       4       8 ]
// 19 [ 4   2 1 3 1 2   8 ]
// 20 [ 4       2       8 ]
// 21 [ 4   1 1 2 1 1   8 ]
// 22 [ 4   1 2 4 2 1   8 ]
// 23 [ 4     1 3 1     8 ]
// 24 [ 4       1       8 ]
// 25           5
// 26 [ 5               10 ]  ODD
// 27 [ 5       5       10 ]
// 28 [ 5     3 2 3     10 ]
// 29 [ 5    2 1 1 2    10 ]  ODD!
// 30 [ 5       2       10 ]
// 31 [ 5 1 1 3 5 3 1 1 10 ]
// 32 [ 5     1 1 1     10 ]
// 33 [ 5     1 2 1     10 ]
// 34 [ 5     1 4 1     10 ]
// 35 [ 5       1       10 ]
// 36                6
// 37 [ 6                         12 ]  ODD
// 38 [ 6            6            12 ]
// 39 [ 6            4            12 ]
// 40 [ 6            3            12 ]
// 41 [ 6           2 2           12 ]   ODD!
// 42 [ 6            2            12 ]
// 43 [ 6    1 1 3 1 5 1 3 1 1    12 ]
// 44 [ 6      1 1 1 2 1 1 1      12 ]
// 45 [ 6        1 2 2 2 1        12 ]
// 46 [ 6  1 3 1 1 2 6 2 1 1 3 1  12 ]
// 47 [ 6          1 5 1          12 ]
// 48 [ 6            1            12 ]
// 49                7
// 50 [ 7                         14 ]   ODD
// 51 [ 7            7            14 ]
// 52 [ 7        4 1 2 1 4        14 ]
// 53 [ 7         3 1 1 3         14 ]   ODD!
// 54 [ 7        2 1 6 1 2        14 ]
// 55 [ 7          2 2 2          14 ]
// 56 [ 7            2            14 ]
// 57 [ 7        1 1 4 1 1        14 ]
// 58 [ 7       1 1 1 1 1 1       14 ]   ODD!
// 59 [ 7        1 2 7 2 1        14 ]
// 60 [ 7          1 2 1          14 ]
// 61 [ 7   1 4 3 1 2 2 1 3 4 1   14 ]   ODD!
// 62 [ 7          1 6 1          14 ]
// 63 [ 7            1            14 ]
// 64                8
// 65 [ 8                         16 ]   ODD
// 66 [ 8            8            16 ]
// 67 [ 8    5 2 1 1 7 1 1 2 5    16 ]
// 68 [ 8            4            16 ]
// 69 [ 8      3 3 1 4 1 3 3      16 ]
// 70 [ 8        2 1 2 1 2        16 ]
// 71 [ 8      2 2 1 7 1 2 2      16 ]
// 72 [ 8            2            16 ]
// 73 [ 8       1 1 5 5 1 1       16 ]    ODD!
// 74 [ 8         1 1 1 1         16 ]    ODD!
// 75 [ 8          1 1 1          16 ]
// 76 [ 8  1 2 1 1 5 4 5 1 1 2 1  16 ]
// 77 [ 8        1 3 2 3 1        16 ]
// 78 [ 8          1 4 1          16 ]
// 79 [ 8          1 7 1          16 ]
// 80 [ 8            1            16 ]
// 81                   9
// 82 [ 9                               18 ]   ODD
// 83 [ 9               9               18 ]
// 84 [ 9               6               18 ]
// 85 [ 9            4 1 1 4            18 ]   ODD!
// 86 [ 9       3 1 1 1 8 1 1 1 3       18 ]
// 87 [ 9               3               18 ]
// 88 [ 9           2 1 1 1 2           18 ]
// 89 [ 9            2 3 3 2            18 ]   ODD!
// 90 [ 9               2               18 ]
// 91 [ 9         1 1 5 1 5 1 1         18 ]
// 92 [ 9         1 1 2 4 2 1 1         18 ]
// 93 [ 9       1 1 1 4 6 4 1 1 1       18 ]
// 94 [ 9 1 2 3 1 1 5 1 8 1 5 1 1 3 2 1 18 ]
// 95 [ 9             1 2 1             18 ]
// 96 [ 9             1 3 1             18 ]
// 97 [ 9      1 5 1 1 1 1 1 1 5 1      18 ]   ODD!
// 98 [ 9             1 8 1             18 ]
// 99 [ 9               1               18 ]


// console.log(isOddPeriod(997));

// isOddPeriod(2);
// isOddPeriod(3);
// isOddPeriod(5);
// isOddPeriod(7);
// isOddPeriod(11);
// isOddPeriod(13);
// isOddPeriod(17);
// isOddPeriod(19);
// isOddPeriod(23);
// isOddPeriod(29);
// isOddPeriod(31);
// isOddPeriod(151);

console.log(count);

//4426 wrong
//433 wrong