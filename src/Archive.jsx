import React, {useState, useEffect} from 'react';
import List from './List.jsx';

const Archive = ( {onCallClick} ) => {    
    return <List onCallClick={onCallClick} toArchive={false}/>
}

export default Archive;