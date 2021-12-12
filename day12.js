console.time('day12')
const fs = require('fs')
let arr = fs.readFileSync('day12-input.txt').toString().split("\n").map(connection => connection.split("-"))

let paths = []

nextStep(["start"],"start")

function nextStep(path, current){
    if (current == "end"){
        paths.push(path)
    }
    else{
        arr.forEach(connection => {
            if (connection[0] == current){
                // check that connection has not been used or is a large cave (uppercase)
                if (path.indexOf(connection[1]) == -1 || connection[1].toUpperCase() == connection[1]){
                    let pathClone = [...path]
                    pathClone.push(connection[1])
                    nextStep(pathClone, connection[1])
                }
            }

            if (connection[1] == current){
                // check that connection has not been used or is a large cave (uppercase)
                if (path.indexOf(connection[0]) == -1 || connection[0].toUpperCase() == connection[0]){
                    let pathClone = [...path]
                    pathClone.push(connection[0])
                    nextStep(pathClone, connection[0])
                }
            }
        })
    }
}


console.log("Part 1 Answer: " + paths.length)

let paths2 = []

nextStep2(["start"],"start", false)

function nextStep2(path, current, smallTwice){
    if (current == "end"){
        paths2.push(path)
    }
    else{
        arr.forEach(connection => {
            if (connection[0] == current){
                let smallTwice0 = smallTwice
                // check that connection has not been used twice is a large cave (uppercase)
                if (connection[1] != "start" && (path.indexOf(connection[1]) == -1 || connection[1].toUpperCase() == connection[1] || !smallTwice) ){
                    if (!(path.indexOf(connection[1]) == -1) && !(connection[1].toUpperCase() == connection[1])){
                        smallTwice0 = true
                    }
                    let pathClone = [...path]
                    pathClone.push(connection[1])
                    nextStep2(pathClone, connection[1], smallTwice0)
                }
            }

            if (connection[1] == current){
                let smallTwice1 = smallTwice
                // check that connection has not been used twice is a large cave (uppercase)
                if (connection[0] != "start" && (path.indexOf(connection[0]) == -1 || connection[0].toUpperCase() == connection[0] || !smallTwice )){        
                    if (!(path.indexOf(connection[0]) == -1) && !(connection[0].toUpperCase() == connection[0])){
                        smallTwice1 = true
                    }
                    let pathClone = [...path]
                    pathClone.push(connection[0])
                    nextStep2(pathClone, connection[0], smallTwice1)
                }
            }
        })
    }
}
console.log("Part 2 Answer: "+ paths2.length)


console.timeEnd('day12')