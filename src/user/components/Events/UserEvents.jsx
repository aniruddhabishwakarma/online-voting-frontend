import React, { useEffect, useState, useContext } from 'react'
import styles from './userevents.module.css'
import axios from '../../../api/axios';
import UEventDetails from '../Modals/UEventDetails/UEventDetails';

import UserInfo from '../../../context/UserInfoProvider';
import LoginNotification from '../Modals/Other/LoginNotification';



const UserEvents = () => {
    const EVENT_URL = 'api/users/events/view';
    const [info,setInfo] = useState([]);
    const[filteredEvents,setFilteredEvents] = useState([]);
    const[details,setDetails] = useState(false);
    const[dNotification,setDNotification] = useState(false);
    const[eventStatus,setEventStatus] = useState("");
    const[eventDetails,setEventDetails] = useState({});
    const [userInfo] = useContext(UserInfo);

    useEffect(()=> {
        fetchInformation();
    },[])

    const fetchInformation = async () => {
        try{
            // const headers = {
            //   Authorization : `Bearer ${auth.accessToken}`
            // };
           await axios.get(EVENT_URL)
            .then(response => {
                setInfo(response.data)
                console.log(info)
                setFilteredEvents(response.data)
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
        if(userInfo){
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
       else{
        setDNotification(true);
       }
       }
  return (
   <>
   <section className = {styles.section}>
   <UEventDetails
   visibility = {details}
   hide = {() => setDetails(false)} 
   data = {eventDetails}
   status = {eventStatus}/>

   <LoginNotification
   visibility={dNotification}
   hide = {(e)=> setDNotification(false)}/>

    <div className = {styles.buttons}>
        <button className='btn btn-outline-dark' onClick={() => handleFilterClick("All")}>All</button>
        <button className='btn btn-outline-success'  onClick={() => handleFilterClick("Ongoing")}>Ongoing</button>
        <button className='btn btn-outline-warning'  onClick={() => handleFilterClick("Upcoming")}>Upcoming</button>
        <button className='btn btn-outline-danger'  onClick={() => handleFilterClick("Expired")}>Expired</button>
    </div>
    <div className = {styles.displayEvents}>
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
                    
                        <div className={styles.event} id = {data.id}>
                        <img src={data.eventPhoto} className = {styles.image} alt="" />
                         <p className={styles.eventName}>{data.eventName}</p>
                         <p className ={styles.date}>{ formattedStartDate}-{formattedEndDate}</p>
                         <p className= {`${styles.status} ${statusColorClass}`}>.{status}</p>
                         <button className={styles.viewButton}  onClick = {()=> viewDetails(data)}>View Details</button>
                        </div>
                    </>
                  )
        })
    }
        
        
    </div>

   </section>
   
   </>
  )
}

export default UserEvents