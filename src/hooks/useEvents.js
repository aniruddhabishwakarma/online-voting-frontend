import { useContext } from "react";
import EventContext from "../context/EventProvider";

const useEvents = () => {
    const info = useContext(EventContext);
    return info;
}

export default useEvents;