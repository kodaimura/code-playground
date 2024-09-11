import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <h5>Code Playground</h5>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
