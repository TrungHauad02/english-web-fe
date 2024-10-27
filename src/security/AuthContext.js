import { createContext, useContext, useState } from "react";

//create context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// share the create context with orther components
export default function AuthProvider({children}) {
    //Put some start in the context
    const [isAuthenticated, setAuthenticated] = useState(false);

    function SignIn(email, password, setError) {
        if (email === 'student@gmail.com' && password === '123') {
            setAuthenticated(true);
            return true;
        } else {
            setAuthenticated(false);
            setError('Email or password Incorrect');
            return false;
        }
    }
    
    function Logout() {
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, SignIn, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}