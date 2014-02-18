// Joe McCourt
// Feb 17th, 2014
// Project Euler problem 185
// Number Mind

// The game Number Mind is a variant of the well known game Master Mind.

// Instead of coloured pegs, you have to guess a secret sequence of digits.
// After each guess you're only told in how many places you've guessed
// the correct digit. So, if the sequence was 1234 and you guessed 2036,
// you'd be told that you have one correct digit;
// however, you would NOT be told that you also have another digit in the wrong place.

// For instance, given the following guesses for a 5-digit secret sequence,

// 90342 ;2 correct
// 70794 ;0 correct
// 39458 ;2 correct
// 34109 ;1 correct
// 51545 ;2 correct
// 12531 ;1 correct

// The correct sequence 39542 is unique.

// How can I solve this strictly logically?

// answer is not 70794,
// In 90342, exactly two of 9x342 is correct
// If 3 is correct first digit:

// FF342 ;2 correct
// FFFFF ;0 correct
// T9458 ;1 correct
// TFFFF ;0 correct
// F1545 ;2 correct
// F2531 ;1 correct

// Else

// 9F342 ;2 correct
// FFFFF ;0 correct
// F9458 ;2 correct
// F4109 ;1 correct
// 51545 ;2 correct
// 12531 ;1 correct

// from 39458 and 34109, one or two of x9458 is correct
// one or two of 51x45 is correct

Digit possible values
0 9(2/5), 7(0), 3(2/5, 1/5), 5(2/5), 1(1/5)
1 0(2/5,0), 9(2/5), 4(1/5), 1(2/5), 2(1/5)
2 3(2/5), 7(0), 4(2/5), 1(1/5), 5(2/5, 1/5)
3 4(2/5,2/5), 9(0), 5(2/5), 0(1/5), 3(1/5)
4 2(2/5), 4(0), 8(2/5), 9(2/4), 5(2/5), 1(1/5)

0 9(2/5), 3(2/5, 1/5), 5(2/5), 1(1/5)
1 9(2/5), 4(1/5), 1(2/5), 2(1/5)
2 3(2/5), 4(2/5), 1(1/5), 5(2/5, 1/5)
3 4(2/5,2/5), 5(2/5), 0(1/5), 3(1/5)
4 2(2/5), 8(2/5), 9(2/5), 5(2/5), 1(1/5)


// Truth table
// 9F342 ;2 correct
// FFFFF ;0 correct
// 39458 ;2 correct
// 34109 ;1 correct
// 51545 ;2 correct
// 12531 ;1 correct

// 39458 ;2 correct
// 34109 ;1 correct
// 70794 ;0 correct
// 90342 ;2 correct
// 51545 ;2 correct
// 12531 ;1 correct

// Based on the following guesses,

// 5616185650518293 ;2 correct
// 3847439647293047 ;1 correct
// 5855462940810587 ;3 correct
// 9742855507068353 ;3 correct
// 4296849643607543 ;3 correct
// 3174248439465858 ;1 correct
// 4513559094146117 ;2 correct
// 7890971548908067 ;3 correct
// 8157356344118483 ;1 correct
// 2615250744386899 ;2 correct
// 8690095851526254 ;3 correct
// 6375711915077050 ;1 correct
// 6913859173121360 ;1 correct
// 6442889055042768 ;2 correct
// 2321386104303845 ;0 correct
// 2326509471271448 ;2 correct
// 5251583379644322 ;2 correct
// 1748270476758276 ;3 correct
// 4895722652190306 ;1 correct
// 3041631117224635 ;3 correct
// 1841236454324589 ;3 correct
// 2659862637316867 ;2 correct

// Find the unique 16-digit secret sequence.
