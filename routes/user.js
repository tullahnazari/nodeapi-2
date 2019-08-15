//this class will contain all of my user related routes


const express = require('express')
const mysql = require('mysql')
const router = express.Router()

//creating a router

router.get('/messages', (req, res) => {
    console.log("Show some messages dawg")
    res.end()
})

router.get("/users", (req, res) => {
    getConnection().query("SELECT * FROM users", (err, rows, fields) => {
    
    res.json([rows])
    })
})

router.get('/user/:id', (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    getConnection().query(queryString, [userId], (err, rows, fields) => {
    if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
    }
        console.log("I think we fetched users successfully")

        //to make the attibute names camelCase instead of snakecase
        const users = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name}
        })
        res.json(users)
    })
    //res.end()
})
//creating a pool for db connection, so users can call it multiple times
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'wahdat08',
    database: 'nametesting'
})

function getConnection() {
    return pool
}

router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get form data?")

    console.log("First name: ", req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => 
    {
        if (err) {
            console.log("fail to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted new user with id: ", results.insertedId);
    })
    res.end()
})

module.exports = router