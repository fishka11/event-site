import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Layout from '../templates/siteTemplate';

import { CURRENT_EVENT } from '../const';

import notFoundStyles from './notFound.module.scss';

const GenericNotFound = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          events {
            eventName
            eventFullName
          }
        }
      }
    `
  );
  const currentEvent = data.graphcms.events.find(
    (event) => event.eventName.toLowerCase() === CURRENT_EVENT.toLowerCase()
  );
  return (
    <Layout>
      <Container className={notFoundStyles.container}>
        <section>
          <h1 className={notFoundStyles.h1}>404</h1>
          <h2 className={notFoundStyles.h2}>
            Strona o takim adresie nie istnieje
          </h2>
          <p className={notFoundStyles.paragraph}>
            Zapraszamy na stronę główną
          </p>
          <p className={notFoundStyles.paragraph}>
            <a className={notFoundStyles.link} href="/">
              {currentEvent.eventFullName}
            </a>
          </p>
        </section>
      </Container>
    </Layout>
  );
};

export default GenericNotFound;
