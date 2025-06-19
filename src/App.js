import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import './App.js';
import Home from './Home.jsx';
import Collections from './Collections.jsx';
import Raffles from './Raffles.jsx';
import Management from './Management.jsx';
import Navigation from './Navigation.jsx';

Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1 className="header-title">
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>ValadezPokedex.com</a>
          </h1>
          <Navigation />
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/raffles" element={<Raffles />} />
            <Route path="/management" element={<Management />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;