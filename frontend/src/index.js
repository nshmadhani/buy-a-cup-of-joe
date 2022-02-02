import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';



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