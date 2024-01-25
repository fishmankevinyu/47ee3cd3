import React, {useState, useEffect} from 'react';
import Call from './Call.jsx';
import LoadingSpinner from './Spinner.jsx';
import List from './List.jsx';
const ActivityFeed = ( {onCallClick} ) => {
    return <List onCallClick={onCallClick} toArchive={true}/>
};

export default ActivityFeed;