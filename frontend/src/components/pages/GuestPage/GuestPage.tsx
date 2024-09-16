import React from 'react';
import { Container } from 'react-bootstrap';

import { Header } from '../../layouts';
import { PlayGround } from '../../modules';

export const GuestPage: React.FC = () => {
    return (
        <>
            <Header />
            <Container className="mt-4">
                <PlayGround />
            </Container>
        </>
    );
};
