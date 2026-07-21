import { Navigate, useNavigate } from 'react-router-dom'
function Profile(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
    return <h2>Please login first.</h2>;
}
const navigate=useNavigate();
const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
};


    return(
    <div className="container mt-5">
    <h1>Profile Page</h1>
     <p><strong>Name:</strong> {user.name}</p>

      <p><strong>Email:</strong> {user.email}</p>
      <button className="btn btn-danger" 
      onClick={handleLogout}>
      Logout
      </button>
    </div>

    )
}

export default Profile;