const express = require('express')
const routes = express.Router()
const recipes = require('./src/app/controllers/recipes')
const chefs = require('./src/app/controllers/chefs')
const data = require('./data.json')

routes.get('/', function(req, res) {
    res.render('home/index', {items: data.recipes})
})
routes.get('/about', function(req, res) {
    res.render('home/about')
})
routes.get('/recipes', function(req, res) {
    res.render('home/recipes', {items: data.recipes})
})
routes.get('/recipes/:index', function(req, res) {
    const recipeIndex = req.params.index

    if (recipeIndex >= data.recipes.length) {
        return res.send('Recipe not found.')
    }

    res.render('home/recipe', {item: data.recipes[recipeIndex]})
})

//Admin Routes
routes.get('/admin', function(req, res) {res.redirect("/admin/recipes")})
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

//Chefs
routes.get('/admin/chefs/', (req, res) => res.redirect('/admin/chefs/index'))
routes.get('/admin/chefs/index', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)
routes.post('/admin/chefs/', chefs.post)
routes.put('/admin/chefs/', chefs.put)

//Recipes
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

module.exports = routes