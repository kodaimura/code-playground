import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container } from 'react-bootstrap';

import { Header } from '../../layouts';
import { PlayGround } from '../../modules';

export const GuestPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container className="mt-4">
        ※同一のroomID(任意)を設定したユーザとエディタの共有が可能
        <PlayGround />
        <Button className="mt-3" onClick={() => navigate('/')}>Go Back</Button>
      </Container>
    </>
  );
};
