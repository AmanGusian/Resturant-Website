require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express()
console.log(process.env.API_KEY);
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://0.0.0.0:27017/bawarchiiUsersDB", {useNewUrlParser:true})

const usersSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String
});

usersSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const user = new mongoose.model("Users", usersSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/public/home.html")
})

app.get("/about", function(req, res) {
    res.sendFile(__dirname+"/public/about.html")
})

app.get("/menu", function(req,res) {
    res.sendFile(__dirname+"/public/menu.html")
})

app.get("/login", function(req, res) {
    res.sendFile(__dirname+"/public/login.html")
})

app.get("/register", function(req, res) {
    res.sendFile(__dirname+"/public/resistration.html");
});

 app.post("/register", function(req, res) {

    const newUser = new user({
        name:req.body.username,
        email: req.body.email,
        password:req.body.password
    });
    newUser.save().then(()=>{
        res.sendFile(__dirname+"/public/home.html");
    }).catch((err)=>{
        console.log(err);
    });
  });

  app.post("/login", function(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    user.findOne({email:email})
    .then((foundUser)=>{
        if(foundUser && foundUser.password === password) {
            res.sendFile(__dirname+"/public/home.html");
        }else{
            res.render("failure");
        }
    });
  });

  app.post("/failure",function(req, res) {
    res.sendFile(__dirname+"/public/login.html");
  });


app.listen(5000, function() {
    console.log("server started on port 5000")
})