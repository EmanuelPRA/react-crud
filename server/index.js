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

app.post('/upload', (req, res) =>{
    if(req.files === null){
        return res.status(400).json({msg: 'nofile'})
    }

    const file = req.files.file;

    file.mv('/home/arlemar/Documents/reactcrum/server/img', err =>{
        if(err){
            console.log(err)
        }
        res.json({fileName: file.name, filePath: `/img/${file.name}`})
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