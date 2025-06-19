import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { getCurrentUser } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Home from './Home.jsx';
import Collections from './Collections.jsx';
import Raffles from './Raffles.jsx';
import Management from './Management.jsx';
import Navigation from './Navigation.jsx';

Amplify.configure(awsExports);

function App() {
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"] || [];
        if (groups.includes("Admin")) setUserGroup("Admin");
        else setUserGroup("User");
      })
      .catch(() => {
        setUserGroup(null); // Not logged in
      });
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="App">
            <header className="app-header">
              <h1 className="header-title">
                <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                  ValadezPokedex.com
                </a>
              </h1>
              <Navigation />
              <button onClick={signOut}>Sign Out</button>
            </header>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/raffles" element={<Raffles />} />
                {/* Only show Management if user is Admin */}
                <Route
                  path="/management"
                  element={
                    userGroup === "Admin" ? (
                      <Management />
                    ) : userGroup === null ? (
                      <div>Loading...</div>
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
