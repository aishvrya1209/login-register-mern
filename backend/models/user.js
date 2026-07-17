const mongoose=require("mongoose");
//create user schema with fields name, email, password and timestamps
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }
});
//making a model from the schema and exporting it to be used in other files
const User=mongoose.model("User",userSchema);
module.exports=User;