const Database = require("./db")

const db = new Database("data.json")

const commands = {
    get: function({ table, name }) {
        const value = db.get(table, name)
        if (value) {
            console.log(`[${table}.${name}]: ${value}`)
        } else {
            console.log(`${table}.${name} is not defined`)
        }
    },
    set: function({ table, name, value }) {
        db.set(table, name, value);
        console.log(`${table}.${name} is now set to ${value}`)
    },
    del: function({ table, name }) {
        db.del(table, name);
        console.log(`${table}.${name} has been deleted`)
    }
}

module.exports = commands