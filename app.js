const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/home", function(req, res) {
    res.sendFile(__dirname+"/public/home.html")
})

app.get("/about", function(req, res) {
    res.sendFile(__dirname+"/public/about.html")
})

app.get("/menu", function(req,res) {
    res.sendFile(__dirname+"/public/menu.html")
})

app.get("/signup", function(req, res) {
    res.sendFile(__dirname+"/public/login.html")
})

// app.post("/signup", function(req, res) {
// //     let email = req.body.username
// //     let pass = req.body.password
// //     console.log(`${email}  ${pass}`)
// //
// res.redirect("/login.html")
//  })


app.listen(5000, function() {
    console.log("server started on port 5000")
})