module.exports = {
    findRecipe: function(recipesArray, id) {

        const foundRecipe = recipesArray.find(function(recipe, index) {
            if (id == index) {
                return recipe
            }
        })

        return foundRecipe
    }
}