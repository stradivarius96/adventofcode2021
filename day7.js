console.time('day7')
const fs = require('fs')
let _ = require('lodash')

let arr = fs.readFileSync('day7-input.txt').toString().split(",").map(function(item) {return parseInt(item)})

let arrSort = arr.sort((a,b)=> {return a-b})
let median = arrSort[arrSort.length/2]
let mean = Math.floor(arrSort.reduce((pv, cv) => pv + cv, 0)/arrSort.length)

let part1 = arrSort.reduce((pv, cv) => pv + Math.abs(cv - median), 0)

console.log("Part 1 Answer: " + part1)

// Gauss sum formula for fuel betwen two numbers increasing linearly
let part2 = arrSort.reduce((pv, cv) => pv + (Math.abs(cv - mean) * (Math.abs(cv - mean) + 1) / 2)  , 0)

console.log("Part 2 Answer: " + part2)

console.timeEnd('day7')