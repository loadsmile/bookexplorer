import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const BookshelfPage = ({ bookshelves, selectedBookshelf }) => {
  return (
    <Container className="mt-5">
      <h2 className="text-center">My Bookshelves</h2>
      {bookshelves.length === 0 ? (
        <div className="text-center">No bookshelves created yet.</div>
      ) : (
        bookshelves.map((shelf) => (
          <div key={shelf}>
            <h3 className="mt-4">{shelf}</h3>
            <Row>
              {Object.entries(selectedBookshelf)
                .filter(([bookId, details]) => details.bookshelfName === shelf)
                .map(([bookId, details]) => (
                  <Col key={bookId} sm={6} md={4} lg={3} className="mb-4">
                    <Card>
                      <Card.Img variant="top" src={details.imageLinks?.thumbnail} alt={details.title} />
                      <Card.Body>
                        <Card.Title>{details.title}</Card.Title>
                        <Card.Text>{details.authors?.join(', ')}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))
      )}
    </Container>
  );
};

export default BookshelfPage;
