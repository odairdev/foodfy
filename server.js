const express = require('express')
const nunjucks = require('nunjucks')


const server = express();

server.set('view engine', 'njk')
server.use(express.static('public'))
nunjucks.configure('views', {
    express: server
})

server.get('/', function(req, res) {
    res.render('index')
})

server.get('/sobre', function(req, res) {
    res.render('sobre')
})

server.get('/receitas', function(req, res) {
    res.render('receitas')
})

server.listen(5000, function() {
    console.log('Server is running')
})