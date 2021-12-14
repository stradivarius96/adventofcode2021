console.time('day14')
const fs = require('fs');

let arr = fs.readFileSync('day14-input.txt').toString().split("\n")

let template = arr[0]
let pairs = arr.slice(2, arr.length).map(pair => pair.split(" -> "))



// This solution doesnt scale, dies at 25 due to the string being too long... rip
// Left so you can see my original solution

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



// Part 2 "scalable" solution. Calc template to 20 and pair character frequencies when they are incremented 20 steps
// combine to get template frequencies after 40 steps


// calculate the value of each pair after 20 iterations
let pairsAfter20 = {}
// console.log(pairs)
pairs.forEach(pairCalc => {
    let template = pairCalc[0]
    for (let i = 1; i <= 20; i++) {
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

    // dont count the last character in frequency or you will get double counts
    frequency[template[template.length - 1]]--
    pairsAfter20[pairCalc[0]] = { "frequency": frequency }
})


// calculate template up to 20
template = arr[0]

for (let i = 1; i <= 20; i++) {
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

let frequency40 = {}
template = template.split("")

for (let i = 0; i < template.length - 1; i++) {

    // combine the calculated frequencies for each pair after 20 steps to create the 40 step frequency total
    frequency40 = Object.entries(pairsAfter20[template[i] + template[i + 1]].frequency).reduce((acc, [key, value]) =>
        // if key is already in map1, add the values, otherwise, create new pair
        ({ ...acc, [key]: (acc[key] || 0) + value })
        , { ...frequency40 });

}
frequency40[template[template.length - 1]]++




min = Math.min(...Object.values(frequency40))
max = Math.max(...Object.values(frequency40))
console.log(`Part 2 Answer: ${max - min}`)

console.timeEnd('day14')