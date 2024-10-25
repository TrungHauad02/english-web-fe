import { createContext, useContext, useState } from "react";

//create context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// share the create context with orther components
export default function AuthProvider({children}) {
    //Put some start in the context
    const [number, setNumber] = useState(10);
    const [isAuthenticated, setAuthenticated] = useState(false);


    return (
        <AuthContext.Provider value = {{number, isAuthenticated, setAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}