const express = require('express')
const routes = express.Router()
const recipes = require('./src/app/controllers/recipes')
const chefs = require('./src/app/controllers/chefs')
const data = require('./data.json')

routes.get('/', recipes.siteIndex)
routes.get('/about', function(req, res) {res.render('home/about')})
routes.get('/recipes/:id', recipes.siteShow)
routes.get('/recipes', recipes.allRecipes)
routes.get('/chefs', chefs.siteIndex)

//Admin Routes
routes.get('/admin', function(req, res) {res.redirect("/admin/recipes")})

//Chefs
routes.get('/admin/chefs/', (req, res) => res.redirect('/admin/chefs/index'))
routes.get('/admin/chefs/index', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)
routes.post('/admin/chefs/', chefs.post)
routes.put('/admin/chefs/', chefs.put)
routes.delete('/admin/chefs', chefs.delete)

//Recipes
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

module.exports = routes