console.time('day11')
const fs = require('fs')
let arr = fs.readFileSync('day11-input.txt').toString().split("\n").map(row => row.split("").map(function (item) { return parseInt(item) }))

let flashes = 0

for (let i = 1; i <= 300; i++) {
    let flashStart = flashes
    arr.forEach((row, yIdx) => {
        row.forEach((col, xIdx) => {
            if (arr[yIdx][xIdx] == 10) {
                flash(yIdx, xIdx)
            }
            else {
                arr[yIdx][xIdx]++
                if (arr[yIdx][xIdx] == 10) {
                    flash(yIdx, xIdx)
                }
            }

        })
    })

    //reset any value higher than 10 to 0 at end of step
    arr = arr.map(row => row.map(num => { if (num >= 10) { return 0 } else { return num } }))

    // part 1 answer after 100 steps
    if (i == 100) {
        console.log("Part 1 Answer: " + flashes)
    }

    // continue looping until we hit all flashing in same step
    if (flashes - flashStart == arr.length * arr[0].length) {
        console.log("Part 2 Answer: " + i)
        break
    }
}


function flash(row, col) {
    // only increment on exactly 10 to prevent double counting
    if (arr[row][col] == 10) {
        flashes++
    }
    arr[row][col]++

    // increment and check all adjacent octopodes
    // col-1
    if (col > 0) {
        if (arr[row][col - 1] == 10) {
            flash(row, col - 1)
        }
        else {
            arr[row][col - 1]++
            if (arr[row][col - 1] == 10) {
                flash(row, col - 1)
            }
        }

        // col-1 row-1
        if (row > 0) {
            if (arr[row - 1][col - 1] == 10) {
                flash(row - 1, col - 1)
            }
            else {
                arr[row - 1][col - 1]++
                if (arr[row - 1][col - 1] == 10) {
                    flash(row - 1, col - 1)
                }
            }
        }

        // col-1 row+1
        if (row < arr.length - 1) {
            if (arr[row + 1][col - 1] == 10) {
                flash(row + 1, col - 1)
            }
            else {
                arr[row + 1][col - 1]++
                if (arr[row + 1][col - 1] == 10) {
                    flash(row + 1, col - 1)
                }
            }
        }
    }

    // col+1
    if (col < arr[0].length - 1) {
        if (arr[row][col + 1] == 10) {
            flash(row, col + 1)
        }
        else {
            arr[row][col + 1]++
            if (arr[row][col + 1] == 10) {
                flash(row, col + 1)
            }
        }

        // col+1 row-1
        if (row > 0) {
            if (arr[row - 1][col + 1] == 10) {
                flash(row - 1, col + 1)
            }
            else {
                arr[row - 1][col + 1]++
                if (arr[row - 1][col + 1] == 10) {
                    flash(row - 1, col + 1)
                }
            }
        }

        // col+1 row+1
        if (row < arr.length - 1) {
            if (arr[row + 1][col + 1] == 10) {
                flash(row + 1, col + 1)
            }
            else {
                arr[row + 1][col + 1]++
                if (arr[row + 1][col + 1] == 10) {
                    flash(row + 1, col + 1)
                }
            }
        }
    }


    // check row-1
    if (row > 0) {
        if (arr[row - 1][col] == 10) {
            flash(row - 1, col)
        }
        else {
            arr[row - 1][col]++
            if (arr[row - 1][col] == 10) {
                flash(row - 1, col)
            }
        }
    }

    // check row+1
    if (row < arr.length - 1) {
        if (arr[row + 1][col] == 10) {
            flash(row + 1, col)
        }
        else {
            arr[row + 1][col]++
            if (arr[row + 1][col] == 10) {
                flash(row + 1, col)
            }
        }
    }
}

console.timeEnd('day11')