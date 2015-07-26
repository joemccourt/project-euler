// 215 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2^1000?

// 0 0 0 0 0 0 1 1
// 0 0 0 0 0 0 2 2
// 0 0 0 0 0 0 4 4
// 0 0 0 0 0 0 8 8
// 0 0 0 0 0 1 6 7
// 0 0 0 0 0 3 2 5
// 0 0 0 0 0 6 4 10
// 0 0 0 0 1 2 8 11
// 0 0 0 0 2 5 6 13
// 0 0 0 0 5 1 2 8
// 0 0 0 1 0 2 4 7
// 0 0 0 2 0 4 8 14
// 0 0 0 4 0 9 6 19
// 0 0 0 8 1 9 2 20

// No obvious pattern other than ones col
// Brute force

package main

import (
	"fmt"
)

type BigNumber []uint8

func (b BigNumber) Set(value int) BigNumber {
	newB := make(BigNumber, 1)
	newB[0] = 1

	return newB.BigMul(value)
}

func (b BigNumber) BigExtend(atLeast int) BigNumber {
	newB := make(BigNumber, 2*atLeast)
	copy(newB, b)
	return newB
}

func (b BigNumber) BigMul(g int) BigNumber {
	c := 0
	for i := 0; i < len(b); i++ {
		d := g*int(b[i]) + c
		c = 0

		for d >= 10 {
			c = d / 10
			d = d % 10
		}

		b[i] = uint8(d)

		if c > 0 && i+1 == len(b) {
			b = b.BigExtend(1 + len(b))
		}
	}
	return b
}

func (b BigNumber) BigMullN(base int, pow int) BigNumber {
	for i := 0; i < pow; i++ {
		b = b.BigMul(base)
	}
	return b
}

func (b BigNumber) BigCountDSum() int {
	sum := 0
	for i := 0; i < len(b); i++ {
		sum += int(b[i])
	}
	return sum
}

func prob16() {
	var bigOne BigNumber
	bigOne = bigOne.Set(1)

	r := bigOne.BigMullN(2, 1000)

	fmt.Println(r.BigCountDSum())
}
