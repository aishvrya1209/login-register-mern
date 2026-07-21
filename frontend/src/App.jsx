//import router to route react so user can browse to login reister and profile
import {Routes,Route} from "react-router-dom";
import './App.css'
import  Login from './pages/Login'
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute";
function App() {

  return (
    <Routes>

    <Route path="/" element={
      <PublicRoute>
        <Login/>
      </PublicRoute>
      }/>

    <Route path="/register" element={<Register/>}/>
    
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
      }/>

      
    </Routes>
  );
}

export default App
