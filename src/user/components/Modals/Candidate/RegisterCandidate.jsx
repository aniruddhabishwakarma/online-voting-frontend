import React, { useContext, useState } from 'react'
import styles from './registercandidate.module.css'
import UserContext from '../../../../context/UserInfoProvider'
import axios from '../../../../api/axios'
import useAuth from '../../../../hooks/useAuth'
import { useEffect } from 'react'

const RegisterCandidate = ({data,visibility,hide}) => {
    const [image,setImage] = useState(null);
    const [description,setDescription] = useState("");
    const [btnState,setBtnState] = useState(true);

    const {auth} = useAuth();
    const [userInfo] = useContext(UserContext);
    const REGISTER_CANDIDATE = '/api/user/candidate/register'
    const info = {
        "eventId" : data.id,
        "userId" : userInfo.id,
        "username" : userInfo.username,
        "description" : description
    }

    useEffect(()=>{
        if(description.length === 0 || image === null){
            setBtnState(true);
        }else{
            setBtnState(false);
        }
    },[description,image])

    const appendFormData = () => {
        
        let formData = new FormData();
        formData.append('data',JSON.stringify(info));
        formData.append('file',image);
        return formData;
    }

    const registerCandidate = async () => {
       try{
        const formData = appendFormData();
        const headers = {
            Authorization : `Bearer ${auth.accessToken}`,
            'Content-Type' : 'multipart/form-data'
          }
          const response = await axios.post(REGISTER_CANDIDATE,formData,{headers})
         alert("Your candidacy has been submitteed");
         setImage(null);
         setDescription("");
         hide();
       }catch(err){
        console.log(err);
        alert("You have already been registered as candidate");
        setImage(null);
        setDescription("");
        hide();
       }
    }
    if(!visibility) return null;
return (
<>
    <section className={styles.registration}>
    <button className = {styles.closeButton} onClick = {hide}>X</button>
        <div className={styles.image}>
            <img src="https://img.freepik.com/premium-vector/vector-illustration-register-now-speech-bubble-label_180786-180.jpg"
                alt="" />
        </div>
        <div className={styles.registerSection}>
            <h1 className = "mb-5">Candidate Registration</h1>
            <div class="form-floating mb-4 w-75">
                <input type="file" className="form-control" id="floatingInput" placeholder="name@example.com" 
                onChange = {(e) => setImage(e.target.files[0])}/>
                <label htmlFor="floatingInput">Display Picture</label>
            </div>
            <div className="form-floating mb-5 w-75">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                value = {description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
                <label for="floatingTextarea">Description</label>
            </div>
         <button className = "w-50 btn btn-primary" disabled = {btnState} onClick = {registerCandidate}>Register</button> 
        </div>
    </section>
</>
)
}

export default RegisterCandidate