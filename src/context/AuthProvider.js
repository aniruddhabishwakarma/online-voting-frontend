import React, { useEffect } from "react";
import { createContext,useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({});
    // const token = localStorage.getItem("token")

    // useEffect(()=>{
    //     setAuth(token);
    // },[token])

    const logout = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider value = {{auth,setAuth,logout}}>
            {children}
        </AuthContext.Provider> 
    )
}
export default AuthContext;