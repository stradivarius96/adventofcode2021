const fs = require('fs');
let arr = fs.readFileSync('day2-input.txt').toString().split("\n");
const _ = require("lodash");


let instructions = []
let depth = 0
let horizontalPosition = 0

arr.forEach(row => {
    let cmdArr = row.split(" ")
    cmdArr[1] = parseInt(cmdArr[1])
    instructions.push(cmdArr)
})

for (let i = 0; i < arr.length; i++){
    
    if (instructions[i][0] == "forward"){
        horizontalPosition += instructions[i][1]
    }
    else if (instructions[i][0] == "up"){
        depth -= instructions[i][1]
    }
    else if (instructions[i][0] == "down"){
        depth += instructions[i][1]
    }
}

console.log("Part 1 Result: " + depth * horizontalPosition)

depth = 0
horizontalPosition = 0
let aim = 0

for (let i = 0; i < arr.length; i++){
    
    if (instructions[i][0] == "forward"){
        horizontalPosition += instructions[i][1]
        depth += instructions[i][1] * aim
    }
    else if (instructions[i][0] == "up"){
        aim -= instructions[i][1]
    }
    else if (instructions[i][0] == "down"){
        aim += instructions[i][1]
    }
}

console.log("Part 2 Result: " + depth * horizontalPosition)