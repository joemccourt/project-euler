// A palindromic number reads the same both ways.
// The largest palindrome made from the product of
// two 2-digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3-digit numbers.

package main

import (
	"fmt"
)

//Does not handle negative numbers
func decomposeBase10(num int64) []int {

	numDigits := 1
	i := int64(10)

	for i <= num {
		numDigits++
		i *= 10
	}

	decomp := make([]int, numDigits)

	i = int64(numDigits - 1)
	for num >= 10 {
		lower := num / 10
		decomp[i] = int(num - lower*10)
		num = lower
		i--
	}

	decomp[0] = int(num)

	return decomp
}

func isPalindrome(num []int) bool {

	for i := 0; i < len(num)/2; i++ {
		if num[i] != num[len(num)-i-1] {
			return false
		}
	}

	return true
}

func prob4() {

	//brute force
	max := int64(0)
	for x1 := 100; x1 <= 1000; x1++ {
		for x2 := x1; x2 <= 1000; x2++ {
			num := int64(x1 * x2)

			if num > max {
				if isPalindrome(decomposeBase10(num)) {
					//fmt.Println(x1, x2, num)
					max = num
				}
			}
		}
	}

	fmt.Println(max)
}
