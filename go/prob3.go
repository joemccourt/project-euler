// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?

package main

import (
	"fmt"
)

func prob3() {

	num := int64(600851475143)

	for i := int64(3); i*i < num; i += 2 {
		if num%i == 0 {
			num /= i
			fmt.Println(i, num)
			i = 3
		}
	}

	fmt.Println(num)
}
