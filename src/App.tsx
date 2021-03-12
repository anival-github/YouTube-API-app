import React from 'react';
import LinksPanel from './components/LinksPanel/LinksPanel';
import SearchPanel from './components/SearchPanel/SearchPanel';
import VideoContainer from './components/VideoContainer/VideoContainer';

function App() {
  return (
    <div>
      <LinksPanel />
      <SearchPanel />
      <VideoContainer />
    </div>
  );
}

export default App;
