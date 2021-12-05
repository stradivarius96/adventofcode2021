const fs = require('fs');
let arr = fs.readFileSync('day4-input.txt').toString().split("\n\n");
const _ = require("lodash");

let numbers = arr[0].split(',').map(item => {
    return parseInt(item)
})
let boards = new Array(arr.length - 1)

arr.forEach((row, idx) => {
    if (idx != 0) {

        boards[idx - 1] = {}
        boards[idx - 1].nums = row.replaceAll('\n', ' ').match(/.{1,3}/g).map(item => {
            return parseInt(item)
        })

        boards[idx - 1].winningNums = []
        for (let i = 0; i <= 4; i++) {
            //rows
            boards[idx - 1].winningNums.push(boards[idx - 1].nums.slice(i * 5, i * 5 + 5))
            //columns
            boards[idx - 1].winningNums.push([boards[idx - 1].nums[i], boards[idx - 1].nums[i + 5], boards[idx - 1].nums[i + 10], boards[idx - 1].nums[i + 15], boards[idx - 1].nums[i + 20]])
        }
    }
})

let highest = 0
let highestScore = 0
let lowest = 100
let lowestScore = 0

boards.forEach((board) => {
    let numbersDrawn = 0
    while (!board.score) {
        board.numbersDrawn = numbersDrawn

        board.winningNums.forEach(winNums => {
            if (winNums.filter(function (item) {
                return numbers.slice(0, numbersDrawn + 1).indexOf(item) != -1
            }).length == 5) {
                board.score = board.nums.filter(function (item) {
                    return numbers.slice(0, numbersDrawn + 1).indexOf(item) === -1
                }).reduce((pv, cv) => pv + cv, 0) * numbers[numbersDrawn]


                if (numbersDrawn < lowest) {
                    lowest = numbersDrawn
                    lowestScore = board.score
                }
                if (numbersDrawn > highest) {
                    highest = numbersDrawn
                    highestScore = board.score
                }
            }
        })
        numbersDrawn++
    }
})

console.log("Part 1 Lowest Score: " + lowestScore)
console.log("Part 2 Highest Score: " + highestScore)

