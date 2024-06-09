import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API_KEY
  
  // apiKey = '2f431e06ad64407e8b29eb3049ba9510'

  state = {
    progress : 0
  }

  setProgress = (progress) =>{
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="general" pageSize={12} country="in" category="general" />} />
            <Route path="/education" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="education" pageSize={12} country="in" category="education" />} />
            <Route path="/science" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="science" pageSize={12} country="in" category="science" />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="entertainment" pageSize={12} country="in" category="entertainment" />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="sports" pageSize={12} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="technology" pageSize={12} country="in" category="technology" />} />
            <Route path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="health" pageSize={12} country="in" category="health" />} />
          </Routes>
        </Router>
        <LoadingBar color='#f11946' progress={this.state.progress} />
      </div>
    );
  }
}
