import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand>CODE PLAYGROUND</Navbar.Brand>
            </Container>
        </Navbar>
    );
};
