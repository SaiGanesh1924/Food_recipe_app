
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailcontent = document.querySelector('.recipe-detail-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');


//function to fetch recipees

const fetchRecipes = async (query)=>{

    recipeContainer.innerHTML = "<h2>Fetching Recipes.....</h2>";
    try{
    const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query} `);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span> Dish</p>
        <p>Belongs to <span>${meal.strCategory} </span> Category</p>
        `;

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //adding event listner to recipe button
        button.addEventListener('click' , ()=>{
            openRecipepopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
}catch(error){
    recipeContainer.innerHTML = "<h2>Error in fetching Recipees..........</h2>";
}
    
}
//fetcing ingredients
const fetchIngredients = (meal)=>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }else{
            break;
        }
    }
    return ingredientsList;
}

//function to open recipe popup
const openRecipepopup = (meal)=>{
    recipeDetailcontent.innerHTML =
     `
     <h2 class="recipeName">${meal.strMeal}</h2>
     <h3>Ingredents:</h3>
     <ul class="IngredientList">${fetchIngredients(meal)}<ul/>
     <div  class="recipeInstructions">
         <h3>Instructions:</h3>
         <p>${meal.strInstructions}</p>
     <div/>
    `
    recipeDetailcontent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailcontent.parentElement.style.display = "none"
});
searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the Search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});
