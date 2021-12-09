console.time('day9')
const fs = require('fs')
let arr = fs.readFileSync('day9-input.txt').toString().split("\n").map(row => row.split("").map(function(item) { return parseInt(item) }))



//  console.log(arr)

let localMinimums = []
let basins = []
// for all local minimums, have to scan the entire 2d array :(
arr.forEach((row, yIdx) =>{
    row.forEach((col, xIdx) => {
        // check all 4 neighbors for lower values. stop checking if one is found
        let minimum = true
        // console.log("Value: " + col + " coord:" + yIdx + "," + xIdx)
        // check x-1
        if (xIdx > 0)
            minimum = (arr[yIdx][xIdx - 1] > col)

        // check x+1
        if (xIdx < row.length - 1 && minimum)
            minimum = (arr[yIdx][xIdx + 1] > col)

        // check y-1
        if (yIdx > 0 && minimum)
            minimum = (arr[yIdx - 1][xIdx] > col)
        
        // check y+1
        if (yIdx < arr.length - 1 && minimum){
            minimum = (arr[yIdx + 1][xIdx] > col)
        }

        if (minimum){
            //  console.log("Local minimum found: " + col + " coord:" + yIdx + "," + xIdx)
            localMinimums.push(col+1)

            // start basin calc at local minimum
            
            basins.push([])
            console.log(basins)
            basinSearch(yIdx, xIdx, basins.length-1)
        }
    })
})

// add unique coords and values for basin
// recurse if adjacent value is > current and < 9

const basinSearch = function(yIdx, xIdx, localMinIdx){
    let coord = yIdx + "," + xIdx
    if(basin[localMinIdx].indexOf(coord) === -1) {
        basin[localMinIdx].push(coord);
        console.log(coord);
    }
}

console.log("Part 1 Answer: " + localMinimums.reduce((pv, cv) => pv + cv, 0))


// console.log("Part 2 Answer: " + part2)

console.timeEnd('day8')