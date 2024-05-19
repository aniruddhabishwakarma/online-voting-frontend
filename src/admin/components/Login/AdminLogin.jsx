import React from 'react'
import {useRef,useState,useEffect} from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useLocation} from 'react-router-dom';

import axios from '../../../api/axios';
const LOGIN_URL = '/api/users/auth/login';

const AdminLogin = () =>{
const {setAuth} =useAuth();
const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || "/"

const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const [loginButton,setLoginButton] = useState(false);
const [btnState,setbtnState] = useState(true);
const [error,setError] = useState({
    "uError" : "",
    "pError" : ""
})

const handleForm = () => {
    setError({
        uError : "",
        pError : ""
    })
    setUsername("");
    setPassword("");
}
useEffect(()=>{
if(username.length>=8 && password.length>=8){
setbtnState(false);
}else{
setbtnState(true)
}
},[username,password])

const handleSubmit = async (e) => {
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
    setAuth({username,password,accessToken, admin:true});
// localStorage.setItem("token", accessToken)
    navigate("/admin");
}catch(err){
    console.log(err.response.data.message)
    if(err.response.data.message === "User not found"){
    setError({...error,uError: "Username not found"})
    }

    if(err.response.data.message === "Password Error"){
    setError({...error,pError : "Incorrect password"})
    }

    }
};
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
    <section className="vh-100 gradient-custom" >
        <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card  text-dark" style={{borderRadius : "1rem"}}>
                        <div className="card-body p-4 text-center">

                            <div className="mb-md-5 mt-md-4 pb-1">

                                <h2 className="fw-bold text-primary mb-2 text-uppercase" onClick={handleForm}>Login</h2>
                                <p className="text-primary-50 mb-5">Please enter your Username and Password!</p>


                                <div class="form-floating mb-4">
                                    <input type="text" class="form-control" id="floatingInput3"
                                        placeholder="name@example.com" value={username} onChange={(e)=>
                                    setUsername(e.target.value)}/>
                                    <label for="floatingInput">Username:</label>
                                    <span className="text-danger">{error.uError}</span>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword"
                                        placeholder="Password" value = {password}
                                        onChange={(e)=> setPassword(e.target.value)}/>
                                    <label htmlFor="floatingPassword">Password</label>
                                    <span className="text-danger">{error.pError}</span>
                                </div>
                                <p className="small mb-3 pb-lg-2"><a className="text-dark-50" href="#!">Forgot
                                        password?</a>
                                </p>

                                <button className="btn btn-primary btn-lg px-5" type="submit" disabled={btnState}
                                    onClick={handleSubmit}>Login</button>



                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="#!"
                                        className="text-dark-50 fw-bold">Sign
                                        Up</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>)

}
export default AdminLogin;