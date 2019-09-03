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

//main app that generates content for page based on user search queries:

recipeGenApp.categoriesQuery = function(){
    //hide the button that allows users to search for recipes
    $('button.generateRecipes').addClass('hidden');
    //variable to store selected main ingredient
    recipeGenApp.userMainIngredient = $('option:selected').attr('value');
     //variable to store selected allergen
    recipeGenApp.userAllergen = $("input[name='allergen']:checked").attr('value');
    //first API call to return recipe IDs
    $.ajax({
        url: `${apiUrlFilterByMainIngredient}?c=${recipeGenApp.userMainIngredient}`,
        method: 'GET',
        dataType: 'json',
        data: {
            key: 1
        },
    //once recipe IDs are returned
    }).then(res => {
         //map over the returned results to extract the IDs and store them in idArr
        let idArr = res.meals.map(meal => meal.idMeal);
        //map over idArr and for each ID, use it for an Ajax request that will a promise.  Store all the promises in promisesArray
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
    //when all promises have been returned, gather them into an array...
        $.when(...promisesArray)
        //...and unpack the array into individual elements
            .then((...res) => {
                 //empty the finalRecipes array
                recipeGenApp.finalRecipes.length = 0 ;
                 //for each recipe object returned, check if its recipe instructions include the user allergen.  If NOT, push the object into the finalRecipes array 
                res.forEach(function(item){
                    if (!item[0].meals[0].strInstructions.includes(recipeGenApp.userAllergen)){
                        recipeGenApp.finalRecipes.push(item[0].meals[0]);
                    }
                });

                let count = 0;

                 //for each item in the recipe, 

                recipeGenApp.finalRecipes.forEach(function(recipe){   
                    //add 1 to the counter  
                    count = count + 1;
                     //and go through the 20 strIngredients and push whichever ones are not null into the finalIngredients array
                    for(i=1;i<21;i++){
                       if (recipe[`strIngredient${i}`] !== null){
                           recipeGenApp.finalIngredients.push(recipe[`strIngredient${i}`]);
                       }
                    }
                     //do the same thing for the strMeasurements and store whichever ones are not null in the finalMeasurements array

                    for(i=1;i<21;i++){
                       if (recipe[`strMeasure${i}`] !== null){
                           recipeGenApp.finalMeasurements.push(recipe[`strMeasure${i}`]);
                       }
                    }
                     //append the following HTML to the ul.recipePreviews section:
                    $('ul.recipePreviews').append(`
                    <li class="recipe${count} fullRecipe" tabindex="0">
                            <div class="container">
                                <div class="titleAndImage">
                                    <div class="recipeTitle">
                                    	<h2 class="title">${recipe.strMeal}</h2>
                                    </div>
                                    <div class="imageWrapper">
                                        <img src="${recipe.strMealThumb}" alt="an image of ${recipe.strMeal}">
                                    </div>
                                </div>
                                <div class="directions hidden">
                                    <ul class="measurements"></ul> 
                                    <ul class="ingredients"></ul>
                                    <div class="instructions">
                                        <p>${recipe.strInstructions}</p>
                                    </div>
                                </div>
                                <button class="exit hidden" tabindex="0"><span aria-hidden>X</span><span class="visuallyHidden">Exit Button</span></button>
                            </div>
                    </li>
                    `);
                    //append each ingredient in finalIngredients to li.recipe1, li.recipe2, etc.
                    recipeGenApp.finalIngredients.forEach((ing)=> {
                        $(`li.recipe${count} ul.ingredients`).append(`
                            <li>${ing}</li>
                        `) 
                    });
                    //append each measurement in finalMeasurements to li.rec1, li.recipe2, etc.
                    recipeGenApp.finalMeasurements.forEach((mes)=> {
                        $(`li.recipe${count} ul.measurements`).append(`<li>${mes}</li>`) 
                    });
                    //empty the finalIngredients array and the finalMeasurements array
                    (recipeGenApp.finalIngredients).length = 0;
                    (recipeGenApp.finalMeasurements).length = 0;
                })
                
            }); 

    });
};

//function to show full recipe when user clicks on any recipe preview (li) 
recipeGenApp.showRecipe = function(){
    $('ul.recipePreviews').on('click', 'li.fullRecipe', function(){
        $(this).find('div.directions').removeClass('hidden');
        $(this).find('button.exit').removeClass('hidden');
        $(this).addClass('currentRecipe')
        $(this).find('div.container').addClass('wrapper');
        $('section.recipes').prepend(this);
    })
    $('ul.recipePreviews').on('keydown', 'li.fullRecipe', function(e){
        if (e.which == 13 || e.which == 32){
            $(this).find('div.directions').removeClass('hidden');
            $(this).find('button.exit').removeClass('hidden');
            $(this).addClass('currentRecipe')
            $(this).find('div.container').addClass('wrapper');
            $('section.recipes').prepend(this);
        }
    })
}

//function to hide full recipe and return recipe preview li to the ul of recipes
recipeGenApp.hideRecipe = function(){
    $('section.recipes').on('click','button.exit',function(){
        $('ul.recipePreviews').prepend($('li.currentRecipe'));
        $('li.currentRecipe').find('div.directions').addClass('hidden');
        $('li.currentRecipe').find('div.container').removeClass('wrapper')
        $('li.currentRecipe').removeClass('currentRecipe');
        $(this).addClass('hidden');
    })
    $('section.recipes').on('keydown', 'button.exit', function(e){
        if (e.which == 13 || e.which == 32){
            $('ul.recipePreviews').prepend($('li.currentRecipe'));
            $('li.currentRecipe').find('div.directions').addClass('hidden');
            $('li.currentRecipe').find('div.container').removeClass('wrapper')
            $('li.currentRecipe').removeClass('currentRecipe');
            $(this).addClass('hidden');
        }
    })

};


//app init
recipeGenApp.init = function(){
    recipeGenApp.formSubmit();
    recipeGenApp.showRecipe();
    recipeGenApp.hideRecipe();
}

$(document).ready(function(){
    recipeGenApp.init();
});