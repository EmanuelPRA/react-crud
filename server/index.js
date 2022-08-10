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
    const filePath = "/home/arlemar/Documents/reactcrum/client/src/img/" + req.files.file.name 
    const file = req.files.file;
    console.log(__dirname)
    file.mv(filePath, err =>{

        db.query("UPDATE users SET pfp = (?) WHERE userid = (?)", 
            [file.name, id], (err, result) => {
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

app.post('/postinsert:id:body', (req, res) =>{
    const id = req.params.id
    const body = req.params.body
    const filePath = "/home/arlemar/Documents/reactcrum/client/src/img/" + req.files.file.name 
    const file = req.files.file;
    file.mv(filePath, err =>{
        if(err){
            console.log(err)
        }else{
            db.query("INSERT INTO posts (posterid, post_text, post_image) VALUES (?,?,?)", [id, body, req.files.file.name], (error, result) =>{
                if(result.length !== 0){
                    res.send(result)
                    console.log(result)
                }else{
                    console.log("null:" + result)
                    res.send(false)
                }
                if(err){
                    console.log(err)
                }
            })
        }
        
        
    })
})

app.get('/check:id', (req, res) =>{
    const ident = req.params.id
    db.query("SELECT * FROM users WHERE userid='"+ [req.params.id]+"'", (err, result) =>{
        if(result.length !== 0){
            res.send(result)
            console.log(result)
        }else{
            console.log("null:" + result)
            res.send(false)
        }
        if(err){
            console.log(err)
        }
    })
})//somebody please explain why when it return null it doesn't function on the front end

app.post('/create', (req, res) => {
    
    const id = req.body.id;
    const username = req.body.username;
    const bio = req.body.bio;
    db.query("INSERT INTO users (userid, username, bio) VALUES (?,?,?)", 
    [id, username, bio], (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send("Values inserted")
        }
    })

})


app.listen(3001, () =>
{
    console.log('Server running')
})