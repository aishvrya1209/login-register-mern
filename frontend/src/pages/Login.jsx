import {Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { loginUser } from '../services/authService';
import { useAuth } from "../context/AuthContext";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  const [message,setMessage]=useState('');
  const [loading,setLoading]=useState(false);
  const[showPassword,setShowPassword]=useState(false);
  const { login } = useAuth();
  const handleSubmit=async(e)=> {
  //prevents browser from refreshing the page when the form is submitted
  e.preventDefault();

  setMessage("");//clear any previous error
  setLoading(true);//so that no multiple login button pressed while a request is travelling

  try{const response= await loginUser(email,password);
    //use authservice
//destructure the response data to get message, token and user
 const { message, token, user } = response.data;
 //use context 
 login(user,token);
setLoading(false);
//move to next page which is profile
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

      <h2 className='text-center mb-4'>Login</h2>
      
 {/* if any error occurs to give alert */}
      {message && (
        <div className="alert alert-danger">
        {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>


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
          <input type={showPassword?"text":"password"} 
          className="form-control"
          value={password}
          onChange={(e)=> setPassword(e.target.value)} />
          <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          >
          {showPassword ? "Hide" : "Show"}
          </button>
          </div>

      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
        </button>


        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p> 
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;


// Store user input using useState(memory of browser)
// ✅ Update state with onChange (on every keystroke)
// ✅ Prevent page refresh with preventDefault()(react is a single page application)
// ✅ Handle form submission
// ✅ Access the entered email and password


//full Mern request cycle for login
// React Login Form
//         │
//         ▼
// User types email & password
//         │
//         ▼
// useState stores values
//         │
//         ▼
// onSubmit
//         │
//         ▼
// Axios POST request
//         │
//         ▼
// Express Route
//         │
//         ▼
// Auth Controller
//         │
//         ▼
// MongoDB
//         │
//         ▼
// Password checked using bcrypt.compare()
//         │
//         ▼
// JWT generated
//         │
//         ▼
// Response sent
//         │
//         ▼
// React receives response ✅

// Login Form
//     │
//     ▼
// React State
//     │
//     ▼
// Axios POST
//     │
//     ▼
// Express Backend
//     │
//     ▼
// MongoDB
//     │
//     ▼
// JWT Generated
//     │
//     ▼
// Store in localStorage
//     │
//     ▼
// navigate("/profile") ✅