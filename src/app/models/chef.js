const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback) {
        db.query(`
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
        GROUP BY chefs.id, chefs.name, chefs.avatar_url, chefs.created_at ORDER BY total_recipes DESC`, (err, results) => {
            if (err) throw `Database ${err}`

            callback(results.rows)
        })
    },

    find(id, callback) {
        db.query(`
        SELECT * FROM chefs
        WHERE chefs.id = $1
        `, [id], (err, results) => {
            if (err) throw `Database ${err}`

            callback(results.rows[0])
        })
    },

    findRecipes(id, callback) {
        db.query(`
        SELECT recipes.*
        FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.chef_id = $1`, [id], (err, results) => {
            if (err) throw err

            callback(results.rows)
        })
    },

    create(data, callback) {
        const query = `
        INSERT INTO chefs (
           name,
           avatar_url,
           created_at 
        ) VALUES ($1, $2, $3) RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database ${err}`
            
            callback(results.rows[0])
        })
    },

    update(data, callback) {

        const query = `
        UPDATE chefs SET
        name = ($1),
        avatar_url = ($2)
        WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Databse ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE chefs.id = $1`, [id], (err, results) => {
            if (err) throw err

            callback()
        })
    }
}