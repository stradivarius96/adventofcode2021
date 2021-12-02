const fs = require('fs');
let arr = fs.readFileSync('day1-input.txt').toString().split("\n");
//arrSort = [...arr].map(x=>+x).sort((a,b)=>a-b)
 console.log(arr.length)

// let diff1 = 0
// // set to 1 for device jolt difference
// let diff3 = 1

// // Outlet to first element difference
// arrSort[0] == 1 ? diff1++ : diff3++
let greaterCount = 0
for (let i = 1; i < arr.length; i++){
    
    let diff = arr[i] - arr[i-1] 
    
    if (diff > 0){
        greaterCount++
    }
}
console.log("Part 1 Result: " + greaterCount)


let greaterSlideCount = 0
for (let i = 3; i < arr.length; i++){
    
    // The sliding scale is dumb, the overlapping measurements cancel out
    let diff = arr[i] - arr[i-3]
    
    if (diff > 0){
        greaterSlideCount++
    }
}

console.log("Part 2 Result: " + greaterSlideCount)