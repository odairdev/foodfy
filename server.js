const express = require('express')
const nunjucks = require('nunjucks')


const server = express();

server.set('view engine', 'html')
server.use(express.static('public'))
nunjucks.configure('views', {
    express: server
})

server.get('/', function(req, res) {
    res.send('funcionou')
})

server.listen(5000, function() {
    console.log('Server is running')
})