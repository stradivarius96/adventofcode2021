console.time('day13')
const fs = require('fs')
let arr = fs.readFileSync('day13-input.txt').toString().split("\n").map(connection => connection.split(",").map(coord => parseInt(coord)))
let folds = fs.readFileSync('day13-input2.txt').toString().split("\n").map(connection => connection.split(" ")[2].split("=").map(instr => instr == "x" || instr == "y" ? instr : parseInt(instr)) )

console.log(arr)
console.log(folds)


fold(folds[0])

function fold(instruction){
    if (instruction[0] == "x"){
        arr.forEach(coord =>{
                coord[0] = instruction[1] - Math.abs(instruction[1] - coord[0])
        })
    }
    else{
        arr.forEach(coord =>{
                coord[1] = instruction[1] - Math.abs(instruction[1] - coord[1])
        })
    }
    // remove duplicates
    arr = Array.from(new Set(arr.map(JSON.stringify)), JSON.parse)
}

console.log(`Part 1 Answer:  ${arr.length}`)

for (let i = 1; i < folds.length; i++){
    fold(folds[i])
}

let xMax = arr.reduce((mv, cv) => cv[0] > mv ? cv[0] : mv, 0) + 1
let yMax = arr.reduce((mv, cv) => cv[1] > mv ? cv[1] : mv, 0) + 1

let output = new Array(yMax).fill([]).map(row => new Array(xMax).fill(" "))

arr.forEach(coord =>{
    output[coord[1]][coord[0]] = "#"
})


console.log("Part 2 Answer: ")
console.log(output.map(row => row.toString().replaceAll(",","")))


console.timeEnd('day13')