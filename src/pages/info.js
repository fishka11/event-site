import React from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Layout from '../Components/layout';

const Info = () => {
  return (
    <Layout>
      <Jumbotron fluid>
        <Container>
          <h1>To są Informacje organizacyjne</h1>
        </Container>
      </Jumbotron>
    </Layout>
  );
};

export default Info;
