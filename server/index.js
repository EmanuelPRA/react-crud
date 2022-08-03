const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'twtclone'
})


app.get('/check:id', (req, res) =>{
    const ident = req.params.id
    db.query("SELECT * FROM users WHERE userid='"+ [req.params.id]+"'", (err, result) =>{
        if(result !== null){
            res.send(result)
        }
        if(err){
            console.log(err)
        }
    })
})

app.post('/create', (req, res) => {
    
    const id = req.body.id;
    const username = req.body.username;
    const bio = req.body.bio;
    db.query("INSERT INTO users (userid, username, bio) VALUES (?,?,?)", 
    [id, username, bio], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Values inserted")
        }
    })

})


app.listen(3001, () =>
{
    console.log('Server running')
})

