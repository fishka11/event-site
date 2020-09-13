import React from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Layout from '../Components/layout';

const Home = () => {
  return (
    <Layout>
      <Jumbotron fluid>
        <Container>
          <h1>To jest Strona startowa</h1>
        </Container>
      </Jumbotron>
    </Layout>
  );
};

export default Home;
