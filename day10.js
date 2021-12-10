console.time('day10')
const fs = require('fs')
let arr = fs.readFileSync('day10-input.txt').toString().split("\n")

let errorTotal = 0
let autoScores = []
const errorValues = { ']': 57, '}': 1197, '>': 25137, ')': 3 }
const autoValues = { '[': 2, '{': 3, '<': 4, '(': 1 }
const opens = ['[', '{', '<', '(']
const closes = [']', '}', '>', ')']

// iterate through each element checking for the first invalid character by pushing opens onto stack and comparing top to closes
arr.forEach((row, rowIdx) => {
    let stack = []
    let error = ""
    row.split('').forEach((col, idx) => {
        if (error == "") {
            // if open, push onto stack
            if (opens.indexOf(col) != -1) {
                stack.push(col)
            }
            // if close, pop from stack if match, error if not
            else if (stack.length > 0 && opens.indexOf(stack[stack.length - 1]) == closes.indexOf(col)) {
                stack.pop()
            }
            // close with empty stack or non matching close is an error        
            else {
                error = col
                errorTotal += errorValues[col]
            }

        }
    })

    // if not an error row, use stack to determine autocomplete and value for row
    if (error == "") {
        let autoScore = 0
        stack.reverse().forEach((col) => {
            autoScore = autoScore * 5 + autoValues[col]
        })
        autoScores.push(autoScore)
    }
})

console.log("Part 1 Answer: " + errorTotal)

console.log("Part 2 Answer: " + autoScores.sort((a, b) => a - b)[(autoScores.length - 1) / 2])

console.timeEnd('day10')