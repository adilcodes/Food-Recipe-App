// Targeting DOM Elements
let ingredientsContainer = document.querySelector(".ingredients");

// Fetching and Storing Data in Objects
let Foods = {
    apiKey : "dacf0e5944b4444fb449d9333e5c2b4c",
    fetchFoods : function(food){
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
        // Fetching Food titles and their images and displaying them using map function
        ingredientsContainer.innerHTML = "";
        let titles = data["results"];
        titles.map((foodItem) => {
            return(
                ingredientsContainer.innerHTML += 
                `<div class="food-suggestions">
                    <table>
                        <tr class="flex-box">
                            <td class="flex-box">
                                <img src="${foodItem['image']}" alt="${foodItem['title']}" width="30">
                            </td>
                            <td>
                                <p>${foodItem['title']}</p>
                            </td>
                        </tr>
                    </table>
                </div>`
            )
        });
        
    },
};


// Search
let searchBar = document.querySelector("#searchBar");
let searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
    if(searchBar.value !== ""){
        Foods.fetchFoods(searchBar.value); 
    }else{
        alert("Enter The Correct Food Item");
    }
});

searchBar.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        if(searchBar.value !== ""){
            Foods.fetchFoods(searchBar.value);
        }else{
            alert("Enter The Correct Food Item");
        } 
    }
});




// fetching ingredients and their images Start
// let ingredients = data["results"][0]["missedIngredients"];
// ingredients.map((item) => {
//     return (
//         ingredientsContainer.innerHTML +=
//             `<div class="ingredientCard">
//                 <div class="ingredientCard-img flex-box">
//                     <img src="${item['image']}">
//                 </div>
//                 <div class="ingredientCard-text">
//                     <p>${item['original']}</p>
//                 </div>
//             </div>`
//     )
// });
// fetching ingredients and their images End