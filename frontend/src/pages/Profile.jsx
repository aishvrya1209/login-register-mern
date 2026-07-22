import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
function Profile(){
    const { user, logout } = useAuth();
    if (!user) {
    return <h2>Please login first.</h2>;
}
const navigate=useNavigate();
const handleLogout=()=>{
    logout();
    navigate("/");
};


    return(
    < div className="container-fluid min-vh-100 bg-light d-flex justify-content-center align-items-center">
    <div  className="card shadow-lg border-0 rounded-4"
    style={{ maxWidth: "500px", width: "100%" }}>
        <div className='card-body p-5'>
            <h2 className='card-title'>
                👤 Welcome {user.name}
            </h2>
            <div className="mb-3">
            <h6 className="text-muted">Full Name</h6>
            <p className="fs-5 fw-semibold">{user.name}</p>
            </div>

            <div className="mb-4">
            <h6 className="text-muted">Email Address</h6>
            <p className="fs-5 fw-semibold">{user.email}</p>
            </div>
            <button className='btn btn-danger w-100'
            onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
    </div>

    )
}

export default Profile;