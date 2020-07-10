const fs = require('fs')
const data = require('../../../data.json')
const { findRecipe } = require('../../lib/utils')

exports.index = function(req, res) {
    let recipes = []

    for (let i = 0; i < data.recipes.length; i++) {
        const rc = {
            ...data.recipes[i],
            id: i
        }
        recipes.push(rc)
    }

    res.render('admin/recipes/index', {recipes})
}

exports.create = function(req, res) {
    res.render('admin/recipes/create')
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundRecipe = findRecipe(data.recipes, id)
    if (!foundRecipe) return res.send('Recipe not Found.')

    const recipe = {
        ...foundRecipe,
        id: Number(req.params.id)
    }

    res.render("admin/recipes/show", {recipe})
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundRecipe = findRecipe(data.recipes, id)
    if (!foundRecipe) return res.send('Recipe not Found.')

    const recipe = {
        ...foundRecipe,
        id: Number(req.params.id)
    }

    res.render('admin/recipes/edit', {recipe})
}
exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if(req.body[key] == "") {
            res.send('Please, Fill Out all fields.')
        }
    }

    let {image, 
        title, 
        author, 
        ingredients, 
        preparation, 
        information} = req.body

        const recipe =  {
            ...req.body,
            image, 
            title, 
            author, 
            ingredients, 
            preparation, 
            information
        }

        data.recipes.push(recipe)

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) {res.send('WriteFile Error.')}

            res.redirect("/admin/recipes")
        })
}

exports.put = function(req, res) {

    const { id } = req.body

    const foundRecipe = findRecipe(data.recipes, id)
    if (!foundRecipe) return res.send('Recipe not Found.')

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.params.id),
    }

    data.recipes[id] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("WriteFile error.")

        res.redirect('/admin/recipes')
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe, index) {
        return index != id
    })

    data.recipes = filteredRecipes
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("WriteFile error.")

        res.redirect('/admin/recipes')
    })
}
