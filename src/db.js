const fs = require("fs")

class Database {
    filePath

    constructor(filePath){
        this.filePath = filePath
    }

    loadData(){
        const data = fs.readFileSync(this.filePath, "utf8")
        return JSON.parse(data)
    }

    saveData(data){
        fs.writeFileSync(this.filePath, JSON.stringify(data))
    }

    get(key){
        const data = db.loadData()
        return data[key]
    }

    set(key, value){
        const data = db.loadData()
        data[key] = value
        db.saveData(data)
    }

    del(key){
        const data = db.loadData()
        delete data[key]
        db.saveData(data)
    }
}

module.exports = Database