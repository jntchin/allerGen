const recipeGenApp = {};
const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';


//each key is an allergen, and the attributes of that key are the ways the allergen can manifest
// const allergenObject = {
//     peanuts: 'peanut',
//     nuts: 'nut, brazil, pecan, macadamia',
//     dairy: 'milk, cheese, yogurt, yogourt, cream, feta, cheddar, brie, gouda',
//     eggs: 'eggs',
//     gluten: 'wheat, glutinous, gluten, soy sauce, beer, flour',
//     soy: 'soy tofu edamame',
//     fish: 'fish, salmon, tuna, mackerel, sardines, herring, haddock, cod',
//     shellfish: 'lobster, crab, shrimp, scampi, scallops, mussels, oysters, clams, prawns, octopus, squid, snails, calamari',
// }

recipeGenApp.categoriesQueryResult = "";
recipeGenApp.extractIDs = [];
// recipeGenApp.requests = [];
const finalRecipes = [];
const newRecipeArray = [];
//BUTTON

$('form').on('submit', function(e){
    e.preventDefault();
    recipeGenApp.categoriesQuery();
})
//

//MAIN FUNCTION:
recipeGenApp.categoriesQuery = function(){
    recipeGenApp.userMainIngredient = $('option:selected').attr('value');
    console.log(recipeGenApp.userMainIngredient);

    recipeGenApp.userAllergen = $('input[type="checkbox"]:checked').attr('value');

    $.ajax({
        url: `${apiUrlFilterByMainIngredient}?c=${recipeGenApp.userMainIngredient}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: 1
        },
    }).then(res => {
        let idArr = res.meals.map(meal => meal.idMeal);
        console.log(idArr)
        const promisesArray = idArr.map(el =>{
            index = el;
            return  $.ajax({
                url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`,
                    method: 'GET',
                    datatype: "json",
                    data: {
                        key: 1
                        }
            })
        })
        $.when(...promisesArray)
            .then((...res) => {
                res.forEach (function(item) {
                    newRecipeArray.push(item[0].meals[0]);
                }); 
            }).then((...result) => {
                result.forEach(function(item){
                    console.log(item[0].meals[0].strInstructions);
                    if (!item[0].meals[0].strInstructions.includes('soy')){
                        finalRecipes.push(item[0].meals[0]);
                    }
                });

            });
        });
    };




    // }).then(() => {
    //     console.log(newRecipeArray);
    //     newRecipeArray.filter(function(item){
    //         (item[0].meals[0].includes('soy')===false);
    //     })
    //     console.log(newRecipeArray);
    // });
    
        



//  res.forEach(function(item){
//                     ['fish', 'soy', 'bananas'].map(function(allergen){
//                         if (item[0].meals[0].strInstructions.includes(allergen)===false){
//                             // console.log(allergen);
//                             finalRecipes.push(item[0].meals[0]);
//                         }
//                     })
//                     // console.log(item[0].meals[0].strInstructions);
                   
//                 });

