import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Layout from '../templates/siteTemplate';

import { CURRENT_EVENT } from '../constans';

const Register = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          events {
            eventName
          }
        }
      }
    `
  );
  const currentEvent = data.graphcms.events.find(
    (event) => event.eventName.toLowerCase() === CURRENT_EVENT.toLowerCase()
  );
  return (
    <Layout slug="rejestracja">
      <Container>
        <h1>Zarejestruj się</h1>
        <section>
          <iframe
            src={`https://www.ksoin.pl/${currentEvent.eventName}-rejestracja/`}
            marginWidth="0"
            marginHeight="0"
            width="100%"
            height="2500px"
            frameBorder="0"
            title="Formularz rejestracyjny"
          />
        </section>
      </Container>
    </Layout>
  );
};

export default Register;
