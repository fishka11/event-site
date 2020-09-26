import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../templates/siteTemplate';
import pointer from '../assets/agenda-pointer.png';
import { CURRENT_EVENT } from '../constans';

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
          <Row>
            <Col md={8} lg={9}>
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
                  <Col
                    xs={10}
                    sm={11}
                    className={tematykaStyles.agendaItemTitle}
                  >
                    <h3>{title}</h3>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col md={4} lg={3}>
              <h4 className={tematykaStyles.header4}>
                Szczegółowy program Konferncji do pobrania
              </h4>
              <Link to="/plan-kbn-rynia-2020.pdf">
                <FontAwesomeIcon
                  icon="file-pdf"
                  className={tematykaStyles.icon}
                />
              </Link>
            </Col>
          </Row>
        </section>
      </Container>
    </Layout>
  );
};

export default Agenda;
