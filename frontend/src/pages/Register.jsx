import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
function Register() {
  const [name,setName]=useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate= useNavigate();
  const handleSubmit=async(e)=> {
  //prevents browser from refreshing the page when the form is submitted
  e.preventDefault();
  //to send the post to the backend server we need to use axios library
  //.post(url, data) and invoke the backend api route for register
  //we send {name,email, password} as the data beacuse backend expects const {name,email, password} in the backend
  try{const response=await axios.post("http://localhost:5000/api/auth/register",{
    name,
    email,
    password
  })
//destructure the response data to get message, token and user
 const { message,token, user } = response.data;
 //store the token and user in local storage for future use
localStorage.setItem("token", token);
//store the user object in local storage as a string using JSON.stringify
localStorage.setItem("user", JSON.stringify(user));
//move to next page which is profile
navigate("/profile")}
catch(error){
  console.log(error.response.data.message);
}
};

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" 
          className="form-control"
          value={name}
          onChange={(e)=> setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          {/* //input control */}
          <input type="email" 
          className="form-control"
           value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" 
          className="form-control"
          value={password}
          onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;


