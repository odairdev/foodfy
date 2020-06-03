const express = require('express')
const nunjucks = require('nunjucks')

const server = express();
const recipes = require('./data')

server.set('view engine', 'njk')
server.use(express.static('public'))
nunjucks.configure('views', {
    express: server,
    autoescape: false
})

server.get('/', function(req, res) {
    res.render('index', {items: recipes})
})

server.get('/about', function(req, res) {
    res.render('about')
})

server.get('/recipes', function(req, res) {
    res.render('recipes', {items: recipes})
})

server.get('/recipe/:index', function(req, res) {
    const recipeIndex = req.params.index

    if (recipeIndex >= recipes.length) {
        return res.send('Recipe not found.')
    }

    res.render('recipe', {item: recipes[recipeIndex]})
})

server.listen(5000, function() {
    console.log('Server is running')
})