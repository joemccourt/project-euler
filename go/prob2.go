// Each new term in the Fibonacci sequence is generated
// by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:

// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

// By considering the terms in the Fibonacci sequence
// whose values do not exceed four million, find the sum of the even-valued terms.

package main

import (
	"fmt"
)

func prob2() {

	k1 := 0
	k2 := 1
	sum := 0

	limit := int(4e6)

	for k1 <= limit {
		if k1%2 == 0 {
			sum += k1
		}

		k3 := k1 + k2
		k1 = k2
		k2 = k3
	}

	fmt.Println(sum)

}
