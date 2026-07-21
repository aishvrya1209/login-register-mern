import api from "../api/axios"
export const loginUser=async (email,password)=>{
    return  api.post("/auth/login",{
        email,
        password
    });
};

//to send the post to the backend server we need to use axios library
  //.post(url, data) and invoke the backend api route for register
  //we send {name,email, password} as the data beacuse backend expects const {name,email, password} in the backend
export const RegisterUser=async(name,email,password)=>{
    return api.post("/auth/register",{
        name,
        email,
        password
    });
};