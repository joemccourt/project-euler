// The following iterative sequence is defined for the set of positive integers:

// n → n/2 (n is even)
// n → 3n + 1 (n is odd)

// Using the rule above and starting with 13, we generate the following sequence:

// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms.
// Although it has not been proved yet (Collatz Problem),
// it is thought that all starting numbers finish at 1.

// Which starting number, under one million, produces the longest chain?

// NOTE: Once the chain starts the terms are allowed to go above one million.

package main

import (
	"fmt"
)

func getChainLength(chainLength map[uint64]int, n uint64) int {

	v, ok := chainLength[uint64(n)]
	if ok {
		return v
	}

	if n%2 == 0 {
		chainLength[uint64(n)] = 1 + getChainLength(chainLength, uint64(n/2))
	} else {
		chainLength[uint64(n)] = 1 + getChainLength(chainLength, uint64(3*n+1))
	}

	return int(chainLength[uint64(n)])
}

func prob14() {

	chainLength := make(map[uint64]int)

	chainLength[1] = 0

	maxLength := 0
	for i := 1; i < 1000000; i++ {
		length := getChainLength(chainLength, uint64(i))
		if length > maxLength {
			maxLength = length
			fmt.Println(i, length)
		}
	}
}
