import {Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({children}){
    //using context
    const { token } = useAuth();
    if(!token){
        return <Navigate to="/" />;
    }
    return children;
}
export default ProtectedRoute;