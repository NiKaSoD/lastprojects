const Database = require("./db")

const db = new Database("data.json")

const commands = {
    UNKNOWN: function(...args) {
        console.log(`Unknown command`)
    },
    get: function({name}) {
        const value = db.get(name)
        if(value){
            console.log(`[${name}]: ${value}`)
        } else {
            console.log(`${name} is not defined`)
        }
    },
    set: function({name, value}) {
        db.set(name, value)
        console.log(`${name} is now set to ${value}`)
    },
    del: function({name}){
        db.del(name)
    }
}

module.exports = commands