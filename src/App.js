import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={12} country="in" category="general" />} />
          <Route path="/education" element={<News setProgress={setProgress} apiKey={apiKey} key="education" pageSize={12} country="in" category="education" />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={12} country="in" category="science" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={12} country="in" category="entertainment" />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={12} country="in" category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={12} country="in" category="technology" />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={12} country="in" category="health" />} />
        </Routes>
      </Router>
      <LoadingBar color='#f11946' progress={progress} />
    </div>
  );
}

export default App;
