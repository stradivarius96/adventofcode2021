console.time('day14')
const fs = require('fs');

let arr = fs.readFileSync('day14-input.txt').toString().split("\n");

let template = arr[0]
// console.log(template)

let pairs = arr.slice(2, arr.length).map(pair => pair.split(" -> "))
// console.log(arr)

// This solution doesnt scale, dies at 25 due to the string being too long... rip
for (let i = 1; i <= 10; i++) {
    // console.log(`i = ${i}`)
    pairs.forEach(pair => {
        // need to loop until no changes because replaceAll wont catch cases where matches overlap like BB against BBB
        let templateRep
        do {
            templateRep = template
            // replace with a lowercase so new letters arent matched by following pairs
            template = template.replaceAll(pair[0], pair[0].substring(0, 1) + pair[1].toLowerCase() + pair[0].substring(1, 2))
        } while (templateRep != template)
    })
    template = template.toUpperCase()
    // console.log(`Step ${i} template: ${template}`)

}

 let frequency = {}

template.split("").forEach(char => {
    frequency[char] ? frequency[char]++ : frequency[char] = 1
})


let min = Math.min(...Object.values(frequency))
let max = Math.max(...Object.values(frequency))
console.log(`Part 1 Answer: ${max - min}`)




    // let frequency = {}

    // template.split("").forEach(char => {
    //     frequency[char] ? frequency[char]++ : frequency[char] = 1
    // })
    //    let min = Math.min(...Object.values(frequency))
    // let max = Math.max(...Object.values(frequency))
    // console.log(`Part 2 Answer: ${max - min}`)


// console.log(arr)
// let numbers = arr[0].split(',').map(item => {
//     return parseInt(item)
// })
