import React, { useEffect, useState } from 'react'
import styles from './register.module.css'
import axios from '../../../api/axios'

const Register = ({visibility,hide,show}) => {
    const[registerData,setRegisterData] = useState({
        "fullName" : "",
        "username" : "",
        "contact" : "",
        "email" : "",
        "password" : ""
    })
    const[error,setError] = useState({
        "fNameError" : "",
        "uNameError" : "",
        "cError" : "",
        "eError" : "",
        "pError" : ""

    })
    const [buttonState, setButtonState] = useState(true); 
    const {fullName,username,contact,email,password} = registerData;
    const REGISTER_URL = '/api/users/auth/register';

    useEffect(()=>{
        if(fullName.length === 0 || username.length === 0 || contact.length === 0 || email.length === 0 || password.length === 0){
            setButtonState(true)
        }else{
            setButtonState(false);
        }
    },[fullName,username,contact,email,password]);

    const closeModal = () => {
        setRegisterData({
            fullName : "",
            username : "",
            contact : "",
            email : "",
            password : ""
        })
        setError({
            fNameError : "",
            uNameError : "",
            cError : "",
            eError : "",
            pError : ""
        })
        hide();
    }
    const validate = (event) => {
        if(contact.length !== 10){
            setError({...error,cError: "Please enter valid contact"})
            event.preventDefault();
        }
        if(password.length <= 8){
            setError({...error,pError : "Password must be of more than 8 characters"})
            event.preventDefault();
        }
    }

    const handleRegister = async () => {
        try{
            validate();
            const headers = {
                'Content-Type' : 'application/json'
              }
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    fullName : fullName,
                    username : username,
                    email : email,
                    contact : contact,
                    password : password,
                    role : "USER"        
                }),{headers});
            console.log(response.data);
            setRegisterData({
                fullName : "",
                username : "",
                contact : "",
                email : "",
                password : ""
            })
            setError({
                fNameError : "",
                uNameError : "",
                cError : "",
                eError : "",
                pError : ""
            })
            hide();
            show(true);
        }catch(err){
            console.log(err);
        }
        
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
<>
    <section className={`${styles.register} animate__animated animate__fadeInDown`}>
        <button className = {styles.closeButton} onClick = {closeModal}>X</button>
        <h3 className = "mb-4">Registration Form</h3>
        <div className="form-floating mb-3 w-75">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" 
            value = {registerData.fullName}
            onChange = {(e)=>setRegisterData({...registerData,fullName : e.target.value})}/>
            <label htmlFor="floatingInput">Full Name</label>
            <span className = "text-danger">{error.fNameError}</span>
        </div>
        <div className="form-floating mb-3 w-75">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            value = {registerData.username}
            onChange = {(e)=>setRegisterData({...registerData,username : e.target.value})} />
            <label htmlFor="floatingInput">Username</label>
            <span className = "text-danger">{error.uNameError}</span>
        </div>
        <div className="form-floating mb-3 w-75">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            value = {registerData.contact} 
            onChange = {(e)=>setRegisterData({...registerData,contact : e.target.value})}/>
            <label htmlFor="floatingInput">Contact</label>
            <span className = "text-danger">{error.cError}</span>
        </div>
        <div className="form-floating mb-3 w-75">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            value= {registerData.email} 
            onChange = {(e)=>setRegisterData({...registerData,email : e.target.value})}/>
            <label htmlFor="floatingInput">Email</label>
            <span className = "text-danger">{error.eError}</span>
        </div>
        <div className="form-floating mb-3 w-75">
            <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com"
            value = {registerData.password} 
            onChange = {(e)=>setRegisterData({...registerData,password : e.target.value})}/>
            <label for="floatingInput">Password</label>
            <span className = "text-danger">{error.pError}</span>
        </div>
        <button className = "btn btn-primary w-75" disabled = {buttonState} onClick={handleRegister}>Register</button>
    </section>
</>
)
}

export default Register;