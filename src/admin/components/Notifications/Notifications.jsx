import React, { useState, useEffect } from 'react'
import styles from './notifications.module.css'
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';



const Notifications = () => {
  const [data,setData] = useState([]);
  const [id, setId] = useState(0);
  const LOGIN_URL = 'api/admin/candidates';
  const {auth} = useAuth();

  useEffect(() => {
    fetchInformation();
  },[])

  const fetchInformation = async () => {
    try{
      const headers = {
        Authorization : `Bearer ${auth.accessToken}`
      };
      await axios.get(LOGIN_URL,{headers})
      .then(response => {
        setData(response.data)
        console.log(response.data)
        
        
      })
  }catch(err){
    console.log(err.message);
  }
  }

  const approveCandidate =  async (id) => {
    try{
    const APPROVAL_URL = `api/admin/approve/${id}`;
      console.log(id)
      const headers = {
        Authorization : `Bearer ${auth.accessToken}`
      };
      await axios.put(APPROVAL_URL,null,{headers})
      .then(response => {
        console.log(response);
        alert("Candidace accepted");
        fetchInformation();
        
      })
  }catch(err){
    console.log(err.message);
  }
  }
  return (
    <>
        <section className={styles.notifications}>
          <h1 className = {styles.title}>Candidate Requests</h1>
          {
            data.length === 0 ? (
              <>
                <div>
                  <h4 className = {styles.noRequests}>Sorry!! There are no candidate requests now.</h4>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqb_YG7i5x99cPS2L9U0EoFEgZgkR6ijtmXgJ74voCPg&s" alt=""
                className={styles.noRequestImage} />
                </div>
              </>
            ) : (
              <div className= {styles.notificationBlock}>
              {
                Array.from(data).map((info) => {
                  let image = `http://localhost:8080/api${info.photo}`
                    return (
                      <>
                      
                      <div className = {styles.notification} key={info.id}>
                <img  className = {styles.image} 
                src={image}
                alt = "Photo" />
                <h5>{info.fullName} Has requested for candidacy</h5>
                <button className = "btn btn-primary mr-2" onClick = {() => approveCandidate(info.id)}>Accept</button>
                <button className = "btn btn-primary">Decline</button>
              </div>
                </>
                    )
                })
              }
             
             
            </div>
            )
          }
           
        </section>
    </>
  )
}

export default Notifications