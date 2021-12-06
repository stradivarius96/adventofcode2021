const fs = require('fs')
const { map } = require('lodash')
let arr = fs.readFileSync('day5-input.txt').toString().split("\n")
const _ = require("lodash")

let points = []
for (let i = 0; i < 1000; i++){
    points.push(new Array(1000).fill(0))
}

let pointsDiag = []
for (let i = 0; i < 1000; i++){
    pointsDiag.push(new Array(1000).fill(0))
}

arr.forEach((row, idx) => {
    let x1 = parseInt(row.split(',')[0])
    let y1 = parseInt(row.split(',')[1].split("->")[0])
    let x2 = parseInt(row.split('->')[1].split(',')[0])
    let y2 = parseInt(row.split(',')[2])
 
    if (x1 == x2){
        for (let i = y1; i != y2; i = i - (y1-y2)/Math.abs(y1-y2)){
                points[x1][i]++ 
                pointsDiag[x1][i]++ 
                           
        }
        points[x2][y2]++
        pointsDiag[x2][y2]++
    }
    else if (y1 == y2){
        for (let i = x1; i != x2; i = i - (x1-x2)/Math.abs(x1-x2)){
            points[i][y1]++
            pointsDiag[i][y1]++
        }
        points[x2][y2]++
        pointsDiag[x2][y2]++
    }
    else {
        let j = y1;
        for (let i = x1; i != x2; i = i - (x1-x2)/Math.abs(x1-x2)){          
            pointsDiag[i][j]++
            j = j - (y1-y2)/Math.abs(y1-y2)
        }
        pointsDiag[x2][y2]++
    }
})

let part1 = 0
let part2 = 0
points.forEach(row =>{
    row.forEach(point =>{
        if (point >= 2){
            part1++
        }
    })
})

pointsDiag.forEach(row =>{
    row.forEach(point =>{
        if (point >= 2){
            part2++
        }
    })
})

console.log("Part 1 Answer: " + part1)

console.log("Part 2 Answer: " + part2)