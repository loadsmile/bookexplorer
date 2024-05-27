import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookExplorer from './components/BookExplorer';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
      {user ? (
        <BookExplorer />
      ) : (
        <div className="mt-5 text-center">
          <h2>Please log in to search for books</h2>
        </div>
      )}
    </div>
  );
};

export default App;
