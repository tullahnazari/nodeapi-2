const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

//calling this from user.js router
const router = require('./routes/user.js')

app.use(router)


//connection fun

router.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("I AM ALIVE!!!!")
    })






//localhost:3003
app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})