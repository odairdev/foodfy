const { date, hasBlankFields } = require('../../lib/utils')
const Recipe = require('../models/recipe')
const recipe = require('../models/recipe')

module.exports = {

    index(req, res) {
        Recipe.all((recipes) => {return res.render('admin/recipes/index', {recipes})})
    },

    siteIndex(req, res) {
        Recipe.all((recipes) => {
            let displayedRecipes = []

            for(let i = 0; i < 6; i++) {
                displayedRecipes.push(recipes[i])
            }

            res.render('home/index', {items: displayedRecipes})
        })
    },

    allRecipes(req, res) {
        Recipe.all((recipes) => {return res.render('home/recipes', {items: recipes})})
    },

    show(req, res) {
        Recipe.find(req.params.id, (recipe) => {
            res.render('admin/recipes/show', { recipe })
        })
    },

    siteShow(req, res) {
        Recipe.find(req.params.id, (recipe) => {
            res.render('home/recipe', { item: recipe })
        })
    },

    create(req, res) {
        Recipe.recipeSelectOptions((chefs) => {
            return res.render('admin/recipes/create', { chefs })
        })
    },

    edit(req, res) {
        Recipe.find(req.params.id, (recipe) => {
            Recipe.recipeSelectOptions((chefs) => {
                res.render('admin/recipes/edit', { recipe, chefs })
            } )
        })
    },

    post(req, res) {
        if (hasBlankFields(req.body)) {return res.send('Please Fill out all fields.')}

        Recipe.create(req.body, (recipe) => {
            res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },

    put(req, res) {

        if (hasBlankFields(req.body)) { return res.send('Please fill out all fields.')}

        Recipe.update(req.body, () => {
            return res.redirect('/admin/recipes')
        })
    },

    delete(req, res) {
        Recipe.delete(req.body.id, () => {
            return res.redirect('/admin/recipes')
        })
    }
}
