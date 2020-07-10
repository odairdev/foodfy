const Chef = require('../models/chef')

module.exports = {

    index(req, res) {
        Chef.all((chefs) => {
            res.render('admin/chefs/index', { chefs })
        })
    },

    show(req, res) {
        Chef.find(req.params.id, (chef) => {

            if (!chef) return res.send('Chef not found.')

            return res.render(`admin/chefs/show`, { chef })
        })
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
               return res.send("Please fill out all fields.")
            }
        }

        Chef.create(req.body, (chef) => {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    }
}