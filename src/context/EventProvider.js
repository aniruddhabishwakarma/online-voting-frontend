import React, { createContext, useState,useEffect } from "react";
import axios from "../api/axios";

const EventContext = createContext();

export const EventProvider = ({children}) => {
    const LOGIN_URL = 'api/users/events/view';
    const[info,setInfo] = useState([]);
    const[upcomingEvents, setUpcomingEvents] = useState([]);
    const[ongoingEvents,setOngoingEvents] = useState([]);
    const[expiredEvents,setExpiredEvents] = useState([]);

    const fetchInformation = async () =>{
        try{
            await axios.get(LOGIN_URL)
            .then(response => {
              setInfo(response.data)
              
            })
        }catch(err){
          console.log(err.message);
        }
    }
    useEffect(() => {
        fetchInformation();
    },[])
    useEffect(() => {
        seperateEvents();
    }, [info]);
    
    
    const seperateEvents = () => {
        const today = new Date();

        const upcoming = info.filter(data => new Date(data.startDate) > today);
        const ongoing = info.filter(data => new Date(data.startDate) <= today && new Date(data.endDate) >= today);
        const expired = info.filter(data => new Date(data.endDate) < today);

        setUpcomingEvents(upcoming);
        setOngoingEvents(ongoing);
        setExpiredEvents(expired);
    }

    const contextValue = [info,upcomingEvents,ongoingEvents,expiredEvents]

    return (
        <EventContext.Provider value = {contextValue}>
        {children}
        </EventContext.Provider>
    )

}
export default EventContext;