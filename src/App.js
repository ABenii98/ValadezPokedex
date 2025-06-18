import React, { useState, useEffect } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'https://cdn.jsdelivr.net/npm/react-router-dom@6.26.2/+esm';
import { Amplify, Auth } from 'https://cdn.jsdelivr.net/npm/aws-amplify@6.0.5/+esm';
import CollectionPage from './CollectionPage.jsx';
import RafflesPage from './RafflesPage.jsx';
import ManagementPage from './ManagementPage.jsx';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'your-user-pool-id'
    userPoolWebClientId: 'your-client-id',
  },
  API: {
    endpoints: [
      {
        name: 'PokemonTradingAPI',
        endpoint: 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod',
      },
    ],
  },
});

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
        setIsAdmin(groups.includes('Admin'));
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">ValadezPokedex.com</Link>
            <nav className="space-x-4">
              <Link to="/collection" className="hover:underline">Collection</Link>
              <Link to="/raffles" className="hover:underline">Raffles</Link>
              {isAdmin && (
                <Link to="/management" className="hover:underline">Management</Link>
              )}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              ) : (
                <Link to="/login" className="hover:underline">Login</Link>
              )}
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CollectionPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/raffles" element={<RafflesPage />} />
            <Route
              path="/management"
              element={isAdmin ? <ManagementPage /> : <Navigate to="/collection" />}
            />
            <Route path="/login" element={<div>Login Page (TBD)</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;