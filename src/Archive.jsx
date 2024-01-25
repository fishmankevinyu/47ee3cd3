import React, {useState, useEffect} from 'react';
import Call from './Call.jsx';
import LoadingSpinner from './Spinner.jsx';

const Archive = ( {onCallClick} ) => {    
    const [calls, setCalls] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [tabs, setTabs] = useState([]);

    const datetoText = (date) => {
        const dict = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }
        var month = dict[date.getMonth()];
        return month + " " + date.getDate() + ", " + date.getFullYear(); 
    }
    const sortCalls = (newcalls) => {
        if (newcalls.length == 0) {
            setTabs([<hr key='0' className='hr-text' data-content="Nothing here"/>]);
            return newcalls;
        }
        for (var newcall of newcalls) {
            newcall.created_at = new Date (newcall.created_at);
        }
        newcalls.sort((call1, call2)=> {
            var d1 = call1.created_at;
            var d2 = call2.created_at;

            if (d1 == d2) {
                return 0;
            }
            return d1 > d2 ? -1: 1;
        });
        var newtabs = [];
        var d = new Date(newcalls[0].created_at);
        newtabs.push(<hr key={datetoText(d)} className='hr-text' data-content={datetoText(d)}/>);
        for (var i = 0; i < newcalls.length - 1; i++) {
            var d1 = new Date(newcalls[i].created_at);
            var d2 = new Date(newcalls[i+1].created_at);
            d1.setHours(0,0,0,0);
            d2.setHours(0,0,0,0);
            newtabs.push(<Call key={newcalls[i].id} call={newcalls[i]} onCallClick={onCallClick}/>);
            if (d1 - d2 != 0) {
                newtabs.push(<hr key={datetoText(d2)} className='hr-text' data-content={datetoText(d2)}/>);
            }
        }
        newtabs.push(<Call key={newcalls[newcalls.length - 1].id} call={newcalls[newcalls.length - 1]} onCallClick={onCallClick}/>);
        setTabs(newtabs);
    }
    
    const setFeeds = (json) => {
        var newcalls = json.filter(call => (call.is_archived))
        sortCalls(newcalls);
        setCalls(newcalls);
        setLoading(false);
    }

    const resetAll = () => {
        var promises = [];
        setLoading(true);
        console.log(calls);
        for (var call of calls) {
            promises.push(fetch("https://cerulean-marlin-wig.cyclic.app/activities/" + call.id, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({is_archived: false})
            }));
        }
        Promise.all(promises).then(() => {
            fetch("https://cerulean-marlin-wig.cyclic.app/activities")
                .then(response => response.json())
                .then(json => setFeeds(json))
                .catch(error => console.error(error)); 
        });
    }
        
    useEffect(() => {
        setLoading(true);
        fetch("https://cerulean-marlin-wig.cyclic.app/activities")
            .then(response => response.json())
            .then(json => setFeeds(json))
            .catch(error => console.error(error));
    }, []); 

    return (<div className="wrapper"> 

        <div className='container button-container'>
            <div className='row button' onClick={resetAll}>
                <div className='col-2 icon-container'><img className='icon' src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR9Z8YVg9Jk9HD1-ZL-mN1JHQTtciq2_Wp387rwT2unGnyR28nm" alt="" /></div>
                <div className='col-10 button-text'>Unarchive all calls</div>
            </div>
        </div>
        {isLoading ? (<LoadingSpinner/>): <div className='scroll'>{tabs}</div>}        
    </div>);
}

export default Archive;