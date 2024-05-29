import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import BookExplorer from './components/BookExplorer';
import BookshelfPage from './components/BookshelfPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [bookshelves, setBookshelves] = useState([]);
  const [selectedBookshelf, setSelectedBookshelf] = useState({});

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <AppNavbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            user ? (
              <BookExplorer
                bookshelves={bookshelves}
                setBookshelves={setBookshelves}
                selectedBookshelf={selectedBookshelf}
                setSelectedBookshelf={setSelectedBookshelf}
              />
            ) : (
              <div className="mt-5 text-center">
                <h2>Please log in to search for books</h2>
              </div>
            )
          } />
          <Route path="/bookshelves" element={
            user ? (
              <BookshelfPage
                bookshelves={bookshelves}
                selectedBookshelf={selectedBookshelf}
              />
            ) : (
              <div className="mt-5 text-center">
                <h2>Please log in to view your bookshelves</h2>
              </div>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
