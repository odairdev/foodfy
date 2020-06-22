const express = require('express')
const routes = express.Router()
const oldData = require('./data')
const recipes = require('./controllers/recipes')

routes.get('/', function(req, res) {
    res.render('index', {items: oldData})
})
routes.get('/about', function(req, res) {
    res.render('about')
})
routes.get('/recipes', function(req, res) {
    res.render('recipes', {items: oldData})
})
routes.get('/recipes/:index', function(req, res) {
    const recipeIndex = req.params.index

    if (recipeIndex >= oldData.length) {
        return res.send('Recipe not found.')
    }

    res.render('recipe', {item: recipes[recipeIndex]})
})

//Admin Routes
routes.get('/admin', function(req, res) {res.redirect("/admin/recipes")})
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

module.exports = routes