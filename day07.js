console.time('day07')
const fs = require('fs')
let _ = require('lodash')

let arr = fs.readFileSync('day7-input.txt').toString().split(",").map(function(item) {return parseInt(item)})

let arrSort = arr.sort((a,b)=> {return a-b})
let median = arrSort[arrSort.length/2]

let part1 = arrSort.reduce((pv, cv) => pv + Math.abs(cv - median), 0)

console.log("Part 1 Answer: " + part1)

// Mean probably isnt an integer, check floor and ceiling results
let meanCeil = Math.ceil(arrSort.reduce((pv, cv) => pv + cv, 0)/arrSort.length)
let meanFloor = Math.floor(arrSort.reduce((pv, cv) => pv + cv, 0)/arrSort.length)

// Gauss sum formula for fuel betwen two numbers increasing linearly
let part2Ceil = arrSort.reduce((pv, cv) => pv + (Math.abs(cv - meanCeil) * (Math.abs(cv - meanCeil) + 1) / 2)  , 0)
let part2Floor = arrSort.reduce((pv, cv) => pv + (Math.abs(cv - meanFloor) * (Math.abs(cv - meanFloor) + 1) / 2)  , 0)

let part2 = part2Ceil > part2Floor ? part2Floor : part2Ceil
console.log("Part 2 Answer: " + part2)

console.timeEnd('day7')