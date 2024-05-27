import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

const BookExplorer = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

  const searchBooks = async () => {
    if (query) {
      setBooks([]);  // Clear the previous results
      setError(null);  // Clear previous errors
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the response
        if (data.items) {
          setBooks(data.items);
          setError(null);
        } else {
          setBooks([]);
          setError('No books found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
      searchBooks();
    }
  };

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
        <Button className="ml-2" onClick={searchBooks}>Search</Button>
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
    </Container>
  );
};

export default BookExplorer;
