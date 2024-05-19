import React from 'react'
import styles from './css/password.module.css'
import { useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import axios from '../../../../api/axios'

const PasswordModal = ({visibility,hide}) => {
  const [recentPassword, setRecentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({
    "rError" : "",
    "nError" : ""
  })
  const UPDATE_URL = '/api/admin/updatePassword';
  const {auth} = useAuth();

  const validate = () => {
    if(newPassword.length < 8){
      setError({...error, nError : "Must be of 8 characters"})
      
    }
  }
  const onHide = () => {
    setError({
      "rError" : "",
      "nError" : ""
    });
    setRecentPassword("");
    setNewPassword("");
    hide();
  }
  const handleUpdate = async () => {
    
    try{
      validate();
      const headers = {
        Authorization : `Bearer ${auth.accessToken}`,
        'Content-Type' : 'application/json'
      }
      
      const response = await axios.put(UPDATE_URL,JSON.stringify({
         "currentPassword" : recentPassword,
         "newPassword" : newPassword
      }), {headers});
      console.log(response)
      alert("Password updated successfully")
      setRecentPassword("");
      setNewPassword("");
      hide();
    }catch(err){
      console.log(err)
         setError({...error,rError: "Your password doesnot match"})
    }
  }
if(!visibility) return null;
return (
<div className={styles.passwordModal}>
  <button className={styles.closeButton} onClick={onHide}>X</button>
  <h3 className="mb-4">Update Password</h3>
  <div class="form-floating mb-4 w-75">
    <input type="password" class="form-control" id="floatingPassword1" placeholder="Password" value = {recentPassword}
    onChange={(e)=>setRecentPassword(e.target.value)} />
    <label for="floatingPassword"> Current Password:</label>
    <span className = "text-danger">{error.rError}</span>
  </div>

  <div class="form-floating mb-4 w-75">
    <input type="password" class="form-control" id="floatingPassword2" placeholder="Password" 
    value = {newPassword}
    onChange = {(e)=> setNewPassword(e.target.value)}/>
    <label for="floatingPassword">New Password:</label>
    <span className = "text-danger">{error.nError}</span>
  </div>
  <button type="button" class="btn btn-primary w-50" onClick = {handleUpdate}>Update</button>
</div>
)
}

export default PasswordModal