// Targeting DOM Elements
let ingredientsContainer = document.querySelector(".ingredients");

// Fetching and Storing Data in Object
let Recipes = {
    apiKey : "dacf0e5944b4444fb449d9333e5c2b4c",
    fetchRecipes : function(food){
        fetch("https://api.spoonacular.com/recipes/complexSearch?query="
        + food
        + "&number=10&fillIngredients=true&apiKey="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayData(data))
        .catch(() => alert("Enter The Correct Food Item"));
    },
    
    displayData : function(data){
        // Fetching Ingredients and their images and displaying them
        ingredientsContainer.innerHTML = "";
        let ingredients = data["results"][0]["missedIngredients"];
        ingredients.map((item) => {
            return (
                ingredientsContainer.innerHTML +=
                    `<div class="ingredientCard">
                        <div class="ingredientCard-img flex-box">
                            <img src="${item['image']}">
                        </div>
                        <div class="ingredientCard-text">
                            <p>${item['original']}</p>
                        </div>
                    </div>`
            )
        });
    },
};


// Searching Functionality
let searchBar = document.querySelector("#searchBar");
let searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
    if(searchBar.value !== ""){
        Recipes.fetchRecipes(searchBar.value); 
    }else{
        alert("Enter The Correct Food Item");
    }
});

searchBar.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        if(searchBar.value !== ""){
            Recipes.fetchRecipes(searchBar.value);
        }else{
            alert("Enter The Correct Food Item");
        } 
    }
});