import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useState} from 'react'
function Register() {
  const [name,setName]=useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate= useNavigate();
  const [message,setMessage]=useState('');
  const [loading,setLoading]=useState(false)
  const handleSubmit=async(e)=> {
  //prevents browser from refreshing the page when the form is submitted
  e.preventDefault();
  setLoading(true);
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
setLoading(false);
navigate("/profile")}
catch(error){
  setMessage(error.response.data.message);
  setLoading(false);
}
};

  return (
    <div className='container'>
    <div className='row justify-content-center'>
    <div className='col-md-6'>
    <div className="card shadow">
    <div className="card-body">
        <h2 className='text-center mb-4'>Register</h2>

      {message&&(
        <div className="alert alert-danger">
        {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" 
          className="form-control"
          value={name}
          onChange={(e)=> setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          {/* //input control */}
          <input type="email" 
          className="form-control"
           value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" 
          className="form-control"
          value={password}
          onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading?"Registering..":"Register"}
        </button>
         <p className="mt-3">
           Already have an account?{" "}
           <Link to="/">Login</Link>
         </p>
      </form>
    </div>
    </div>    
    </div>   
    </div>   
    </div>   
  );
}

export default Register;


