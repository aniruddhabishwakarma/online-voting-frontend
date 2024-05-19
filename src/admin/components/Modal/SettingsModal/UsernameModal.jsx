import React, { useState } from 'react';
import styles from './css/username.module.css'
import { useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';

const UsernameModal = ({visibility,hide,info,closeModal}) => {
    const[username, setUserName] = useState(info.username || '');
    const[initialUsername,setInitialUserName] = useState('');
    const UPDATE_URL = 'admin/events';
    const {auth} = useAuth();
    const navigate = useNavigate();
  

    useEffect(()=>{
        setInitialUserName(info.username || '');
        setUserName(info.username || '');
    },[info.username]);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleClose = () => {
        setUserName(initialUsername);
        hide();
    }
    const handleUpdate = async () => {
        try{
          const headers = {
            Authorization : `Bearer ${auth.accessToken}`,
            'Content-Type' : 'application/json'
          }
          
          const response = await axios.put(UPDATE_URL,JSON.stringify({
              "fullName" : info.fullName,
              "username" : username,
              "email" : info.email,
              "contact" : info.contact
          }), {headers});
          alert("Updated Successfully");
          alert("You need to login again")
          navigate("/adminlogin")
        }catch(err){
        console.log(err);
        }
      }
    if(!visibility) return null;

return (
    
<div className={styles.usernameModal}>
    <button className={styles.closeButton} onClick = {handleClose}>X</button>
    <h3 className = "mb-4">Update Username</h3>
    <form class="form-floating mb-4 w-75">
        <input type="email" className="form-control" id="floatingInputValue" placeholder="Username"
            value={username} onChange = {handleUserNameChange}/>
        <label htmlFor="username">Username</label>
    </form>
    <button type="button" class="btn btn-primary w-50" onClick = {handleUpdate}>Update</button>
</div>
)
}

export default UsernameModal