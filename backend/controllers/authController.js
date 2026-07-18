//importing bcryptjs to hash the password before saving it to the database
const bcrypt=require("bcryptjs");

//importing jwt to generate a token for the user after successful registration
const jwt=require("jsonwebtoken");

//importing model to send data to database in the set schema
const User=require("../models/user");

const registerUser= async(req,res)=>{
 try{
    //destructuring name, email and password from request body
    const{name,email,password}=req.body;


    //chacking if all fields are present in the request body, if not return 400 status code with message
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }


    //checking if user already exists in the database, if yes return 409 status code with message
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            message:"User already exists"
        });
    }

    // hashing the password before saving it to the database
    const hashedPassword=await bcrypt.hash(password,10);
     

    //finally creating a new user with the hashed password and saving it to the database
    //mongoose use user.create() method is used to create a new user in the database
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })
    

    //generating a token for the user after successful registration using jwt.sign() method
     const token=jwt.sign({
        //payload for the token, in this case we are sending the user id
        id:user._id
        }
           //secret key for the token, in this case we are using the JWT_SECRET from the environment variable
          ,process.env.JWT_SECRET,
        {
            //token expiration time, in this case we are setting it to 1 day
           expiresIn:"1d"
        }
    );

    //returning the user data and token to the client with 201 status code
    //return 201 if user succesfully created
    return res.status(201).json({
        message:"User registered successfully",
        token,
        user:{
            id: user._id,
            name:user.name,
            email:user.email

        }  
    })
 
 }


 //if recieve request to get the body or database query or bcrypt hashing fails, return 500 status code with message
 catch(error){
    console.error(error);
    return res.status(500).json({
        message:"internal server error"
    });
 }


};

module.exports={registerUser};