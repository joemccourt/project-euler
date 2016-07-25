
var memos = [{},{},{},{},{}];
var numCombos = function(n, barSize) {
    if (n === 0) {
        return 0;
    }

    if (n < barSize) {
        return 1;
    }

    if (n === barSize) {
        return 2;
    }

    if (!memos[barSize][n]) {
        var num = numCombos(n-1, barSize) + numCombos(n - barSize, barSize);
        memos[barSize][n] = num;
    }
    return memos[barSize][n];
};

console.log(numCombos(5, 2)-1, 7);
console.log(numCombos(5, 3)-1, 3);
console.log(numCombos(5, 4)-1, 2);

var A = numCombos(50, 2)-1;
var B = numCombos(50, 3)-1;
var C = numCombos(50, 4)-1;

console.log(A + B + C);

// (5, 4)
// (4, 4) + (1, 4)
// 2

