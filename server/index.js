const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('body-parser')

app.use(cors());
app.use(fileUpload());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'twtclone'
})

app.post('/upload:Id', (req, res) =>{
    id = req.params.Id
    const filePath = "/home/arlemar/Documents/reactcrum/client/src/img/" + ".jpg" 
    const file = req.files.file;
    console.log(__dirname)
    file.mv(filePath, err =>{

        db.query("UPDATE users SET pfp = (?) WHERE userid = (?)", 
            [filePath, id], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Values inserted")
        }
        
    })
        console.log(req.files.file.name)
        if(err){
            console.log(err)
        }
    });

});


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