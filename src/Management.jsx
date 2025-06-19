import React, { useEffect, useState } from 'react';

import { getCurrentUser } from 'aws-amplify/auth';





function Management() {
  const [userGroup, setUserGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"] || [];
        if (groups.includes("Admin")) {
          setUserGroup("Admin");
        } else {
          setUserGroup("User");
        }
        setLoading(false);
      })
      .catch(() => {
        setUserGroup(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (userGroup !== "Admin") {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <header className="App-header">
      <h1>Management Page</h1>
      <p>Manage your account, settings, and preferences here.</p>
    </header>
  );
}

export default Management;
