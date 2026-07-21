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
    <div className='card shadow mt-5'>
        <div className='card-body'>
            <h2 className='card-title'>
                Welcome {user.name}
            </h2>
            <p className='card-text'>
                Email: {user.email}
            </p>
            <button className='btn btn-danger'
            onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>

    )
}

export default Profile;