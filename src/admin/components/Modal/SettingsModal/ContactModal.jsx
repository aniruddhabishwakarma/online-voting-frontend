import React, { useState, useEffect} from 'react'
import styles from './css/contact.module.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';


const ContactModal = ({visibility,hide,info,closeModal}) => {
  const [contact,setContact] = useState('');
  const [initialContact,setInitialContact] = useState('');
  const UPDATE_URL = '/api/admin/updateInfo';
  const {auth} = useAuth();

  useEffect(()=>{
    setInitialContact(info.contact || '');
    setContact(info.contact || '');
  }, [info.contact]);
  
  const handleContactChange = (e) => {
    setContact(e.target.value)
  }

  const handleClose = () => {
    setContact(initialContact);
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
          "email" : info.email,
          "contact" : contact
      }), {headers});
      alert("Updated Successfully");
      closeModal(contact);
    }catch(err){
    console.log(err);
    }
  }
    if(!visibility) return null;
    
  return (
    <div className={styles.contactModal}>
    <button className={styles.closeButton} onClick = {handleClose}>X</button>
    <h3 className = "mb-4">Update Contact</h3>
    <form class="form-floating mb-4 w-75">
        <input type="text" className="form-control" id="floatingInputValue" 
            value={contact} onChange={handleContactChange}/>
        <label htmlFor="email">Contact</label>
    </form>
    <button type="button" class="btn btn-primary w-50" onClick = {handleUpdate}>Update</button>
    </div>
  )
}

export default ContactModal