const registerUser=(req,res)=>{
    console.log(req.body);
    
    res.json({
        message:"data received successfully",
        data:req.body,
    });

};

module.exports={registerUser};