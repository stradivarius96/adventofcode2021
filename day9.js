console.time('day9')
const fs = require('fs')
let arr = fs.readFileSync('day9-input.txt').toString().split("\n").map(row => row.split("").map(function(item) { return parseInt(item) }))

let localMinimums = []
let basins = []
// for all local minimums, have to scan the entire 2d array :(
arr.forEach((row, yIdx) =>{
    row.forEach((col, xIdx) => {
        // check all 4 neighbors for lower values. stop checking if one is found
        let minimum = true

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
            basins[localMinimums.length-1] = []
            basinSearch(yIdx, xIdx, localMinimums.length-1)
        }
    })
})

// add unique coords and values for basin
// recurse if adjacent value is > current and < 9

function basinSearch (yIdx, xIdx, localMinIdx){
    let coord = yIdx + "-" + xIdx
    if(basins[localMinIdx].indexOf(coord) === -1) {
        basins[localMinIdx].push(coord);
        
        // check x-1
        if (xIdx > 0 && arr[yIdx][xIdx - 1] < 9 && arr[yIdx][xIdx - 1] > arr[yIdx][xIdx])
            basinSearch(yIdx, xIdx - 1, localMinIdx) 

        // check x+1
        if (xIdx < arr[0].length - 1 && arr[yIdx][xIdx + 1] < 9 && arr[yIdx][xIdx + 1] > arr[yIdx][xIdx])
            basinSearch(yIdx, xIdx + 1, localMinIdx) 

        // check y-1
        if (yIdx > 0 && arr[yIdx -1 ][xIdx] < 9 && arr[yIdx - 1][xIdx] > arr[yIdx][xIdx])
            basinSearch(yIdx - 1, xIdx, localMinIdx) 
        
        // check y+1
        if (yIdx < arr.length - 1 && arr[yIdx + 1 ][xIdx] < 9 && arr[yIdx + 1][xIdx] > arr[yIdx][xIdx]){
            basinSearch(yIdx + 1, xIdx, localMinIdx) 
        }
    }
}

console.log("Part 1 Answer: " + localMinimums.reduce((pv, cv) => pv + cv, 0))

// get lengths of each basin's unique coords, sort, and multiply highest 3 values
console.log("Part 2 Answer: " + basins.map(basin => basin.length).sort((a, b) => b - a).slice(0,3).reduce((pv, cv) => pv * cv, 1))

console.timeEnd('day9')