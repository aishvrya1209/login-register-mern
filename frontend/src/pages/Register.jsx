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
  const [showPassword,setShowPassword]=useState(false)
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
    <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light'>
    <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
    <div className="card-body">
        
  <div className="text-center mb-4">
    <h2 className="fw-bold">Create Account ✨</h2>
    <p className="text-muted mb-0">
        Join us today
    </p>
  </div>

      {message&&(
        <div className="alert alert-danger">
        {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" 
          className="form-control"
          placeholder='Enter your full name'
          required
          autoComplete="name"
          value={name}
          onChange={(e)=> setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          {/* //input control */}
          <input type="email" 
          className="form-control"
          placeholder='Enter your email'
          required
          autoComplete="email"
           value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          
          <div className="input-group">
          <input type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder='Create a password'
          required
          autoComplete="new-password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)} />
          
          <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => 
        setShowPassword(prev => !prev)}>
        {showPassword ? "Hide" : "Show"}
        </button>
        </div>
        </div>

        <button type="submit" className="btn btn-success w-100 mt-2"
         disabled={loading}>
          {loading?"Registering..":"Register"}
        </button>
         <p className="text-center mt-3 mb-0">
           Already have an account?{" "}
           <Link to="/">Login</Link>
         </p>
      </form>
    </div>
    </div>    
    </div>     
  );
}

export default Register;


