// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

// Find the sum of all the primes below two million.

package main

import (
	"fmt"
)

func prob10() {

	limit := uint64(2000000)
	sum := uint64(2)
	for i := uint64(3); i < limit; i += 2 {
		if isPrime(i) {
			sum += i
		}
	}

	fmt.Println(sum)
}
