const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')


app.use(morgan('short'))

app.get('/user/:id', (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'wahdat08',
        database: 'nametesting'
    })

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
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

app.get("/", (req, res) => {
console.log("Responding to root route")
res.send("I AM ALIVE!!!!")
})

app.get("/users", (req, res) => {
    var user1 = {firstName: "Stephen", lastName: "Curry"}
    const user2 = {firstName: "Kevin", lastName: "Durant"}
    res.json([user1, user2])

    }
    )



//localhost:3003
app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})