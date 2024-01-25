import React, {useState, useEffect} from 'react';

const Call = ({call, onCallClick}) => {
    const icons = {
        'inbound': {
            'missed': 'https://cdn-icons-png.flaticon.com/512/2228/2228048.png',
            'answered': 'https://cdn-icons-png.flaticon.com/512/10779/10779304.png',
            'voicemail': 'https://cdn-icons-png.flaticon.com/512/61/61156.png'
        },
        'outbound': {
            'missed': 'https://cdn-icons-png.flaticon.com/512/4421/4421470.png',
            'answered': 'https://cdn-icons-png.flaticon.com/512/4421/4421470.png',
            'voicemail': 'https://cdn-icons-png.flaticon.com/512/61/61156.png'
        }
    }
    var called_date = call.created_at;
    var hr = called_date.getHours();
    var mi = called_date.getMinutes();
    var time = (hr < 10 ? ("0" + hr): hr) + ":" + (mi < 10 ? ("0" + mi): mi);

    return <div className='call-tab' onClick={()=> {onCallClick(call.id)}}>
        <div className='row'>
            <div className='col-2 icon-container'><img className='icon' src={icons[call.direction][call.call_type]} alt=""/></div>
            <div className='col-6'>
                <div className="caller">{call.from}</div>
                <div className='callee'>From: {call.to}</div>
            </div>
            <div className='col-4 time'>{time}</div>
        </div>

    </div>
}
export default Call;