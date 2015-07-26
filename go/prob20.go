
// n! means n × (n − 1) × ... × 3 × 2 × 1

// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

// Find the sum of the digits in the number 100!

package main

import (
	"fmt"
)

func prob20() {
	var nFact BigNumber
	nFact = nFact.Set(1)

	for i := 1; i <= 100; i++ {
		nFact = nFact.BigMul(i)
	}

	fmt.Println(nFact.BigCountDSum())
}