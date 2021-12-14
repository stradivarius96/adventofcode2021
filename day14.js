console.time('day14')
const fs = require('fs');

let arr = fs.readFileSync('day14-input.txt').toString().split("\n");

// let templates = []
// for (let i = 0; i < arr[0].length-1; i++){
//     templates.push(template[i] + template[i+1])
// }

// console.log(templates)

let pairs = arr.slice(2, arr.length).map(pair => pair.split(" -> "))


// calculate the value of each pair after 10 iterations
let pairsAfter20 = {}
console.log(pairs)
pairs.forEach(pairCalc => {
    let template = pairCalc[0]
    for (let i = 1; i <= 1; i++) {
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
    }
    let frequency = {}
    template.split("").forEach(char => {
        frequency[char] ? frequency[char]++ : frequency[char] = 1
    })
    pairsAfter20[pairCalc[0]] = { "frequency": frequency }
    console.log(`Pair Calc ${pairCalc[0]} Frequency ${JSON.stringify(pairsAfter20[pairCalc[0]])} Template ${template}`)
})

console.log(`Pairs after 20 ${JSON.stringify(pairsAfter20, null, 2)}`)

// calculate template up to 20
let template = arr[0]
console.log(`template ${template}`)
for (let i = 1; i <= 1; i++) {
    pairs.forEach(pair => {
        // console.log(`i = ${i}`)
        // need to loop until no changes because replaceAll wont catch cases where matches overlap like BB against BBB
        let templateRep
        do {
            templateRep = template
            // replace with a lowercase so new letters arent matched by following pairs
            template = template.replaceAll(pair[0], pair[0].substring(0, 1) + pair[1].toLowerCase() + pair[0].substring(1, 2))
        } while (templateRep != template)

    })
    template = template.toUpperCase()
}

let frequency40 = {}
template = template.split("")
console.log(`Template length ${template.length}  ${template.join("")}`)
for (let i = 0; i < template.length - 1; i++) {
    // console.log(`Pairs ${JSON.stringify(pairsAfter20[template[i] + template[i+1]].frequency)}`)

    // combine the calculated frequencies for each pair after 20 steps to create the 40 step frequency total
    frequency40 = Object.entries(pairsAfter20[template[i] + template[i + 1]].frequency).reduce((acc, [key, value]) =>
        // if key is already in map1, add the values, otherwise, create new pair
        ({ ...acc, [key]: (acc[key] || 0) + value })
        , { ...frequency40 });


    // frequency40[char] ? frequency[char]++ : frequency[char] = 1
}

console.log(`Frequency 40 ${JSON.stringify(frequency40)} `)

// template.split("").forEach(char => {
//     frequency[char] ? frequency[char]++ : frequency[char] = 1
// })


let min = Math.min(...Object.values(frequency40))
let max = Math.max(...Object.values(frequency40))
console.log(`Sum of all frequency40 values ${[...Object.values(frequency40)].reduce((a,b) => a + b, 0)}`)
console.log(`Part 2 Answer: ${max - min}`)

console.timeEnd('day14')


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
