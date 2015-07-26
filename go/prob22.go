// Using names.txt (right click and 'Save Link/Target As...'),
// a 46K text file containing over five-thousand first names,
// begin by sorting it into alphabetical order.
// Then working out the alphabetical value for each name,
// multiply this value by its alphabetical position in the list to obtain a name score.

// For example, when the list is sorted into alphabetical order, COLIN,
// which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list.
// So, COLIN would obtain a score of 938 × 53 = 49714.

// What is the total of all the name scores in the file?

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
)

func nameScore(s string) int {
	score := 0
	for i := 0; i < len(s); i++ {
		score += int(s[i]) - 64
	}
	return score
}

type ByAlpha []string

func (a ByAlpha) Len() int           { return len(a) }
func (a ByAlpha) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByAlpha) Less(i, j int) bool { return a[i] < a[j] }

func prob22() {

	b, err := ioutil.ReadFile("../names.txt")
	if err != nil {
		panic(err)
	}

	dec := json.NewDecoder(bytes.NewReader(b))
	var names []string
	dec.Decode(&names)

	sort.Sort(ByAlpha(names))

	sum := 0
	for i, name := range names {
		sum += (i + 1) * nameScore(name)
	}

	fmt.Println(sum)
}
