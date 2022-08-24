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

app.post('/postinsert', (req, res) =>{
    id = req.body.id
    body = req.body.body
    const filePath = "/home/arlemar/Documents/reactcrum/client/src/img/" + req.files.file.name 
    const file = req.files.file;
    file.mv(filePath, err =>{
        if(err){
            console.log(err)
        }else{
            db.query("INSERT INTO posts (posterid, post_text, post_image) VALUES (?,?,?)", [id, body, req.files.file.name], (error, result) =>{
               if(error){
                console.log(error)
               }
               else{
                res.send(true)
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
})

app.post('/create', (req, res) => {
    const filePath = "/home/arlemar/Documents/reactcrum/client/src/img/" + req.files.file.name 
    const file = req.files.file;
    const id = req.body.id;
    const username = req.body.username;
    const bio = req.body.bio;
    file.mv(filePath, err =>{
        if(err){
            console.log(err)
        }else{
            db.query("INSERT INTO users (userid, username, bio, pfp) VALUES (?,?,?)", 
            [id, username, bio, file.name], (error, result) =>{
               if(error){
                console.log(error)
               }
            })
        }
        
        
    })

})

app.get('/feed', (req, res) =>{
    db.query("SELECT * FROM posts ORDER BY post_time", (err, result) => {
        if(result.length !== 0){
            console.log(result)
            res.send(result)
        }else{
            console.log("null:" + result)
            res.send(false)
        }
        if(err){
            console.log(err)
        }
    })
})

app.get('/comments:postid', (req, res) =>{
    db.query("SELECT (comment_body, commentor_id) WHERE post_id = (?) FROM comments ORDER BY post_time", [req.params.postid], (err, result) => {
        if(result.length !== 0){
            console.log(result)
            res.send(result)
        }else{
            console.log("null:" + result)
            res.send(false)
        }
        if(err){
            console.log(err)
        }
    })
})

app.post('/commentpost', (req, res) =>{
    const postId = req.body.postid
    const commentorId = req.body.commentorid
    const commentBody = req.body.commentbody
    db.query("INSERT INTO comments (post_id, commentor_id, comment_body) VALUES (?,?,?)", [postId, commentorId, commentBody], (err, result) =>{
        if(err){
            console.log(err)
        }else{
            console.log("Post Commented")
        }
    })
})

app.post('/deleteuser', (req, res) =>{
    const ident = req.body.id
    db.query("DELETE FROM users WHERE userid='"+ [req.body.id]+"'", (err, result) =>{
        if(err){
            console.log(err)
        }else{
            console.log("User deleted")
        }
    })
})

app.listen(3001, () =>
{
    console.log('Server running')
})