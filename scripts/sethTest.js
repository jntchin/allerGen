const recipeGenApp = {};
const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

//BUTTON
$('form').on('submit', function(e){
    e.preventDefault();
    recipeGenApp.categoriesQuery();
})
//

if([1,2].some(a =>{
    a === 1
})){
    // item[0].meals[0].strInstructions.includes(food);

    console.log('it is true');}

const test = (rec,all) => {rec.includes(all)};

const finalRecipes = [];

//MAIN FUNCTION:
recipeGenApp.categoriesQuery = function(){
    recipeGenApp.userMainIngredient = $('option:selected').attr('value');
    console.log(recipeGenApp.userMainIngredient);
    recipeGenApp.userAllergen = $('input[type="checkbox"]:checked').attr('value');
    // console.log(recipeGenApp.userAllergen);
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
                finalRecipes.length = 0 ;
                res.forEach((item) => {
                    // console.log(item[0].meals[0].strInstructions);
                    // let recipe = item[0].meals[0].strInstructions
                    if([1,2].some(a =>{
                        a === 1
                    })){
                        // item[0].meals[0].strInstructions.includes(food);
                    
                        console.log('it is true');}
                    
                    
                    
                    
                    
                    
                    
                    
                    // ['fish','pork'].forEach((allergen) => {
                    //     if(item[0].meals[0].strInstructions.includes(allergen)){
                    //         console.log('yes');
                    //     } else {
                    //         console.log('no');
                    //     }
                    // })
                    
                    
                    // if (!recipe.strInstructions.includes(recipeGenApp.userAllergen)){
                    //     finalRecipes.push(item[0].meals[0]);
                    // }
                });
        });
    })
};



// const instructionsArr = res.meals.map(recipe => recipe.strInstructions)
                // //LINE BELOW IS ALEX'S CODE + our modifications
                // const filteredRecipes = instructionsArr.filter(recipe => recipe.includes('water') == false && recipe.includes('ginger') == false);
        //        //THIS IS OUR CODE (cannot run both at the same time)
        //         // const filteredRecipes = instructionsArr.filter(recipe =>recipe.strInstructions.includes('garlic')==false
        //         // ); 

        //         // const filteredRecipes = instructionsArr.map(function(recipe){
        //         //     if (recipe.strInstructions.includes('garlic')==false){
        //         //         finalRecipes.push(recipe);
        //         //         // filteredRecipes.pop
        //         //     } 
        //         //     console.log(finalRecipes);
        //         // })
        //         console.log(filteredRecipes);


    // $.when(recipeGenApp.extractIDs).then(console.log(recipeGenApp.extractIDs));