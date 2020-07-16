const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback) {
        const query = `
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `

        db.query(query, (err, results) => {
            if (err) throw err

            callback(results.rows)
        })
    },

    find(id, callback) {
        const query = `
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1
        `
        db.query(query, [id], (err, results) => {
            if (err) throw err

            callback(results.rows[0])
        }) 
    },

    create(data, callback) {
        const query = `
        INSERT INTO recipes (
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) throw err

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
        UPDATE recipes SET
        chef_id = ($1),
        image = ($2),
        title = ($3),
        ingredients = ($4),
        preparation = ($5),
        information = ($6) 
        WHERE id = $7
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw err

            callback()
        })
    },

    delete(id, callback) {
        db.query('DELETE FROM recipes WHERE id = $1', [id], (err, results) => {
            if (err) throw err

            callback()
        })
    },

    recipeSelectOptions(callback) {
        db.query(`SELECT id, name  FROM chefs`, (err, results) => {
            if (err) throw err

            callback(results.rows)
        })
    },

    paginate(params) {
        
        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = ""
        let totalQuery = `(
            SELECT count(*) FROM recipes
        ) AS total`

        if (filter) {
            filterQuery = `
                WHERE recipes.title ILIKE '%${filter}%'
                OR chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes WHERE recipes.title ILIKE '%${filter}%'
            ) AS total`
        }

        query = `
        SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
        FROM recipes LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query,[limit, offset], (err, results) => {
            if(err) throw err

            callback(results.rows)
        })
    }
}