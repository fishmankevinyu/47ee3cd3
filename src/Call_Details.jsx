import React, {useState, useEffect} from 'react';
import LoadingSpinner from './Spinner.jsx';

const Call_Details = ({callid}) => {
    const [call, setCall] = useState({});
    const [isLoading, setLoading] = useState(false);
    const setDetail = (json) => {
        console.log(json);
        setCall(json);
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        fetch("https://cerulean-marlin-wig.cyclic.app/activities/" + callid)
            .then(response => response.json())
            .then(json => setDetail(json))
            .catch(error => console.error(error));
    }, []); 

    return isLoading ? (<LoadingSpinner/>): (<div className="details-contianer">
            <div>Date: {call.created_at}</div>
            <div>From: {call.from}</div>
            <div>To: {call.to}</div>
            <div>Via: {call.via}</div>
            <div>Duration: {call.duration}</div>
            <div>Direction: {call.direction}</div>
            <div>Status: {call.call_type}</div>
        </div>);
}
export default Call_Details;