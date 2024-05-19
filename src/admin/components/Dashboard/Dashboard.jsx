import React, { useContext, useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import EventContext from '../../../context/EventProvider'
import axios from '../../../api/axios'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

const[data,setData] = useState([]);
const[count,setCount] = useState(null);
const[adminInfo,setAdminInfo] = useState({});
const {auth} = useAuth();
const navigate = useNavigate();
const UNAPPROVED = 'api/admin/candidates';
const TOTAL = 'api/admin/candidates/count';
const LOGIN_URL = 'api/admin/info';

useEffect(() => {
fetchInformation();
},[])

useEffect(() => {
fetchCount();
},[]);

useEffect(() => {
fetchAdminInfo();
},[]);

const fetchAdminInfo = async () => {
try{
const headers = {
Authorization : `Bearer ${auth.accessToken}`
};
axios.get(LOGIN_URL,{headers})
.then(response => {
setAdminInfo(response.data)

})
}catch(err){
console.log(err.message);
}
}
const fetchInformation = async () => {
try{
const headers = {
Authorization : `Bearer ${auth.accessToken}`
};
await axios.get(UNAPPROVED,{headers})
.then(response => {
setData(response.data)
console.log(response.data)


})
}catch(err){
console.log(err.message);
}
}

const fetchCount = async () => {
try{
const headers = {
Authorization : `Bearer ${auth.accessToken}`
};
await axios.get(TOTAL,{headers})
.then(response => {
setCount(response.data)
console.log(response.data)
})
}catch(err){
console.log(err.message);
}
}
const redirect = () => {
navigate('/admin/notifications')
}

const [info,upcomingEvents,ongoingEvents,expiredEvents] = useContext(EventContext);

return (
<>
  <section className={styles.dashboard}>
    <div className= {`${styles.row1} row mb-5`}>
      <div className={`${styles.welcome} col-md-6`}>
        <h1>Welcome!</h1>
        <h3>{adminInfo.fullName}</h3>
      </div>
      <div className={styles.events}>
        <div className={styles.eventCount}>
          <h3>{info.length}</h3> Total Events
        </div>

        <div className={styles.upcomingCount}>
          <h3>{upcomingEvents.length}</h3> Upcoming Events
        </div>

        <div className={styles.ongoingCount}>
          <h3>{ongoingEvents.length}</h3> Ongoing Events
        </div>

        <div className={styles.expiredCount}>
          <h3>{expiredEvents.length}</h3> Expired Events
        </div>
      </div>
    </div>
    <div className = {`${styles.row2} row`}>
      <div className="col-6 p-3">
        <img 
        className = {styles.graphImage}
        src="https://st2.depositphotos.com/2856503/11826/v/450/depositphotos_118269064-stock-illustration-infographic-dashboard-template-with-flat.jpg" alt="" />
      </div>
      <div className="col-6">
      <div className={`${styles.candidates}`}>
      <div className={styles.totalCandidates}>
        <h3>{count}</h3> total candidates
      </div>
      <div className={styles.unApprovedCandidates} onClick={redirect}>
        <h3>{data.length}</h3> UnApproved Candidates
      </div>
    </div>
      </div>

    </div>
    
  </section>
</>


)
}

export default Dashboard