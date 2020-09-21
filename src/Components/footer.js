import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import footerStyles from './footer.module.scss';

const Footer = ({ organizer }) => {
  return (
    <footer className={footerStyles.footer}>
      <Container>
        <Row className="justify-content-sm-center">
          <Col md={4} className="organizer-logo">
            {organizer.webSite ? (
              <a
                className={footerStyles.link}
                target="_blank"
                rel="noopener noreferrer"
                href={`http://${organizer.webSite}`}
              >
                <img
                  className={footerStyles.logo}
                  fluid="true"
                  src={organizer.logo.url}
                  alt={`logo ${organizer.name}`}
                />
              </a>
            ) : (
              <img
                className={footerStyles.logo}
                fluid="true"
                src={organizer.logo.url}
                alt={`logo ${organizer.name}`}
              />
            )}
          </Col>
          <Col md={8}>
            <Row className="justify-content-sm-center">
              <Col md={6}>
                <address>
                  <p>
                    <a
                      className={footerStyles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`http://${organizer.webSite}`}
                    >
                      <strong>{organizer.name}</strong>
                    </a>
                  </p>

                  <div className={footerStyles.address}>
                    <FontAwesomeIcon
                      icon="map-marker-alt"
                      className={footerStyles.icon}
                    />
                    <p>
                      {organizer.address}
                      <br />
                      {`${organizer.postalCode} ${organizer.city}`}
                    </p>
                  </div>
                </address>
              </Col>
              <Col md={6}>
                <address>
                  <div className={footerStyles.address}>
                    <FontAwesomeIcon icon="at" className={footerStyles.icon} />
                    <p>
                      e-mail:{' '}
                      <a
                        className={footerStyles.link}
                        href={`mailto:${organizer.eMail[0]}`}
                      >
                        {organizer.eMail[0]}
                      </a>
                    </p>
                  </div>
                  <div className={footerStyles.address}>
                    <FontAwesomeIcon
                      icon="phone"
                      className={footerStyles.icon}
                    />
                    <p>
                      tel:{' '}
                      <a
                        className={footerStyles.link}
                        href={`tel:${organizer.phone[0].replace(/\s+/g, '')}`}
                      >
                        {organizer.phone[0]}
                      </a>
                    </p>
                  </div>
                  <div className={footerStyles.address}>
                    <FontAwesomeIcon icon="fax" className={footerStyles.icon} />
                    <p>
                      fax:{' '}
                      <a
                        className={footerStyles.link}
                        href={`tel:${organizer.fax[0].replace(/\s+/g, '')}`}
                      >
                        {organizer.fax[0]}
                      </a>
                    </p>
                  </div>
                </address>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className={footerStyles.hr} />
        <p>© 2018 {organizer.shortName}</p>
      </Container>
    </footer>
  );
};

export default Footer;
