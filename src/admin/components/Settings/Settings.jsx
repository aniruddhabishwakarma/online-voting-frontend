import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import './settings.css'
import UsernameModal from '../Modal/SettingsModal/UsernameModal';
import NameModal from '../Modal/SettingsModal/NameModal';
import EmailModal from '../Modal/SettingsModal/EmailModal';
import ContactModal from '../Modal/SettingsModal/ContactModal';
import PasswordModal from '../Modal/SettingsModal/PasswordModal';



const Settings = () => {
  const [info, setInfo] = useState({})
  const [nameVisibility, setNameVisibility] = useState(false);
  const [unameVisibility, setUNameVisibility] = useState(false);
  const [contactVisibility, setContactVisibility] = useState(false);
  const [emailVisibility, setEmailVisibility] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [updateType,setUpdateType] = useState("");
  const LOGIN_URL = 'api/admin/info';
  const {auth} = useAuth();
  

  useEffect(() =>{
    fetchInformation()
  },[])

  const fetchInformation = async () => {
      try{
          const headers = {
            Authorization : `Bearer ${auth.accessToken}`
          };
          axios.get(LOGIN_URL,{headers})
          .then(response => {
            setInfo(response.data)
            
          })
      }catch(err){
        console.log(err.message);
      }
  }
  const toCloseFNameModal = (fullName) => {
    setNameVisibility(false);
    setInfo({...info,fullName : fullName})
  }
 const toCloseEmailModal = (email) => {
  setEmailVisibility(false);
  setInfo({...info,email : email})
 }

 const toCloseContactModal = (contact) => {
  setContactVisibility(false);
  setInfo({...info,contact : contact})
 }

 const toCloseUNameModal = (username) => {
  setUNameVisibility(false);
  setInfo({...info,username : username})
 }
  return (
    <>
        <section className = "settings">
         
            <UsernameModal visibility = {unameVisibility}
            hide = {() => setUNameVisibility(!unameVisibility)}
            info = {info}
            closeModal = {toCloseUNameModal}
            />

            <NameModal visibility = {nameVisibility}
             hide = {() => setNameVisibility(!nameVisibility)}
             info = {info}
             closeModal = {toCloseFNameModal}/>

            <EmailModal visibility = {emailVisibility}
             hide = {() => setEmailVisibility(!emailVisibility)}
             info = {info}
             closeModal = {toCloseEmailModal}/>

            <ContactModal visibility = {contactVisibility}
             hide = {() => setContactVisibility(!contactVisibility)}
             info = {info}
             closeModal = {toCloseContactModal}/>

            <PasswordModal visibility = {passwordVisibility}
            hide = {() => setPasswordVisibility(!passwordVisibility)}
            />
            
           <h1 className='mt-3'>Settings</h1>
           <span><i>(Personalize your information)</i></span>

           <div className = "informations">
            <div className="information">
              <p><b>Name</b></p>
              <p>{info.fullName}</p>
              <button className = "btn btn-light" onClick = {()=> setNameVisibility(true)}>Edit</button>
            </div>
            <div className="information">
              <p><b>Username</b></p>
              <p>{info.username}</p>
              <button className = "btn btn-light" onClick = {()=> setUNameVisibility(true)}>Edit</button></div>
            <div className="information">
              <p><b>E-mail</b></p>
              <p>{info.email}</p>
              <button className = "btn btn-light"  onClick = {()=> setEmailVisibility(true)}>Edit</button>
            </div>
            <div className="information">
              <p><b>Contact</b></p>
              <p>{info.contact}</p>
              <button className = "btn btn-light"  onClick = {()=> setContactVisibility(true)}>Edit</button>
            </div>

            <div className="information">
              <p><b>Password</b></p>
              <p>**********</p>
              <button className = "btn btn-light"  onClick = {()=> setPasswordVisibility(true)}>Edit</button>
            </div>
           </div>
        </section>
    </>
  )
}

export default Settings