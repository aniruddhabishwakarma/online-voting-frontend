import React, { useEffect, useState } from 'react'
import styles from './addevent.module.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';

const AddEvent = ({visibility,hide,fetch}) => {
    const[btnState,setBtnState] = useState(true);
    const[eventName, setEventName] = useState("");
    const[eventDescription,setEventDescription] = useState("");
    const[eventPhoto, setEventPhoto] = useState(null);
    const[startDate,setStartDate] = useState("");
    const[endDate,setEndDate] = useState("");
    const [error,setError] = useState({
        "nameError" : "",
        "descError" : "",
        "fileError" : "",
        "sdateError" : "",
        "eDateError" : ""
    })
    const EVENT_URL = 'api/admin/events/register';
    const {auth} = useAuth();
    const handlesDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
        
        if(selectedDate < currentDate){
            setError({...error,sdateError : "Please enter valid date starting from today"})
        }else{
            setStartDate(event.target.value);
            setError({...error,sdateError : ""})
        }
    }
    const handleEDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const startdate = new Date(startDate)
        
        if(selectedDate <= startdate){
            setError({...error,eDateError : "Please enter valid date"})
        }else{
            setEndDate(event.target.value);
            setError({...error,eDateError:""})
        }
    }
    useEffect(()=>{
        if(eventName.length === 0 || eventDescription.length === 0 || eventPhoto === null || startDate.length === 0 || endDate.length === 0){
            setBtnState(true);
        }else{
            setBtnState(false)
        }
    })
    const handleClose = () => {
        setEventName("");
        setEventDescription("");
        setStartDate("");
        setEndDate("");
        setEventPhoto(null);
        hide();
    }
    const appendFormData = () => {
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);

        const data = {
            "eventName" : eventName,
            "eventDescription" : eventDescription,
            "startDate": sDate.getTime(),
            "endDate" : eDate.getTime()
        }
        let formData = new FormData();
        formData.append('event',JSON.stringify(data));
        formData.append('file', eventPhoto);
        return formData;
    }
    const handleSubmit = async () => {
        try{
            const formData = appendFormData();
            console.log(formData)
            const headers = {
                Authorization : `Bearer ${auth.accessToken}`,
                'Content-Type' : 'multipart/form-data'
              }
              const response = await axios.post(EVENT_URL,formData,{headers})
              alert("Event registered succesfully")
              handleClose();
              fetch();
        }catch(err){
            console.log(err)
        }
        
    }
    if(!visibility) return null;
return (
<div className={styles.eventModal}>
    <button className={styles.button} onClick = {handleClose}>X</button>
    <h3 className={styles.heading}>Add Event</h3>
    <div class="form-floating mb-3">
        <input type="text" className="form-control" id="eventName" placeholder="name@example.com"
        value = {eventName} onChange = {(e)=> setEventName(e.target.value)}/>
        <label for="floatingInput">Event Name</label>
        <span className = {`${styles.span} text-danger`}>{error.nameError}</span>
    </div>
    <div class="form-floating mb-3">
        <textarea className="form-control " placeholder="Leave a comment here" id="eventDescription"
        value = {eventDescription} onChange={(e) => setEventDescription(e.target.value)}></textarea>
        <label for="floatingTextarea">Description</label>
        <span className = {`${styles.span} text-danger`}>{error.descError}</span>
    </div>
    <div class="form-floating mb-3">
        <input type="file" className="form-control" id="eventPhoto" placeholder="name@example.com"
          onChange={(e)=> setEventPhoto(e.target.files[0])}/>
        <label for="floatingInput">Event Banner</label>
        <span className = {`${styles.span} text-danger`}>{error.fileError}</span>
    </div>
    <div class="form-floating mb-3">
        <input type="date" className="form-control" id="startDate" placeholder="name@example.com"
        value = {startDate} onChange = {handlesDateChange}/>
        <label for="floatingInput" >Start Date</label>
        <span className = {`${styles.span} text-danger`}>{error.sdateError}</span>
    </div>
    <div class="form-floating mb-3">
        <input type="date" className="form-control" id="endDate" placeholder="name@example.com"
        value = {endDate} onChange={handleEDateChange}/>
        <label for="floatingInput">End Date</label>
        <span className = {`${styles.span} text-danger`}>{error.eDateError}</span>
    </div>
    <button type="button" class="btn btn-dark" disabled = {btnState} onClick = {handleSubmit}>Submit</button>
</div>
)
}

export default AddEvent