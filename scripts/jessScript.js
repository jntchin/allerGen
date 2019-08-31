const recipeGenApp = {};
const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';


const allergenObject = {
    peanuts: 'peanut',
    nuts: 'nut, brazil, pecan, macadamia',
    dairy: 'milk, cheese, yogurt, yogourt, cream, feta, cheddar, brie, gouda',
    eggs: 'eggs, mayonnaise',
    gluten: 'wheat, glutinous, gluten, soy sauce, beer, flour',
    soy: 'soy tofu edamame',
    fish: 'fish, salmon, tuna, mackerel, sardines, herring, haddock, cod',
    shellfish: 'lobster, crab, shrimp, scampi, scallops, mussels, oysters, clams, prawns, octopus, squid, snails, calamari',
}
//TWO OPTIONS
//1) each checkbox refers to an array, we spread the array open in order to use the strings that are inside it
//2) make one array with all of our allergen objects, and each of those objects has keys of those types of allergens (i.e. soy is the object and soy, tofu, edameme are the keys) 

const allergyObject = {
    nuts: ['nut', 'brazil', 'pecan', 'macadamia'],
    soy: ['soy', 'edamame', 'tofu'],
    dairy: ['yogurt', 'yogourt']
}

console.log(...allergyObject.nuts);

recipeGenApp.peanutsArray = ["peanut"];
nuts = ["nut", "brazil", "pecan", "macadamia"];
recipeGenApp.dairyArray = ["milk, cheese, yogurt, yogourt, cream, feta, cheddar, brie, gouda"];
recipeGenApp.eggsArray = ["egg, mayonnaise"];

recipeGenApp.glutenArray = ["wheat, glutinous, gluten, soy sauce, beer, flour"];

recipeGenApp.soyArray = ["soy, tofu, edamame"];
recipeGenApp.fishArray = ["fish, salmon, tuna, mackerel, sardines, herring, haddock, cod"];
recipeGenApp.shellfish = ["lobster, crab, shrimp, scampi, scallops, mussels, oysters, clams, prawns, octopus, squid, snails, calamari"];

// console.log(allergenObject.dairy);

recipeGenApp.categoriesQueryResult = "";
recipeGenApp.extractIDs = [];
// recipeGenApp.requests = [];
const finalRecipes = [];

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

    console.log(recipeGenApp.userAllergen);

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
                // console.log('inside the .then', allergenObject.dairy);
                res.forEach(function(item){
                    console.log(item[0].meals[0].strInstructions);
                    if (item[0].meals[0].strInstructions.includes(...allergyObject.dairy)===false){
                        console.log('inside the if statement');
                        finalRecipes.push(item[0].meals[0]);
                    }
                });
            });
            // console.log('inside the .when', allergenObject.dairy);
    });
    
};

