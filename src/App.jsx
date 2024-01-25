import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import Call_Details from './Call_Details.jsx';
import Archive from './Archive.jsx';
import Footer from './Footer.jsx';

const App = () => {
  const [showCallDetails, setShowDetails] = useState(0);
  const [id, setId] = useState("");
  const handleActivityClick = () => {
    setShowDetails(0)
  }
  const handleArchiveClick = () => {
    setShowDetails(1)
  }
  const handleCallClickOn = (id) => {
    setShowDetails(2)
    setId(id)
  }

  let main_content;
  if (showCallDetails == 0) {
    main_content = (<ActivityFeed onCallClick={handleCallClickOn} />);
  }
  else if (showCallDetails == 1) {
    main_content = (<Archive  onCallClick={handleCallClickOn} />);
  }
  else {
    main_content = (<Call_Details callid={id}/>);
  }

  return (
    <div className='app-container'>
      <Header className='row' onActivity={handleActivityClick} onArchive={handleArchiveClick} screenSelected={showCallDetails}/>
      <div className="container-view container">
        {main_content}
      </div>
      <Footer onActivity={handleActivityClick} screenSelected={showCallDetails}/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
