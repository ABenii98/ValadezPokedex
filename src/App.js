import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import CollectionPage from './CollectionPage.jsx';
import RafflesPage from './RafflesPage.jsx';
import ManagementPage from './ManagementPage.jsx';
import './styles.css';

Amplify.configure(awsExports);

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="header-title">ValadezPokedex.com</Link>
            <nav className="header-nav">
              <Link to="/collection" className="nav-link">Collection</Link>
              <Link to="/raffles" className="nav-link">Raffles</Link>
              <Link to="/management" className="nav-link">Management</Link>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CollectionPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/raffles" element={<RafflesPage />} />
            <Route path="/management" element={<ManagementPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
