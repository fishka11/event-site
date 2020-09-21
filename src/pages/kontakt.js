import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoogleMap from '../Components/embeddedGoogleMap';

import Layout from '../templates/siteTemplate';
import { CURRENT_EVENT, MAIN_ORGANIZER, TYPE_CONFERENCE } from '../Constans';

import kontaktStyles from './kontakt.module.scss';

const Contact = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          events {
            eventName
            eventFullName
            eventType
            eventStartDate
            eventEndDate

            eventLocation {
              name
              address
              postalCode
              city
              webSite
              googleMapsCode
            }
            organizers {
              id
              name
              shortName
              organizerType
              logo {
                url
              }
              webSite
              eMail
              address
              postalCode
              city
              phone
              fax
            }
          }
        }
      }
    `
  );
  const currentEvent = data.graphcms.events.find(
    (event) => event.eventName.toLowerCase() === CURRENT_EVENT.toLowerCase()
  );
  const eventStartDate = new Date(currentEvent.eventStartDate);
  const eventEndDate = new Date(currentEvent.eventEndDate);

  const mainOrganizer = currentEvent.organizers.find(
    (organizer) =>
      organizer.organizerType.toLowerCase() === MAIN_ORGANIZER.toLowerCase()
  );
  const email = mainOrganizer.eMail[0];
  const phone = mainOrganizer.phone[0];
  const fax = mainOrganizer.fax[0];
  const location = currentEvent.eventLocation;

  const tense = () => {
    if (Date.now() < eventStartDate) {
      return 'odbędzie się';
    }
    if (Date.now() >= eventStartDate && Date.now() <= eventEndDate) {
      return 'odbywa się';
    }
    return currentEvent.eventType.toLowerCase() ===
      TYPE_CONFERENCE.toLocaleLowerCase()
      ? 'odbyła się'
      : 'odbył się';
  };
  return (
    <Layout slug="kontakt">
      <Container>
        <h1>Kontakt & Lokalizacja</h1>
        <section>
          <Row>
            <Col className={kontaktStyles.columnOne} xs={12} lg={6}>
              <p className="lead">Kontakt do organizatora</p>
              <h3 className={kontaktStyles.h3}>{mainOrganizer.name}</h3>
              <address>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon
                    icon="map-marker-alt"
                    className={kontaktStyles.icon}
                  />
                  <p>
                    {mainOrganizer.address}
                    <br />
                    {`${mainOrganizer.postalCode} ${mainOrganizer.city}`}
                  </p>
                </div>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon
                    icon="phone"
                    className={kontaktStyles.icon}
                  />
                  <p>
                    tel:{' '}
                    <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                  </p>
                </div>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon icon="fax" className={kontaktStyles.icon} />
                  <p>
                    fax: <a href={`tel:${fax.replace(/\s+/g, '')}`}>{fax}</a>
                  </p>
                </div>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon icon="at" className={kontaktStyles.icon} />
                  <p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon
                    icon="globe"
                    className={kontaktStyles.icon}
                  />
                  <p>
                    <a href={`http://${mainOrganizer.webSite}`}>
                      {mainOrganizer.webSite}
                    </a>
                  </p>
                </div>
              </address>
            </Col>
            <Col className={kontaktStyles.columnTwo} xs={12} lg={6}>
              <p className="lead">{`${currentEvent.eventType
                .charAt(0)
                .toUpperCase()}${currentEvent.eventType.slice(
                1
              )} ${tense()} w dniach ${eventStartDate.getDate()}${
                eventStartDate.getMonth() !== eventEndDate.getMonth()
                  ? `.${(eventStartDate.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}`
                  : ''
              }-${eventEndDate.getDate()}.${(eventEndDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}.${eventStartDate.getFullYear()} w`}</p>
              <h3 className={kontaktStyles.h3}>{location.name}</h3>
              <address>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon
                    icon="map-marker-alt"
                    className={kontaktStyles.icon}
                  />
                  <p>
                    {location.address}
                    <br />
                    {`${location.postalCode} ${location.city}`}
                  </p>
                </div>
                <div className={kontaktStyles.address}>
                  <FontAwesomeIcon
                    icon="globe"
                    className={kontaktStyles.icon}
                  />
                  <p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`http://${location.webSite}`}
                    >
                      {location.webSite}
                    </a>
                  </p>
                </div>
              </address>
            </Col>
          </Row>
        </section>
        <section className="google-map">
          <Row>
            <Col xs={12}>
              <GoogleMap location={location} title={currentEvent.name} />
            </Col>
          </Row>
        </section>
      </Container>
    </Layout>
  );
};

export default Contact;
