let Recipe = {
    apiKey : "dacf0e5944b4444fb449d9333e5c2b4c",
    fetchRecipe : function(food){
        fetch("https://api.spoonacular.com/recipes/complexSearch?query="
        + food
        + "&number=1&fillIngredients=true&apiKey="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayData(data));
    },
    
    displayData : function(data){
        const {title} = data["results"][0];
        // fetching ingredients and their images Start
        let ingredients = data["results"][0]["missedIngredients"];
        ingredients.map((item) => {
            console.log(item["original"]);
            console.log(item["image"]);
        });
        // fetching ingredients and their images End
    },
};