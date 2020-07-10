module.exports = {
    findRecipe: function(recipesArray, id) {

        const foundRecipe = recipesArray.find(function(recipe, index) {
            if (id == index) {
                return recipe
            }
        })

        return foundRecipe
    },

    date(timespan) {
        const data = new Date(timespan)

        const year = data.getUTCFullYear()
        const month = `0${data.getUTCMonth() + 1}`.slice(-2)
        const day = `0${data.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            format: `${day}-${month}-${year}`
        }
    },

    hasBlankFields(data) {
        const keys = Object.keys(data)

        for (key of keys) {
            if(data[key] == '') return true
        }
        return false
    }
}