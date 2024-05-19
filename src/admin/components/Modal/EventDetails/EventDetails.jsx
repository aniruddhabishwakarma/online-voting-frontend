import React, { useEffect } from 'react'
import styles from './details.module.css'
import { useState } from 'react'
import axios from '../../../../api/axios'

const EventDetails = ({visibility,hide,data,status}) => {
  console.log(data.id)

  const [approved,setApproved] = useState([]);
  const [showTables,setShowTables] = useState(false);
  const [results,setResults] = useState([]);
  const CANDIDATE_URL = `/api/users/candidates/${data.id}`
  const RESULT_URL = `/api/users/vote/results/${data.id}`
  

  useEffect(()=>{
    const fetchInformation = async () => {
      try{
        await axios.get(CANDIDATE_URL)
        .then(response => {
          setApproved(response.data)
          console.log(approved);
        })
    }catch(err){
      console.log(err.message);
    }};
    fetchInformation();
  },[data.id])

  useEffect(()=>{
    const fetchResult = async () => {
      try{
        await axios.get(RESULT_URL)
        .then(response => {
          setResults(response.data)
          console.log(results);
        })

    }catch(err){
      console.log(err.message);
    }};

    fetchResult();
  },[data.id])
  
const hideModal = () => {
  setShowTables(false);
  hide();
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
let content = null;


switch(status){
  case 'Expired' :
    content = (
      <>
      <button className = {styles.tabularData} onClick = {() => setShowTables(true)}>View Tablular Data</button>
      <section className = {styles.expired}>
      
      {
        showTables ? (
          <table className="table table-dark table-hover w-75 mt-4">
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Vote Count</th>
              <th scope="col">Position</th>
            </tr>
          </thead>
          <tbody>
          {
        Array.from(results).map((result) => {
        return (<>
          <tr key={result.candidateId}>
            <td scope="row">{result.fullName}</td>
            <td>{result.candidateDescription}</td>
            <td>{result.count}</td>
          </tr>
        </>
        )
        })
        }
          </tbody>
        </table>
        
        ) : (
        <>
        {
          results.length > 0 && (
           <>
            <div className={styles.results} key={0}>
        <img src={`http://localhost:8080/api${results[1].photo}`} alt="" className={styles.resultImage} />
        <h3 className="mt-2">{results[1].fullName}</h3>
        <h5>(Second)</h5>
      </div>
      <div className={styles.results} key={1}>
        <img src={`http://localhost:8080/api${results[0].photo}`} alt="" className={styles.resultImage} />
        <h3 className="mt-2">{results[0].fullName}</h3>
        <h5>(First)</h5>
      </div>
      <div className={styles.results} key={2}>
        <img src={`http://localhost:8080/api${results[2].photo}`} alt="" className={styles.resultImage} />
        <h3 className="mt-2">{results[2].fullName}</h3>
        <h5>(Third)</h5>
      </div>
   
           </>
          )
        }
       
        </>
      )}
    </section>
      </>
     
    );
    break;
  case 'Ongoing':
    content = (
      <>
      
      <section className = {styles.ongoing}>
        {
          Array.from(approved).map((candidate)=>{
            let image = `http://localhost:8080/api${candidate.photo}`
            return (
                 <div className = {styles.contestants} key = {candidate.id}>
                  <img src={image} className = {styles.images} alt="" />
                  <h3 className = 'mt-2'>{candidate.fullName}</h3>
                  </div> 
              
              )
          })
        }
       
       
      </section>
      </>

    );
    break;
  case 'Upcoming':
    content = (
      <>
      {approved.length === 0 ? (
        <h2>No Contestants Registered yet</h2>
      ) : (
        <div className={styles.upcomingCandidates}>
          {Array.from(approved).map((info) => {
            let image = `http://localhost:8080/api${info.photo}`;
            return (
              <div className={styles.upcomingCandidate} key={info.id}>
                <img src={image} className={styles.upcomingPhoto} alt="" />
                <h4>{info.fullName}</h4>
                <span>
                  <i>{info.description}</i>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>

    );
    break;
    default:
      content = null;
}
return (
<div className={styles.details}>
  <button className={styles.close} onClick={()=> hideModal()}>X</button>
  <h1 className="mb-4">{data.eventName}</h1>
  {content}
  
</div>
)
}

export default EventDetails