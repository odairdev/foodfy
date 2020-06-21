const express = require('express')
const routes = express.Router()
const recipes = require('./data')

routes.get('/', function(req, res) {
    res.render('index', {items: recipes})
})

routes.get('/about', function(req, res) {
    res.render('about')
})

routes.get('/recipes', function(req, res) {
    res.render('recipes', {items: recipes})
})

routes.get('/recipes/:index', function(req, res) {
    const recipeIndex = req.params.index

    if (recipeIndex >= recipes.length) {
        return res.send('Recipe not found.')
    }

    res.render('recipe', {item: recipes[recipeIndex]})
})

module.exports = routes