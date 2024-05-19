import React, { useState,useEffect, useContext } from 'react'
import styles from './ueventdetails.module.css'
import RegisterCandidate from '../Candidate/RegisterCandidate';
import axios from '../../../../api/axios';
import UserContext from '../../../../context/UserInfoProvider';
import useAuth from '../../../../hooks/useAuth';

const UEventDetails = ({visibility,hide,data,status}) => {


const [register,setRegister] = useState(false);
const [approved,setApproved] = useState([]);
const [showTables,setShowTables] = useState(false);
const [selectedContestant, setSelectedContestant] = useState(null);
const [results,setResults] = useState([]);


const CANDIDATE_URL = `/api/users/candidates/${data.id}`;
const VOTE_URL = '/api/user/vote'
const RESULT_URL = `/api/users/vote/results/${data.id}`;
const [userInfo] = useContext(UserContext);
const {auth} = useAuth();

const hideModal = () => {
setShowTables(false);
hide();
}


useEffect(()=>{
const fetchInformation = async () => {
try{
await axios.get(CANDIDATE_URL)
.then(response => {
console.log(response.data)
setApproved(response.data)
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

const registerCandidate = () => {
setRegister(true);
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

const handleSelectContestant = (contestant) => {
setSelectedContestant(contestant);
};

const voteSubmit = async () => {
try{
const headers = {
Authorization : `Bearer ${auth.accessToken}`
};

const response = await axios.post(VOTE_URL,{
"candidateId" : selectedContestant.id,
"voterId" : userInfo.id,
"eventId" : data.id
}, {headers});
alert(response.data.message)

}catch(err){
alert(err.message)
}

}
if(!visibility) return null;
let content = null;
switch(status){
case 'Expired' :
content = (
<>
  <button className={styles.tabularData} onClick={()=> setShowTables(true)}>View Tablular Data</button>
  <section className={styles.expired}>

    {
    showTables ? (
    <table className="table table-light table-hover w-75 mt-4">
      <thead>
        <tr>
          <th scope="col">Full Name</th>
          <th scope="col">Description</th>
          <th scope="col">Count</th>
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
    )}
  </section>

</>
);
break;
case 'Ongoing':
content = (
<>

  <section className={styles.ongoing}>
    <div className={styles.contestantsSection}>
      {
      Array.from(approved).map((candidate)=>{
      let image = `http://localhost:8080/api${candidate.photo}`
      return (<>
        <div className={styles.contestants}>
          <img src={image} className={styles.images} alt="" />
          <h3 className='mt-3'>{candidate.fullName}</h3>
          <label>
            <input type="radio" name="contestant" value={candidate.id} checked={selectedContestant &&
              selectedContestant.id===candidate.id} onChange={()=> handleSelectContestant(candidate)}
            />
          </label>
        </div>

      </>)
      })
      }


    </div>
    <button className='btn btn-primary w-25' onClick={voteSubmit}>Submit Vote</button>
  </section>
</>

);
break;
case 'Upcoming':
content = (
<>
  <RegisterCandidate data={data} visibility={register} hide={(e)=> setRegister(false)}/>

    <div className={styles.registeredCandidates}>
      {Array.from(approved).map((info)=>{
      let image = `http://localhost:8080/api${info.photo}`
      return(<>
        <div className={styles.registeredCandidate} key={info.id}>
          <img src={image} className={styles.registeredImage} alt="" />
          <h5>{info.fullName}</h5>
          <span>{info.description}</span>
        </div>

      </>)
      })}
    </div>
    {
    approved.length < 3 || approved===0 ? ( <button className={`${styles.upcoming} btn btn-dark text-light`}
      onClick={registerCandidate}>
      Register As Candidate
      </button>
      ) : (
      <button className={`${styles.upcoming} btn btn-dark text-light`} disabled>
        Registration Closed
      </button>
      )
      }
    </>
    );
    break;
    default:
    content = null;
    }
    return (
    <div className={styles.details}>
      <button className={styles.close} onClick={hideModal}>X</button>
      <h1 className="mb-2">{data.eventName}</h1>
      {content}
    </div>
    )
    }


    export default UEventDetails;