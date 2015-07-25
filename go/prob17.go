// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then
// there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

// If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words,
// how many letters would be used?

// NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two)
// contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of
// "and" when writing out numbers is in compliance with British usage.

package main

import (
	"fmt"
)

func numToEnglish(n int) string {

	numToWord := map[int]string{
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		10: "ten",
		11: "eleven",
		12: "twelve",
		13: "thirteen",
		14: "fourteen",
		15: "fifteen",
		16: "sixteen",
		17: "seventeen",
		18: "eighteen",
		19: "nineteen",
		20: "twenty",
		30: "thirty",
		40: "forty",
		50: "fifty",
		60: "sixty",
		70: "seventy",
		80: "eighty",
		90: "ninety",
		100: "hundred",
	}

	if n == 1000 {
		return "onethousand"
	}

	if n == 100 {
		return "onehundred"
	}

	word := ""
	s, exists := numToWord[n]

	if exists {
		return s
	}

	if n >= 100 {
		word = numToWord[n/100] + numToWord[100]
		n = n % 100
		if n > 0 {
			word += "and"
		}
	}

	if n > 20 {
		word += numToWord[10*(n/10)] + numToWord[n % 10]
	} else {
		word += numToWord[n]
	}

	return word
}


func prob17() {

	sum := 0
	for i := 1; i <= 1000; i++ {
		sum += len(numToEnglish(i))
	}
	fmt.Println(sum)
}

