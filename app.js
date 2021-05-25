const express = require("express")
const app = express()
const logger = require("morgan")
const path = require("path")
const indexRouter = require("./router/indexRouter")
const gameRouter = require("./router/gameRouter")

app.use(logger("dev"))
app.use(express.json())


app.set("views", path.join(__dirname, "views") )
app.set("view engine", "ejs")

app.set(express.static(path.join(__dirname, "public")))

app.use('/', indexRouter)
app.use('/api/game', gameRouter)

// app.listen(3000, function(){
//     console.log(`Running on port ${3000}`)
// })

module.exports = app