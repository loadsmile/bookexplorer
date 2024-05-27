import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Modal } from 'react-bootstrap';
import styles from './Navbar.module.css'; // Import the CSS module

const AppNavbar = ({ user, onLogin, onLogout }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogin = () => {
    if (username && password) {
      onLogin(username);
      handleClose();
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="#" style={{ marginLeft: '8px' }}>
          Book Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.customToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            {user ? (
              <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
            ) : (
              <Button variant="outline-success" onClick={handleShow}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;
