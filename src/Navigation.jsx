import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="Navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collections">Collections</Link></li>
        <li><Link to="/raffles">Raffles</Link></li>
        <li><Link to="/management">Management</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;