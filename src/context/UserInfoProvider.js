import React, { createContext } from 'react'
import { useState,useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Router, useRoutes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();
export const UserInfoProvider = ({children}) => {
    const[userInfo,setUserInfo] = useState(null);
    const {auth} = useAuth();
    const INFO_URL = '/api/user/info'
    const navigate = useNavigate();
    
    const fetchUserInfo = async () => {
        try{
            const headers = {
              Authorization : `Bearer ${auth.accessToken}`
            };
            console.log(auth.accessToken)
            const response =  await axios.get(INFO_URL,{headers});
            if(response && response.data){

                setUserInfo(response.data)
                // if(response.data.roles==="ADMIN"){
                //    navigate("/admin");
                // }
            }
        }catch(err){
          console.log(err.message);
        }
};
    useEffect(()=> {
        fetchUserInfo();
    },[auth.accessToken]);

    useEffect(()=>{
        if(!auth.accessToken){
            setUserInfo(null);
        }
    },[auth.accessToken]);
    const contextValue = [userInfo,fetchUserInfo]

    return(
        <UserContext.Provider value = {contextValue}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;