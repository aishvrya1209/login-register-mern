import { createContext, useState } from "react";
import { useContext } from "react";
export const AuthContext = createContext();
//This component wraps your application and says:
//"Everything inside me can access the authentication data."

export const AuthProvider=({ children })=> {
const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
);

const [token, setToken] = useState(
    localStorage.getItem("token")
);

const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
};

const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

return (
    <AuthContext.Provider
        value={{
            user,
            token,
            login,
            logout,
        }}
    >
        {children}
    </AuthContext.Provider>
);
}
export const useAuth = () => {
    return useContext(AuthContext);
};

