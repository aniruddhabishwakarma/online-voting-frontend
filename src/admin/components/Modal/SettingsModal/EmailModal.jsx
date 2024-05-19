import React, { useState,useEffect } from 'react'
import styles from './css/email.module.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';

const EmailModal = ({visibility,hide,info,closeModal}) => {
  const [email,setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const UPDATE_URL = '/api/admin/updateInfo';
  const {auth} = useAuth();

  useEffect(()=>{
    setInitialEmail(info.email || '');
    setEmail(info.email || '');
  }, [info.email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleClose = () => {
    setEmail(initialEmail);
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
          "username" : info.username,
          "email" : email,
          "contact" : info.contact
      }), {headers});
      alert("Updated Successfully");
      closeModal(email);
    }catch(err){
    console.log(err);
    }
  }
    if(!visibility) return null;
  return (
    <div className={styles.emailModal}>
    <button className={styles.closeButton} onClick = {handleClose}>X</button>
    <h3 className = "mb-4">Update Email</h3>
    <form class="form-floating mb-4 w-75">
        <input type="email" className="form-control" id="floatingInputValue" 
            value={email} onChange={handleEmailChange} />
        <label htmlFor="email">Email:</label>
    </form>
    <button type="button" class="btn btn-primary w-50" onClick = {handleUpdate}>Update</button>
    </div>
  )
}

export default EmailModal