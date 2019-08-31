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

const userMainIngredient = `seafood`;
recipeGenApp.userMainIngredient = $('option:selected').attr('value');

// allergenArr = [];
// if value === milk 
// allergenArray.push(...)

recipeGenApp.userAllergen = $('checkbox:checked').attr

recipeGenApp.categoriesQueryResult = "";
recipeGenApp.extractIDs = [];
// recipeGenApp.requests = [];

//MAIN FUNCTION:
recipeGenApp.categoriesQuery = function(){
    $.ajax({
        url: `${apiUrlFilterByMainIngredient}?c=${userMainIngredient}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: 1
        }
    }) .then(function(result){
        let idArr = recipeGenApp.extractIDs = (result.meals).map( res =>  {
            return (res.idMeal);
          });
          console.log(idArr);  
    }); 

    updateArray = (data) => {
        recipeGenApp.extractIDs.push(data);
    }
    console.log(recipeGenApp.extractIDs);

    $.when(recipeGenApp.extractIDs).then(console.log(recipeGenApp.extractIDs));
    
    // .then(() => {
        // recipeGenApp.requests = (recipeGenApp.extractIDs).map(function(id){
        // // console.log(id);
        // return $.ajax({
        //     url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        //     method: 'GET',
        //     datatype: "json",
        //     data: {
        //         key: 1
        //         }
        //     });
        // }); 
    // }) .then(function(){
    //     console.log(recipeGenApp.requests);
    // })
    // }
};


//BUTTON

$('form').on('submit', function(e){
    e.preventDefault();
    recipeGenApp.categoriesQuery();
})


//ORIGINAL FUNCTION
    // .then(function(){
    //     recipeGenApp.requests = (recipeGenApp.extractIDs).map(function(id){
    //         return $.ajax({
    //           url: `${apiUrlReturnRecipesByID}?i=${id}`,
    //           datatype: "json"
    //         });
    //       }); 
    //       console.log(recipeGenApp.requests);
    // });
//CLOSING BRACKETS FOR FIRST FUNCTION

    







//THESE ARE ALL THE THINGS WE NEED TO WORK ON:

// recipeGenApp.requests = recipeGenApp.extractIDs.map(function(id) {
//   return $.ajax({
//     url: `${apiUrlReturnRecipesByID}?i=(id)`,
//     datatype: "json"
//   });
// // });

// recipeGenApp.returnedFullRecipes=[];

// $.when(...recipeGenApp.requests)
//     .then((fullRecipes) =>{
// //write our code for what we want - we're going to get an object with an array with objects 
//     recipeGenApp.returnedFullRecipes.push(fullRecipes);
//     });








// //TESTING:
// // const allergens = [`peas`, `tomato`];
// // const ingredients = "peasfishpeanutscornflourwater";

// // const result = ingredients.includes(...allergens);
// // console.log(result); //This returns true because it includes at least one of the allergens



//CODE DUMP


// const hi = (data) => {
//     console.log(`this is my hi function`, data);
// } 



//after the first API call, we now have an object that contains an array that contains a series of recipe objects. We need to pull out the IDs from each object
//
//for each object in the array, get the ID, and push it to a new array called returnedIDs
//
//use these IDs to make a second API call (series of API calls) based on these IDs- these need to be used to dynamically generate URLs for the API calls

// recipeGenApp.idQuery = function(){
//     return $.ajax({
//         url: `${apiUrlReturnRecipesByID}i=${recipeGenApp.idReturned}`,
//         //write a function that generates these URLs^
//         method: 'GET',
//         dataType: 'json',
//         data: {
//             key: 1,
//         }
//     })
// }

// //recipeGenApp.categoriesQueryResult THIS IS THE RESULT OF OUR FIRST QUERY

// recipeGenApp.extractIDs = function(){
//     (recipeGenApp.categoriesQueryResult)[meals].map(function(returnedRecipes){
//         console.log(returnedRecipes.idMeal);  
//     })
// }
// //THIS IS THE FUNCTION WE WROTE ON WEDNESDAY^^



// recipeGenApp.extractIDs();


// recipeGenApp.returnedIds = [];


//FIRST ATTEMPT AT FIRST THEN FUNCTIONS IN FIRST FUNCTIONS
// 

        // }) .then(function(result){
        //     recipeGenApp.categoriesQueryResult = result;
        //     console.log("first console log", recipeGenApp.categoriesQueryResult);

        // }) .then(function(){
            
        //     console.log(`this is what we are querying the server with`, recipeGenApp.categoriesQueryResult);


//PROBABLY DON'T NEED
// recipeGenApp.extractIDs = function(res){
//     for (let i = 0; i< (res.meals).length; i++){
//         recipeGenApp.returnedIds = ((res.meals)[i].idMeal);
//         console.log(recipeGenApp.returnedIds);
//     }
// }
//PROBABLY DON'T NEED
// recipeGenApp.extractIDs = (result.meals).map((firstApiCallResult) =>  {
//     return (firstApiCallResult.idMeal);
//   });