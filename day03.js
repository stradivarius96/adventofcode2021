const fs = require('fs');
let arr = fs.readFileSync('day03-input.txt').toString().split("\n");
const _ = require("lodash");


let totals = new Array(arr[0].length).fill(0)
let gammaArr = new Array(arr[0].length).fill(0)
let epsilonArr = new Array(arr[0].length).fill(0)

let gamma = 0
let epsilon = 0

arr.forEach(row => {
    let cmdArr = row.split("")
    totals = totals.map(function (num, idx) {
        return num + parseInt(cmdArr[idx])
    })
})



gammaArr = gammaArr.map(function (num, idx) {
    return (totals[idx] > arr.length / 2) ? 1 : 0
})
gamma = parseInt(gammaArr.join(''), 2)

epsilonArr = epsilonArr.map(function (num, idx) {
    return (totals[idx] < arr.length / 2) ? 1 : 0
})
epsilon = parseInt(epsilonArr.join(''), 2)

console.log("Part 1 Result: " + gamma * epsilon)

let oxygenRating = 0
let c02Rating = 0
let idx = 0
let totalDigit = 0
let arrReduce = _.cloneDeep(arr)

while (oxygenRating == 0) {
    if (arrReduce.length == 1) {
        oxygenRating = parseInt(arrReduce, 2)
        console.log("Oxygen Rating: " + oxygenRating)
    }
    else {
        totalDigit = 0
        arrReduce.forEach(row => {
            totalDigit += parseInt(row[idx])
        })

        arrReduce = arrReduce.filter(function (row) {
            return (row[idx] == (totalDigit >= arrReduce.length / 2))
        })

        idx++
    }
}

idx = 0
totalDigit = 0
arrReduce = _.cloneDeep(arr)
while (c02Rating == 0) {
    if (arrReduce.length == 1) {
        c02Rating = parseInt(arrReduce[0], 2)
        console.log("C02 Rating: " + c02Rating)
    }
    else {
        totalDigit = 0
        arrReduce.forEach(row => {
            totalDigit += parseInt(row[idx])
        })

        arrReduce = arrReduce.filter(function (row) {
            return (row[idx] == (totalDigit < arrReduce.length / 2))
        })
        idx++
    }
}

console.log("Part 2 Result: " + c02Rating * oxygenRating)