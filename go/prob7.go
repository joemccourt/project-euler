// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
// we can see that the 6th prime is 13.

// What is the 10 001st prime number?

package main

import (
	"fmt"
	"math"
)

func isPrime(n uint64) bool {

	if n == 1 {
		return false
	}

	if n <= 2 {
		return true
	}

	nsqrt := uint64(math.Sqrt(float64(n)))
	for i := uint64(3); i <= nsqrt; i += 2 {
		if n%i == 0 {
			return false
		}
	}

	return true
}

func prob7() {

	value := uint64(3)
	lastPrime := value
	i := 1
	for ; value < 100000000 && i < 10001; value += 2 {
		if isPrime(value) {
			lastPrime = value
			i++
		}
	}

	fmt.Println(lastPrime)

}
