// take user returned data from checkboxes and put them in an Array .userAllergen
//go through the returned recipe array and do stuff to each recipe
// 1. Stringify the ingredients
// Go through the array of user-generated allergens
// For each allergen, run .includes on the stringified ingredient lists (to see whether it exists in the ingredient lists)
// 
// 
// take .requests
const recipeGenApp = {};

recipeGenApp.recipesArray = [

    {
    strIng1: 'french fries',
    strIng2: 'tomato',
    strIng3: 'mayonnaise',
    strIng4: 'peanuts'
    },

    {
    strIng1: 'cinnamon',
    strIng2: 'potato',
    strIng3: 'shoes',
    strIng4: 'salt'
    },

    {
    strIng1: 'herring',
    strIng2: 'tomato',
    strIng3: 'seaweed',
    strIng4: 'sunglasses'
    }

]
recipeGenApp.ingredientArray = [];
const testAllergies = ['peanuts','tomato'];
recipeGenApp.finalRecipes = [];

recipeGenApp.stringify = function(result) {

    for(i=0;i<4;i++){
        recipeGenApp.ingredientArray.push(result[`strIng${i+1}`]);
    }

    console.log('ingredients only',recipeGenApp.ingredientArray);

    //try putting 

    // recipeGenApp.ingredientString = recipeGenApp.ingredientArray.join();
    // console.log(this);;
    // console.log(recipeGenApp.ingredientArray.join())


    // console.log('test allergies',testAllergies);
    //check function

    // console.log(recipeGenApp.ingredientString.includes(...testAllergies));
    // console.log('peanutsjameggswatermelon'.includes('peanuts','tuna'));
    // console.log(recipeGenApp.ingredientString);

    console.log(testAllergies);
    if(recipeGenApp.ingredientArray.includes(testAllergies) == false) {
        console.log(`it worked`);
        recipeGenApp.finalRecipes.push(...recipeGenApp.ingredientArray);
    }

    console.log('final recipes',recipeGenApp.finalRecipes);
    
    recipeGenApp.ingredientArray.length = 0;

    // console.log('ingredient array',recipeGenApp.ingredientArray)

}

recipeGenApp.recipesArray.map(function(res){
    // return res;
    console.log('individual recipe object',res);
    recipeGenApp.stringify(res);

})



const userMainIngredient = `seafood`;
recipeGenApp.userMainIngredient = $('option:selected').attr('value');

recipeGenApp.userAllergen = $('checkbox:checked').attr

recipeGenApp.categoriesQueryResult = "";
recipeGenApp.extractIDs = [];

const finalRecipes = [];

// //IGNORE ME
// recipeGenApp.jessTest = function(){
//         $.ajax({
//             url: `${apiUrlFilterByMainIngredient}?c=${recipeGenApp.userMainIngredient}`,
//             method: 'GET',
//             dataType: 'json',
//             data: {
//                 key: 1
//             },
//         }).then(res => {
//             let idArr = res.meals.map(meal => meal.idMeal);
//             console.log(idArr)
//             idArr.forEach(el =>{
//                 index = el;
//                 console.log(index);
//                 return  $.ajax({
//                     url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`,
//                         method: 'GET',
//                         datatype: "json",
//                         data: {
//                             key: 1
//                             }
//                 }).then(res => {
//                     const instructionsArr = res.meals.map(recipe => recipe.strInstructions)
//                 }
// // }

