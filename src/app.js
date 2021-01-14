const { static } = require("express");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn")
const Register = require("./models/register");

const port = process.env.PORT || 8000; 

const static_path = path.join(__dirname , "../public")
const template_path = path.join(__dirname , "../templates/views")
const partial_path = path.join(__dirname , "../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine" , "hbs")
app.set("views", template_path);
hbs.registerPartials(partial_path)

app.get("/" , (req,res) =>{
    res.render("index")
})
app.get("/login", (req,res) =>{
    res.render("login")
})
app.get("/register", (req,res) =>{
    res.render("register");
})
app.post("/register",async (req,res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                confirmpassword:cpassword
            })

            // password hash
            

            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching")
        }
    }catch(err){
        res.status(400).send(err)
    }
})

// login
app.post("/login",async(req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email})

        const isMatch = await bcrypt.compare(password, useremail.password);
        
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details");
        }
    }catch(err){
        res.status(400).send("Invalid Login Details")
    } 
})

// const bcrypt = require("bcryptjs");

// const securePassword = async (password) =>{
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash)
// }

// securePassword("tanmay@123")

app.listen(port, () =>{
    console.log(`Server is running at port no ${port}`);
}) 