import { Navigate, useNavigate,Link } from 'react-router-dom'
import { RegisterUser } from '../services/authService';
import {useState} from 'react'
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name,setName]=useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate= useNavigate();
  const [message,setMessage]=useState('');
  const { login } = useAuth();
  const [loading,setLoading]=useState(false)
  const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleSubmit=async(e)=> {
  //prevents browser from refreshing the page when the form is submitted
  e.preventDefault();
  setLoading(true);
  
  try{
    if (!passwordRegex.test(password)) {
    setMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
    );
    setLoading(false);
    return;
   }
const response= await RegisterUser(name,email,password);
//destructure the response data to get message, token and user
 const { message,token, user } = response.data;
 login(user,token);
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


