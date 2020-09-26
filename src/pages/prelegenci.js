import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../templates/siteTemplate';
import { CURRENT_EVENT, ROLE_SPEAKER } from '../constans';

import prelegenciStyles from './prelegenci.module.scss';

const Speakers = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          conferees {
            id
            title
            firstName
            lastName
            description
            photo {
              url
            }
            events
            roleKBB
            roleKBN
            roleKOIN
            roleZPO
          }
        }
      }
    `
  );

  const filteredSpeakers = data.graphcms.conferees
    .filter((conferee) =>
      conferee.events.find(
        (event) => event.toLowerCase() === CURRENT_EVENT.toLowerCase()
      )
    )
    .filter(
      (conferee) =>
        conferee[`role${CURRENT_EVENT}`].toLowerCase() ===
        ROLE_SPEAKER.toLowerCase()
    );
  const collator = new Intl.Collator('pl', {
    numeric: true,
    sensitivity: 'base',
  });
  const sortedEventSpeakers = filteredSpeakers.sort((a, b) =>
    collator.compare(a.lastName, b.lastName)
  );
  return (
    <Layout slug="prelegenci">
      <Container>
        <h1>Prelegenci</h1>
        <section>
          <Row>
            {sortedEventSpeakers.map((speaker) => (
              <Col key={speaker.id} md={4}>
                <div className={prelegenciStyles.speaker}>
                  <img
                    className={prelegenciStyles.photo}
                    fluid="true"
                    src={speaker.photo.url}
                    alt={`${speaker.title ? speaker.title : ''} ${
                      speaker.firstName
                    } ${speaker.lastName}`}
                  />
                  <h2 className={prelegenciStyles.name}>{`${
                    speaker.title ? speaker.title : ''
                  } ${speaker.firstName} ${speaker.lastName}`}</h2>
                  <p className={prelegenciStyles.description}>
                    {speaker.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </Layout>
  );
};

export default Speakers;
