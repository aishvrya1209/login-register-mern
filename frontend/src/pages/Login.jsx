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
   <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
     <div className='row justify-content-center'>
      <div className='col-md-6'>
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
      <div className="card-body p-5">

      <div className="text-center mb-4">
    <h2 className="fw-bold">Welcome Back 👋</h2>
    <p className="text-muted mb-0">
        Sign in to continue
    </p>
</div>
      
 {/* if any error occurs to give alert */}
      {message && (
        <div className="alert alert-danger text-center py-2">
        {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>


        <div className="mb-3">
          <label className="form-label">Email:</label>
          {/* //input control */}
          <input type="email" 
          className="form-control"
          autoComplete='email'
          placeholder="Enter your email" 
          required
           value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>


        <div className="mb-3">

          <label className="form-label">Password:</label>
          
          <div className='input-group'>
          <input type={showPassword?"text":"password"} 
          className="form-control"
          autoComplete='password'
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e)=> setPassword(e.target.value)} 
          />

          <button
           className="btn btn-outline-secondary"
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          >
          {showPassword ? "Hide" : "Show"}
          </button>

          </div>
          </div>

      
      <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
        </button>


        <p className="text-center mt-3 mb-0">
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