// A permutation is an ordered arrangement of objects.
// For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4.
// If all of the permutations are listed numerically or alphabetically, we call it lexicographic order.
// The lexicographic permutations of 0, 1 and 2 are:

// 012   021   102   120   201   210

// What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

package main

import (
	"fmt"
	"sort"
)

// func int2digits(n int64) []int {
// 	var digits []int
// 	for n >= int64(10) {
// 		digits = append(digits, int(n%10))
// 		n /= int64(10)
// 	}
// 	digits = append(digits, int(n))
// 	return digits
// }

// func isPerm10(n int64) bool {
// 	digits := int2digits(n)
// 	hasDigit := make([]bool, 10)
// 	if len(digits) == 9 {
// 		hasDigit[0] = true
// 	} else if len(digits) != 10 {
// 		return false
// 	}

// 	for _, d := range digits {
// 		if hasDigit[d] {
// 			return false
// 		}
// 		hasDigit[d] = true
// 	}

// 	return true
// }

func digits2int(digits []int) int64 {
	num := int64(0)
	for _, i := range digits {
		num *= int64(10)
		num += int64(i)
	}
	return num
}

func genPermsHelper(baseSet []int, sets [][]int, nodeStart0 int) [][]int {
	sets = append(sets, baseSet)
	if nodeStart0+1 == len(baseSet) {
		return sets
	}

	for nodeStart := nodeStart0; nodeStart < len(baseSet)+1; nodeStart++ {
		for i := nodeStart + 1; i < len(baseSet); i++ {
			newSet := make([]int, len(baseSet))
			copy(newSet, baseSet)
			newSet[nodeStart], newSet[i] = baseSet[i], baseSet[nodeStart]
			sets = append(sets, genPermsHelper(newSet, make([][]int, 0), nodeStart+1)...)
		}
	}
	return sets
}

func genPerms(baseSet []int) [][]int {
	return genPermsHelper(baseSet, make([][]int, 0), 0)
}

type int64arr []int64

func (a int64arr) Len() int           { return len(a) }
func (a int64arr) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a int64arr) Less(i, j int) bool { return a[i] < a[j] }

func prob24() {

	perms := genPerms([]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
	permNums := make([]int64, len(perms))

	for i, p := range perms {
		permNums[i] = digits2int(p)
	}
	sort.Sort(int64arr(permNums))
	fmt.Println(permNums[1e6-1])
}
