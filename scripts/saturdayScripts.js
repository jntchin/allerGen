const recipeGenApp = {};
const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

//BUTTON

$('form').on('submit', function(e){
    e.preventDefault();
    recipeGenApp.categoriesQuery();
})
//

const userMainIngredient = `seafood`;
recipeGenApp.userMainIngredient = $('option:selected').attr('value');

// allergenArr = [];
// if value === milk 
// allergenArray.push(...)

recipeGenApp.userAllergen = $('checkbox:checked').attr

recipeGenApp.categoriesQueryResult = "";
recipeGenApp.extractIDs = [];
// recipeGenApp.requests = [];
const finalRecipes = [];

//MAIN FUNCTION:
recipeGenApp.categoriesQuery = function(){
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
        idArr.forEach(el =>{
            index = el;
            console.log(index);
            return  $.ajax({
                url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`,
                    method: 'GET',
                    datatype: "json",
                    data: {
                        key: 1
                        }
            }).then(res => {
                const instructionsArr = res.meals.map(recipe => recipe.strInstructions)
                //LINE BELOW IS ALEX'S CODE + our modifications
                const filteredRecipes = instructionsArr.filter(recipe => recipe.includes('water') == false && recipe.includes('ginger') == false);
               //THIS IS OUR CODE (cannot run both at the same time)
                // const filteredRecipes = instructionsArr.filter(recipe =>recipe.strInstructions.includes('garlic')==false
                // ); 

                // const filteredRecipes = instructionsArr.map(function(recipe){
                //     if (recipe.strInstructions.includes('garlic')==false){
                //         finalRecipes.push(recipe);
                //         // filteredRecipes.pop
                //     } 
                //     console.log(finalRecipes);
                // })
                console.log(filteredRecipes);
        })
    })
})
    $.when(recipeGenApp.extractIDs).then(console.log(recipeGenApp.extractIDs));
};