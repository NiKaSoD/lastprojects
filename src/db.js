const fs = require("fs")

class Database {
    filePath

    constructor(filePath){
        this.filePath = filePath
    }

    loadData(){
        try{
            if(!fs.existsSync(this.filePath)) {
                this.saveData({})
                console.warn(`File "${this.filePath}" was missing and has been initialized.`)
                return {}
            }

            const data = fs.readFileSync(this.filePath, "utf8")

            if(data.trim() === "") {
                this.saveData({})
                console.warn(`File "${this.filePath}" was empty and has been initialized.`)
                return {}
            }

            return JSON.parse(data)
        }
        catch (error) {
            console.error(`Error loading data from "${this.filePath}": ${error.message}`)
            console.warn(`Reinitializing "${this.filePath}" with an empty object.`)
            console.log("sdasd")
            this.saveData({})
            return {}
        }
    }

    saveData(data){
        try{
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        }catch (error) {
            console.error(`Error saving data to "${this.filePath}": ${error.message}`)
            throw new Error("Failed to save data.")
        }
    }

    get(table, key) {
        const data = this.loadData();
        return data[table]?.[key];
    }

    set(table, key, value) {
        const data = this.loadData();

        if(!data[table]) {
            data[table] = {};
        }
        data[table][key] = value;
        this.saveData(data);
    }

    del(table, key) {
        const data = this.loadData();

        if(data[table]) {
            delete data[table][key];

            if(Object.keys(data[table]).length === 0) {
                delete data[table];
            }

            this.saveData(data);
        }
    }
}

module.exports = Database