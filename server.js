const express = require('express')
const nunjucks = require('nunjucks')

const server = express();
const receitas = require('./data')

server.set('view engine', 'njk')
server.use(express.static('public'))
nunjucks.configure('views', {
    express: server
})

server.get('/', function(req, res) {
    res.render('index', {items: receitas})
})

server.get('/sobre', function(req, res) {
    res.render('sobre')
})

server.get('/receitas', function(req, res) {
    res.render('receitas', {items: receitas})
})

server.get('/receita/:index', function(req, res) {
    const receitaIndex = req.params.index

    if (receitaIndex >= receitas.length) {
        return res.send('Recipe not found')
    }

    res.render('receita', {item: receitas[receitaIndex]})
})

server.listen(5000, function() {
    console.log('Server is running')
})