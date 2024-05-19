import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../../../context/EventProvider';
import styles from './home.module.css'




const Home = () => {


const [info,upcomingEvents,expiredEvents,ongoingEvents] = useContext(EventContext);


console.log(info);
return (
<>

</>

)
}

export default Home