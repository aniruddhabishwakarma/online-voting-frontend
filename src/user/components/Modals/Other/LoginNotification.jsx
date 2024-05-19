import React from 'react'
import styles from './lnotification.module.css'
import { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'

const LoginNotification = ({visibility,hide}) => {

    const navigate = useNavigate();
    const loginNotify = () => {
        navigate("/login")

    }
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
          hide();
      }
  };

  useEffect(() => {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
          document.removeEventListener('keydown', handleEscapeKey);
      };
  }, []);
    if(!visibility) return null;
  return (
    <div className = {styles.notification} onClick = {hide}>
        <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/alert-triangle-orange-512.png" 
        className = {styles.image} alt="" />
        <span className='text-warning mb-3'>You need to login to see the details</span>
        <button className='btn btn-warning text-light w-50' onClick = {loginNotify}>Login</button>
    </div>
  )
}

export default LoginNotification