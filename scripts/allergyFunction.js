// take user returned data from checkboxes and put them in an Array .userAllergen
// 
// 
// take .requests

const testObject = {
    strIng1: 'parseFloat',
    strIng2: 'tomato',
    strIng3: 'ScopedCredential',
    strIng4: 'peanut'
}

const ingredientArray = [];

const stringify = () => {

for(i=0;i<4;i++){
    ingredientArray.push(testObject[`strIng${i+1}`]);
    }
}



stringify();

console.log(ingredientArray);