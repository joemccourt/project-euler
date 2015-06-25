// 2520 is the smallest number that can be divided by each of the numbers
// from 1 to 10 without any remainder.

// What is the smallest positive number that is evenly divisible
// by all of the numbers from 1 to 20?

package main

import (
	"fmt"
)

//Ugly solution :(
func prob5() {

	num := 1

	for i := 1; i <= 20; i++ {

		if num < i || num%i != 0 {

			factor := i
			compound := 1
			for j := 2; (j*compound) < i && (j*compound) <= 20; j++ {
				if factor%(j*compound) == 0 {
					factor /= j
					compound *= j
					//j = 2
				}
			}

			fmt.Println(num, i, factor)
			num *= factor

		}
	}

	fmt.Println(num)

}
