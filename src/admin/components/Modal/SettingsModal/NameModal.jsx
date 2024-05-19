import React, { useState,useEffect } from 'react'
import styles from './css/name.module.css';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';

const NameModal = ({visibility,hide,info,closeModal}) => {
  const [fullName,setFullName] = useState('');
  const [initialFullname,setInitialFullname] = useState('');
  
  
  const UPDATE_URL = '/api/admin/updateInfo';
  const {auth} = useAuth();
  useEffect(()=>{
    setInitialFullname(info.fullName || '');
    setFullName(info.fullName || '');
  }, [info.fullName]);

  const handleFullNameChange = (e) => {
    const newFullName = e.target.value;
    setFullName(newFullName);
    
  }

  const handleClose = () => {
    hide();
    setFullName(initialFullname)
  
  }
  
  const handleUpdate = async () => {
    try{
      const headers = {
        Authorization : `Bearer ${auth.accessToken}`,
        'Content-Type' : 'application/json'
      }
      
      const response = await axios.put(UPDATE_URL,JSON.stringify({
          "fullName" : fullName,
          "username" : info.username,
          "email" : info.email,
          "contact" : info.contact
      }), {headers});
      alert("Updated Successfully");
      closeModal(fullName);
    }catch(err){
    console.log(err);
    }
  }
  if(!visibility) return null;
  
  return (
    <div className={styles.nameModal}>
    <button className={styles.closeButton} onClick={handleClose}>X</button>
    <h3 className = "mb-4">Update Fullname</h3>
    <form class="form-floating mb-4 w-75">
        <input type="email" className="form-control" id="floatingInputValue" placeholder="Username"
            value={fullName} onChange={handleFullNameChange}/>
        <label htmlFor="username">Full Name:</label>
    </form>
    <button type="button" class="btn btn-primary w-50" onClick = {handleUpdate}>Update</button>
    </div>
  )
}

export default NameModal