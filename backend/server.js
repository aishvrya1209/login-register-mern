//load environment variable like port
require("dotenv").config();
//import package express and connectDB function from db.js
const express = require("express");

//import connectDB function from db.js and authRoutes from authRoutes.js
const connectDB=require("./db/db.js");
const authRoutes=require("./routes/authRoutes.js")

//create express app
const app=express();
//middleware to parse incoming request body as JSON
app.use(express.json());

//app url for auth routes
app.use("/api/auth",authRoutes);

//test route to check if server is running
app.get("/", (req, res) => {
    res.send("Server is running...");
});

//get port from environment variable from process.env.PORT
const PORT=process.env.PORT||5000;

//function to start server and connect to database
const startServer=async()=>{
    //connect to database and start server
   try{
      await connectDB();
    //start server on specified port
      app.listen(PORT,( )=> {
        console.log(`Server is running on port ${PORT}...`);
        });
    }
//catch error if connection to database fails
    catch(error){
    console.error("Failed to start server:", error);
 }
};

//call startServer function to start server and connect to database
startServer();



