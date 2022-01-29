import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function RouteApp(params) {
    return (
  <Router>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/callback" element={<App />} />        
          </Routes>
    </Router>
  
    );
}


ReactDOM.render(<RouteApp />, document.getElementById('root'));