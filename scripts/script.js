const recipeGenApp = {};

const apiUrlFilterByMainIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php'; 
const apiUrlReturnRecipesByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

recipeGenApp.finalRecipes = [];
recipeGenApp.finalIngredients = [];
recipeGenApp.finalMeasurements = [];

recipeGenApp.formSubmit = function(){
    $('form').on('submit', function(e){
        e.preventDefault();
        recipeGenApp.categoriesQuery();
        $('.refreshButton').removeClass('hidden');
    })
}

recipeGenApp.categoriesQuery = function(){
    recipeGenApp.userMainIngredient = $('option:selected').attr('value');
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
                recipeGenApp.finalRecipes.length = 0 ;
                res.forEach(function(item){
                    if (!item[0].meals[0].strInstructions.includes(recipeGenApp.userAllergen)){
                        recipeGenApp.finalRecipes.push(item[0].meals[0]);
                    }
                });

                let count = 0;

                recipeGenApp.finalRecipes.forEach(function(recipe){    
                    count = count + 1;
                    for(i=1;i<21;i++){
                       if (recipe[`strIngredient${i}`] !== null){
                           recipeGenApp.finalIngredients.push(recipe[`strIngredient${i}`]);
                       }
                    }

                    for(i=1;i<21;i++){
                       if (recipe[`strMeasure${i}`] !== null){
                           recipeGenApp.finalMeasurements.push(recipe[`strMeasure${i}`]);
                       }
                    }
                    
                    $('ul.recipePreviews').append(`
                    <li class="recipe${count} fullRecipe">
                        <div class="recipeTitle">
                        	<p class="title">${recipe.strMeal}</p>
                        </div>
                        <img src="${recipe.strMealThumb}" alt="an image of ${recipe.strMeal}">
                        <div class="directions hidden">
                            <ul class="measurements"></ul> 
                            <ul class="ingredients"></ul>
                            <div class="instructions">
                                <p>${recipe.strInstructions}</p>
                            </div>
                        </div>
                        <button class="exit hidden"><span aria-hidden>X</span><span class="visuallyHidden">Exit Button</span></button>
                    </li>
                    `);

                    recipeGenApp.finalIngredients.forEach((ing)=> {
                        $(`li.recipe${count} ul.ingredients`).append(`
                            <li>${ing}</li>
                        `) 
                    });

                    recipeGenApp.finalMeasurements.forEach((mes)=> {
                        $(`li.recipe${count} ul.measurements`).append(`<li>${mes}</li>`) 
                    });
                    
                    (recipeGenApp.finalIngredients).length = 0;
                    (recipeGenApp.finalMeasurements).length = 0;
                })
                
            }); 

    });
};

recipeGenApp.showRecipe = function(){
    $('ul.recipePreviews').on('click','li.fullRecipe',function(){
        console.log('li was clicked');
        $(this).find('div.directions').removeClass('hidden');
        $(this).find('button.exit').removeClass('hidden');
        $(this).addClass('currentRecipe')
        $('section.recipes').prepend(this);
    })
}

recipeGenApp.hideRecipe = function(){
    $('section.recipes').on('click','button.exit',function(){
        console.log('exit was clicked');
        $('ul.recipePreviews').prepend($('li.currentRecipe'));
        $('li.currentRecipe').find('div.directions').addClass('hidden');
        $('li.currentRecipe').removeClass('currentRecipe');
        $(this).addClass('hidden');
    })
};

recipeGenApp.init = function(){
    recipeGenApp.formSubmit();
    recipeGenApp.showRecipe();
    recipeGenApp.hideRecipe();
}

$(document).ready(function(){
    recipeGenApp.init();
});