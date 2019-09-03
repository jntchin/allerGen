arr = [[1,2,3],[2,4,5]];
finalArr  = [];


// const lessThan = (a) => {
//     return a < 2;
// }

arr.forEach(function(array){
    console.log(array);
    if((array.some(function(a){
        return a < 2;
    }))) {
        console.log('it is true')

    } else {
        console.log('it is false')
        finalArr.push(array)
    }
})

console.log(finalArr);