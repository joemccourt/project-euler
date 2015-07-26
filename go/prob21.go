// Let d(n) be defined as the sum of proper divisors of n
// (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair
// and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110;
// therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under 10000.

package main

import (
	"fmt"
	"math"
)

func dOfN(n int) int {
	d := 1
	max := int(math.Sqrt(float64(n)))
	for i := 2; i < max; i++ {
		if n % i == 0 {
			d += i + n/i
		}
	}

	return d
}

func prob21() {
	
	a := map[int]bool{}
	sum := 0
	for i := 2; i < 10000; i++ {
		_, exists := a[i]
		if exists {
			continue
		}

		d := dOfN(i)
		if d != i && dOfN(d) == i {
			a[d] = true
			a[i] = true
			sum += d + i
		}
	}
	fmt.Println(sum)
}
