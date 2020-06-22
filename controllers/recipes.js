const data = require('../data.json')

exports.index = function(req, res) {
    res.render('admin/index')
}

exports.create = function(req, res) {
    res.render('admin/create')
}