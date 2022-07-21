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
    database: 'twtclone',
})


app.get('/checkifexists', (req, res) =>{
    const id = req.body.id
    db.query("SELECT * FROM users WHERE userid=?", [id], (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/create', (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const bio = req.body.bio;

    console.log(id);
    console.log(username);
    console.log(bio);
    db.query('INSERT INTO users (userid, username, bio) VALUES (?,?,?)', 
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

