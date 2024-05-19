import React, { useEffect, useState } from 'react'
import styles from './userlogin.module.css'
import Register from './Register'
import Registration from '../Success/Registration';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import useUserInfo from '../../../hooks/useUserInfo';




const Login = () => {
  const [register,setRegister] = useState(false);
  const [registration,setRegistration] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loginButton,setLoginButton] = useState(true);
  const [error,setError] = useState({
    "unameError" : "",
    "pError" : ""
  })

  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/" 
  const LOGIN_URL = '/api/users/auth/login'
 const [userInfo,fetchUserInfo] = useUserInfo();
  
  

  const handleRegister = () => {
    setRegister(true);
  }
  const showRegistration = (isTrue) => {
    setRegistration(isTrue);
  }
  useEffect(()=>{
    if(username.length === 0 || password.length ===0){
      setLoginButton(true);
    }else{
      setLoginButton(false);
    }
  },[username,password])

  const handleSubmit = async () => {
    try{
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({
        username : username,
        password : password
        }),
        {
        headers : {
        'Content-Type' : 'application/json'
        },
        withCredentials : true
        }
        );
        const accessToken = response?.data?.token;
        setAuth({username,password,accessToken, user:true});
        fetchUserInfo();
        // localStorage.setItem("token", accessToken)
        console.log(accessToken)
        
        navigate("/");
    }catch(err){
      console.log(err);
      // if(err.response.data.message === "User not found"){
      //   setError({...error,unameError: "Username not found"})
      //   }
        
      //   if(err.response.data.message === "Password Error"){
      //       setError({...error,pError : "Incorrect password"})
      //   }
    }
  }
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter' && !loginButton) {
        handleSubmit();
    }
};

useEffect(() => {
  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default behavior of the Enter key
          if (!loginButton) {
              handleSubmit();
          }
      }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => {
      document.removeEventListener('keydown', handleKeyDown);
  };
}, [loginButton, handleSubmit]);

return (
<>

  <section className={styles.loginSection}>
  <Register visibility = {register}
  hide = {()=>setRegister(false)}
  show = {showRegistration}/>
  <Registration visibility = {registration}
  hide = {() => setRegistration(false)}
  show = {showRegistration}/>
    <div className={styles.login}>
      <h3 className = "mb-2">Login Form</h3>
      <p className = "mb-5">(Login Here To Get Started)</p>
      <div class="form-floating mb-4 w-75">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
        value = {username}
        onChange={(e)=> setUsername(e.target.value)} />
        <label for="floatingInput">Username</label>
        <span className = 'text-danger'>{error.unameError}</span>
      </div>
      <div class="form-floating mb-4 w-75">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
        value = {password}
        onChange = {(e)=> setPassword(e.target.value)}/>
        <label for="floatingPassword">Password</label>
        <span className = 'text-danger'>{error.pError}</span>
      </div>
      <button className= {`${styles.registerButton} mb-4`} onClick = {handleRegister}>Not registered yet! Click here to register</button>
      <button className = "btn btn-primary w-75" disabled = {loginButton} onClick = {handleSubmit}>Login</button>
    </div>

  </section>
  
</>
)
}

export default Login