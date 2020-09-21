import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../templates/siteTemplate';
import pointer from '../assets/agenda-pointer.png';
import { CURRENT_EVENT } from '../Constans';

import tematykaStyles from './tematyka.module.scss';

const Agenda = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          events {
            eventName
            agenda
          }
        }
      }
    `
  );
  const currentEvent = data.graphcms.events.find(
    (event) => event.eventName.toLowerCase() === CURRENT_EVENT.toLowerCase()
  );
  const { agenda } = currentEvent;
  return (
    <Layout slug="tematyka">
      <Container>
        <h1>Tematyka i Program</h1>
        <section>
          {agenda.map((title) => (
            <Row
              key={agenda.indexOf(title)}
              className={tematykaStyles.agendaItem}
            >
              <Col xs={2} sm={1}>
                <div>
                  <img
                    className={tematykaStyles.pointer}
                    fluid="true"
                    src={pointer}
                    alt="pointer"
                  />
                </div>
              </Col>
              <Col xs={10} sm={11} className={tematykaStyles.agendaItemTitle}>
                <h3>{title}</h3>
              </Col>
            </Row>
          ))}
        </section>
      </Container>
    </Layout>
  );
};

export default Agenda;
