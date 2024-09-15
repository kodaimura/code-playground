import React, { useCallback } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from '../../layouts';
import { PlayGround } from '../../modules';

export const GuestPage: React.FC = () => {
    return (
        <>
            <Header />
            <Container className="mt-4">
                <p>※同一のroomID(任意)を設定したユーザとエディタの共有が可能</p>
                <PlayGround />
            </Container>
        </>
    );
};
