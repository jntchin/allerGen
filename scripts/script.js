//async await
//API call search by category
// this returns an array containing all of the recipe IDs in the category chosen by the user
//2nd API call using the returned IDs as the query parameter to return full recipes for each ID
//  this returns an array of objects, and each object has all the information about the recipe
// create an array based on the allergens checked off by the user
// run a function that checks if any strIngredient keys include the allergens selected by the user
// if so, remove from the array
// display the final array to the user


//don't forget the close button on the final recipe card

const recipeGenApp = {};
const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';


recipeGenApp.categoriesQuery = function(){
    return $.ajax({
        url: `${apiUrlFilterByMainIngredient}c=${userMainIngredient}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: 1,
            
        }
    });
};


recipeGenApp.idQuery = function(){
    return $.ajax({
        url: `${apiUrlReturnRecipesByID}`,
        //write a function that generates these URLs^
        method: 'GET',
        dataType: 'json',
        data: {
            key: 1,
        }
    })
}





//TESTING:
// const allergens = [`peas`, `tomato`];
// const ingredients = "peasfishpeanutscornflourwater";

// const result = ingredients.includes(...allergens);
// console.log(result); //This returns true because it includes at least one of the allergens