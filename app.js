const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/user_create', (req, res) => {
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

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'wahdat08',
        database: 'nametesting'
    })
}

app.get('/user/:id', (req, res) => {
    console.log("fetching user with id: " + req.params.id)

    const connection = getConnection()

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