// redo of day 8, it was lost to the abyss because my gitpod died before committing :(

    console.time('day8')
    const fs = require('fs')
    const _ = require('lodash')

    let arr = fs.readFileSync('day08-input.txt').toString().split("\n").map(row => row.split("|").map(instr => instr.trim().split(" ").map(num => num.split("").sort().join(''))))
    
    // console.log(arr)
    const uniqueVals = [2,3,4,7]
    let uniqueCount = 0
    let displayTotal = 0

    arr.forEach(row =>{
        // Part 1
        row[1].map(num => {
            if (uniqueVals.indexOf(num.length)!= -1){
                uniqueCount++
            }
        })

        // Part 2
        let numMap = {
            1 : row[0].filter(num => num.length == 2)[0],
            4 : row[0].filter(num => num.length == 4)[0],
            7 : row[0].filter(num => num.length == 3)[0],
            8 : row[0].filter(num => num.length == 7)[0],
        }

        // 9 has subset of 4 and is length 6
        numMap[9] = row[0].filter(num => num.length == 6 && isSubset(numMap[4], num))[0]

        // 3 has subset of 7 and is length 5
        numMap[3] = row[0].filter(num => num.length == 5 && isSubset(numMap[7], num))[0]
        
        // 0 has subset of 7 and is length 6 and not 9
        numMap[0] = row[0].filter(num => num.length == 6 && isSubset(numMap[7], num) && num != numMap[9])[0]

        // 6 is length 6 and not 9 or 0
        numMap[6] = row[0].filter(num => num.length == 6 && num != numMap[0] && num != numMap[9])[0]
        
        // 5 is length 5 and subset of 6
        numMap[5] = row[0].filter(num => num.length == 5 && isSubset(num, numMap[6]))[0]

        // 2 is length 5 and not 3 or 5
        numMap[2] = row[0].filter(num => num.length == 5 && num != numMap[3] && num != numMap[5])[0]

        let numMapInv = _.invert(numMap)
        let display = ""
        row[1].forEach((num,idx) => {
            display += numMapInv[num]
        })

        displayTotal += parseInt(display)
    })

    console.log("Part 1 Answer: " + uniqueCount)

    console.log("Part 2 Answer: " + displayTotal)

    function isSubset(valShort, valLong) {
       return valShort.split('').every(val => valLong.split('').includes(val))
    }
    
    console.timeEnd('day8')