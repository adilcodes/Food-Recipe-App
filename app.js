// Targeting DOM Elements
let recipesContainer = document.querySelector(".recipes");

// Fetching and Storing Data in Object
let Recipes = {
    apiKey : "dacf0e5944b4444fb449d9333e5c2b4c",
    fetchRecipes : function(food, quantity){
        if(quantity == ""){
            quantity = "3";
        }

        fetch("https://api.spoonacular.com/recipes/complexSearch?query="
        + food
        + "&number="+ quantity +"&fillIngredients=true&apiKey="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayData(data))
        .catch(() => alert("Enter The Correct Food Item"));
    },
    
    displayData : function(data){
        recipesContainer.innerHTML = "";
        let allRecipes = data["results"];
        if(allRecipes.length > 0){
            // Fetching Food Titles and their images and ingredients with recipe
            allRecipes.map((foodItem) => {
                return(
                    recipesContainer.innerHTML+=
                    `<div class="recipeCard">
                        <div class="recipeCard-img flex-box">
                            <img src="${foodItem['image']}" alt="${foodItem['title']}">
                        </div>
                        <div class="recipeCard-data">
                            <h3>${foodItem['title']}</h3>
                            <ul>
                                ${foodItem['missedIngredients'].map((ingredient) => {
                                    return(
                                        `<li class="ingredient flex-box">
                                            <img src="${ingredient['image']}" alt="${ingredient['name']}">
                                            <span>${ingredient['original']}</span>
                                        </li>`
                                    )
                                }).join('')}
                            </ul>
                        </div>
                    </div>`
                )
            });
        }else{
            alert("Enter The Correct Food Item");
        };
    },
};


// Searching Functionality
let searchBarFood = document.querySelector("#searchBar-food");
let searchBarQuantity = document.querySelector("#searchBar-quantity");
let searchBtn = document.querySelector("#searchBtn");
let options = document.querySelectorAll(".option")

searchBtn.addEventListener("click", () => {
    if(searchBarFood.value !== ""){
        Recipes.fetchRecipes(searchBarFood.value, searchBarQuantity.value); 
    }else{
        alert("Enter The Correct Food Item");
    };
});

searchBarFood.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        if(searchBarFood.value !== ""){
            Recipes.fetchRecipes(searchBarFood.value, searchBarQuantity.value);
        }else{
            alert("Enter The Correct Food Item");
        };
    };
});

searchBarQuantity.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        if(searchBarFood.value !== ""){
            Recipes.fetchRecipes(searchBarFood.value, searchBarQuantity.value);
        }else{
            alert("Enter The Correct Food Item");
        };
    };
});

options.forEach(option => {
    option.addEventListener("click", (e) => {
        // console.log(option.children[0].alt);
        Recipes.fetchRecipes(option.children[0].alt, 6);
    });
});

// On Load API call
Recipes.fetchRecipes("Mix", 3);