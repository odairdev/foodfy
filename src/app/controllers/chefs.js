const Chef = require('../models/chef')
const { hasBlankFields } = require('../../lib/utils')

module.exports = {

    index(req, res) {
        Chef.all((chefs) => {
            res.render('admin/chefs/index', { chefs })
        })
    },

    siteIndex(req, res) {
        Chef.all((chefs) => {
            res.render('home/chefs', { chefs })
        })
    },

    show(req, res) {
        Chef.find(req.params.id, (chef) => {

            if (!chef) return res.send('Chef not found.')

            Chef.findRecipes( req.params.id, (recipes) => {
                return res.render(`admin/chefs/show`, { chef, recipes })
            })
        })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    },

    edit(req, res) {
        Chef.find(req.params.id, (chef) => {

            if (!chef) return res.send('Chef not found.')

            Chef.findRecipes( req.params.id, (recipes) => {
                console.log(recipes.length);
                return res.render(`admin/chefs/edit`, { chef, recipes })
            })
        })
    },

    post(req, res) {

        if (hasBlankFields(req.body)) {return res.send('Please fill out all fields.')}

        Chef.create(req.body, (chef) => {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    put(req, res) {
        
        if (hasBlankFields(req.body)) {return res.send('Please fill out all fields.')}

        Chef.update(req.body, () => {
            res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req, res) {

        if (req.body.recipes != 0) {return res.send(`Chef possui receitas`)}

        Chef.delete(req.body.id, () => {
            res.redirect('/admin/chefs')
        })
    }

}