// The sum of the squares of the first ten natural numbers is,

// 1^2 + 2^2 + ... + 10^2 = 385
// The square of the sum of the first ten natural numbers is,

// (1 + 2 + ... + 10)^2 = 55^2 = 3025
// Hence the difference between the sum of the squares
// of the first ten natural numbers and the square of the sum
// is 3025 − 385 = 2640.

// Find the difference between the sum of the squares of the first
// one hundred natural numbers and the square of the sum.

package main

import (
	"fmt"
)

func prob6() {

	sumOfSquares, sum := 0, 0

	for i := 1; i <= 100; i++ {
		sum += i
		sumOfSquares += i * i
	}

	fmt.Println(sum*sum - sumOfSquares)
}
