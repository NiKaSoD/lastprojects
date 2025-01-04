const yargs = require("yargs")
const commands = require("./commands")

yargs.command(
    "get",
    "Reads value by the specified name",
    {
        name: {
            alias: "n",
            demand: true,
            type: "string"
        }
    },
    commands.get
).command(
    "set",
    "Sets value for the specified name",
    {
        name: {
            alias: "n",
            demand: true,
            type: "string"
        },
        value: {
            alias: "v",
            demand: true
        }
    },
    commands.set
).command(
    "del",
    "Deletes record by the specified name",
    {
        name: {
            alias: "n",
            demand: true,
            type: "string"
        }
    },
    commands.del
).argv