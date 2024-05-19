import React from 'react'
import styles from './registration.module.css'

const Registration = ({visibility,hide}) => {
    const closeModal = () => {
        hide();
    }
    if(!visibility) return null;
  return (
    <div className = {`${styles.success} animate__animated animate__fadeIn `}>
        <button className = {styles.closeButton} onClick = {closeModal}>X</button>
        <img src="https://img.freepik.com/premium-vector/check-mark-tick_564974-1455.jpg"
        className = {styles.picture} alt="" />
    <h3 className = "text-success"><i>Registration Successful</i></h3>
    </div>
  )
}

export default Registration