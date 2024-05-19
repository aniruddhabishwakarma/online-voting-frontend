import React, { useState } from 'react'
import styles from './events.module.css'
import { useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import axios from '../../../api/axios'
import AddEvent from '../Modal/AddEvent/AddEvent'
import EventDetails from '../Modal/EventDetails/EventDetails'

const Events = () => {
  const LOGIN_URL = 'api/users/events/view';
  const {auth} = useAuth();
  const[info,setInfo] = useState([])

  const[addEventModal, setAddEventModal] = useState(false);
  const[filteredEvents,setFilteredEvents] = useState([]);
  const[details,setDetails] = useState(false);
  const[eventDetails,setEventDetails] = useState({})
  const[eventStatus,setEventStatus] = useState("");

  useEffect(() =>{
    fetchInformation()
  },[]);

  const fetchInformation = async () => {
    try{
        // const headers = {
        //   Authorization : `Bearer ${auth.accessToken}`
        // };
        await axios.get(LOGIN_URL)
        .then(response => {
          setInfo(response.data)
          setFilteredEvents(response.data)
          console.log(info)
          
        })
    }catch(err){
      console.log(err.message);
    }
    };
    
    const filterByStatus = (events, targetStatus) => {
      return events.filter((data)=> {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const today = new Date();
    
        let status = "";
        if (startDate > today) {
          status = "Upcoming";
         
        } else if (startDate < today && endDate > today) {
          status = "Ongoing";
          
        } else {
          status = "Expired";
        }
        
        // Filter events based on targetStatus
        return status === targetStatus;
      });
    
   
}
const handleFilterClick = (targetStatus) => {
  let filtered = [];
  if(targetStatus === "All"){
    filtered = info;
  }else{
    filtered = filterByStatus(info,targetStatus);
    
  }
  setFilteredEvents(filtered);
 
}
 const viewDetails = (data) =>{
  setDetails(true);
  setEventDetails(data);
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const today = new Date();
  let status = '';
  if (startDate > today) {
    status = 'Upcoming';
  } else if (startDate < today && endDate > today) {
    status = 'Ongoing';
  } else {
    status = 'Expired';
  }
  setEventStatus(status);


 }
return (
<>
  <section className= {styles.eventSection}>

  <AddEvent visibility = {addEventModal}
  hide = {()=> setAddEventModal(false)}
  fetch = {fetchInformation}/>

   <EventDetails visibility = {details}
   hide = {() => setDetails(false)} 
   data = {eventDetails}
   status = {eventStatus}/>

    <h1 className = {styles.heading}>Events</h1>
    <div className={styles.displaySection}>
    <button className= {`${styles.addEvent} btn btn-dark`} onClick = {()=>setAddEventModal(true)}>Add Event</button>
    <div className = {styles.buttons}>
    <button className= {`${styles.button} btn btn-primary`} onClick={() => handleFilterClick("All")}>All</button>
      <button className= {`${styles.button} btn btn-warning`} onClick={() => handleFilterClick("Upcoming")}>Upcoming</button>
      <button className= {`${styles.button} btn btn-success`} onClick={() => handleFilterClick("Ongoing")}>Ongoing</button>
      <button className= {`${styles.button} btn btn-danger`} onClick={() => handleFilterClick("Expired")}>Expired</button>
    </div>
    
      <div className= {styles.events}>
        {
          filteredEvents.map((data)=>{

            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const today = new Date();
            const formattedStartDate = startDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const formattedEndDate = endDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            
            
            let status = ""
            if(startDate > today){
               status = "Upcoming"
            }else if(startDate < today && endDate > today){
               status = "Ongoing"
            }else{
               status = "Expired"
            }
            

           let statusColorClass = "";
              switch (status) {
                case "Upcoming":
                  statusColorClass = styles.orange;
                  break;
                case "Ongoing":
                  statusColorClass = styles.green;
                  break;
                case "Expired":
                  statusColorClass =  styles.red;
                  break;
                default:
                  statusColorClass = "" // Default color or no additional class
              }
            
            return (
              <>
              <div key = {data.id}>
                <img src = {data.eventPhoto}
                  className={styles.image} alt="thumbnail" />
                <p className = {styles.eventName}>{data.eventName}</p>
                <p className ={styles.date}>{
                  formattedStartDate
                }-{formattedEndDate}</p>
                <p className= {`${styles.status} ${statusColorClass}`}>.{status}</p>
                <button className = {styles.viewButton} onClick = {()=> viewDetails(data)}>Details</button>
              </div>
              </>
            )
          })
        }
        
      </div>
    </div>
     
  </section>

</>

)
}

export default Events