const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/registrationform",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() =>{
    console.log(`Connection Successfull`)
}).catch((err) =>{
    console.log("No Connection")
})