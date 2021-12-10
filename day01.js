const fs = require('fs');
let arr = fs.readFileSync('day01-input.txt').toString().split("\n");

let greaterCount = 0
for (let i = 1; i < arr.length; i++) {

    let diff = arr[i] - arr[i - 1]

    if (diff > 0) {
        greaterCount++
    }
}
console.log("Part 1 Result: " + greaterCount)


let greaterSlideCount = 0
for (let i = 3; i < arr.length; i++) {

    // The sliding scale is dumb, the overlapping measurements cancel out
    let diff = arr[i] - arr[i - 3]

    if (diff > 0) {
        greaterSlideCount++
    }
}

console.log("Part 2 Result: " + greaterSlideCount)