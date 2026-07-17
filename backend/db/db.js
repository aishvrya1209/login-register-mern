//import packages
const mongoose = require("mongoose");
//function to connect to database
const connectDB = async () => {
    try {
        //connect to MongoDB using mongoose and environment variable MONGO_URL
        //wait for connection to be established before proceeding
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected...");
    } 
    //catch error if connection to database fails
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log(error.message);
        //exit process with failure as connection to database is critical for server to function
        process.exit(1);
    }
};
//export connectDB function to be used in other files
module.exports = connectDB;