import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home.jsx';
import Collections from './Collections.jsx';
import Raffles from './Raffles.jsx';
import Management from './Management.jsx';
import Navigation from './Navigation.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/raffles" element={<Raffles />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;