import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Row, Col, Card, Alert } from 'react-bootstrap';

const BookExplorer = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const maxResults = 40; // Maximum allowable value
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

  const searchBooks = async (newQuery = query, newStartIndex = startIndex) => {
    if (newQuery) {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Clear previous errors
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${newQuery}&startIndex=${newStartIndex}&maxResults=${maxResults}&key=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.items) {
          setBooks(prevBooks => [...prevBooks, ...data.items]); // Append new results to existing books
          setError(null);
        } else {
          if (newStartIndex === 0) {
            setBooks([]);
            setError('No books found');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
      setBooks([]); // Clear previous results
      setStartIndex(0); // Reset startIndex
      searchBooks(query, 0); // Fetch new results
    }
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    setStartIndex(prevIndex => prevIndex + maxResults);
  }, [loading]);

  useEffect(() => {
    if (startIndex !== 0) {
      searchBooks(query, startIndex);
    }
  }, [startIndex]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Book Explorer</h2>
      <Form className="d-flex justify-content-center">
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-50"
          onKeyDown={handleKeyDown}
        />
      </Form>
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      <Row className="mt-4">
        {books.map((book) => (
          <Col key={book.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <Card.Body>
                <Card.Title>{book.volumeInfo.title}</Card.Title>
                <Card.Text>{book.volumeInfo.authors?.join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && <div className="text-center">Loading...</div>}
    </Container>
  );
};

export default BookExplorer;
