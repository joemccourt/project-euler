// Joe McCourt
// 3/19/2014
// Project Euler problem 106	
// Special subset sums: meta-testing

// Let S(A) represent the sum of elements in set A of size n.
// We shall call it a special sum set if for any two non-empty
// disjoint subsets, B and C, the following properties are true:

//     S(B) ≠ S(C); that is, sums of subsets cannot be equal.
//     If B contains more elements than C then S(B) > S(C).

// For this problem we shall assume that a given set contains
// n strictly increasing elements and it already satisfies the second rule.

// Surprisingly, out of the 25 possible subset pairs
// that can be obtained from a set for which n = 4,
// only 1 of these pairs need to be tested for equality (first rule).
// Similarly, when n = 7, only 70 out of the 966 subset pairs need to be tested.

// For n = 12, how many of the 261625 subset pairs
// that can be obtained need to be tested for equality?

// for n = 4, say we have {a,b,c,d} where a < b < c < d
// Don't have to compare any of the 6 set pairs of single elements
// Because of strictly increasing, we also know that:

// a+b != a+c (a == a && b < c)
// a+b != a+d (a == a && b < d)
// a+b != b+c (b == b && b < c)
// a+b != b+d (b == b && b < d)
// a+b != c+d (a < c && b < d)

// a+c != a+d (a == a && c < d)
// a+c != b+d (a < b && c < d)
// a+c != c+d (c == c && c < d)
// a+c != b+c (c == c && a < b)

// b+c != c+d (c == c && b < d)
// b+c != b+d (b == b && c < d)
// b+c ?? a+d

// c+d != a+d (d == d && c < d)

// a+b+c != b+c+d
// a+b+d != b+c+d
// a+c+d != b+c+d

// a+b+c != a+b+d
// a+b+c != a+c+d

// a+c+d != a+b+d