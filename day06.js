console.time('day6')
const fs = require('fs')
let arr = fs.readFileSync('day06-input.txt').toString().split(",")
let _ = require('lodash')

let lanternfish = new Array(9).fill(0)
arr.forEach((fish, idx) => {
    lanternfish[parseInt(fish)]++
})

for (let i = 0; i < 80; i ++){
    lanternfish = nextDay(lanternfish)
}

function nextDay(lanternfish){
    let newLanternfish = _.clone(lanternfish)
    newLanternfish[8] = lanternfish[0]
    newLanternfish[7] = lanternfish[8]
    newLanternfish[6] = lanternfish[7] + lanternfish[0]
    newLanternfish[5] = lanternfish[6]
    newLanternfish[4] = lanternfish[5]
    newLanternfish[3] = lanternfish[4]
    newLanternfish[2] = lanternfish[3]
    newLanternfish[1] = lanternfish[2]
    newLanternfish[0] = lanternfish[1]

    return newLanternfish
}

let part1 = lanternfish.reduce((pv, cv) => pv + cv, 0)
console.log("Part 1 Answer: " + part1)

for (let i = 0; i < 256 - 80; i ++){
    lanternfish = nextDay(lanternfish)
}
let part2 = lanternfish.reduce((pv, cv) => pv + cv, 0)

console.log("Part 2 Answer: " + part2)

console.timeEnd('day6')