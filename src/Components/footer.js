import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-sm-center">
          <Col md={4} className="organizer-logo">
            {/* {organizer.webSite ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://${organizer.webSite}`}
              >
                <img
                  fluid="true"
                  src={organizer.logo ? organizer.logo.url : null}
                  alt={`logo ${organizer.name}`}
                />
              </a>
            ) : (
              <img
                fluid="true"
                src={organizer.logo ? organizer.logo.url : null}
                alt={`logo ${organizer.name}`}
              />
            )} */}
          </Col>
          <Col md={8}>
            <Row className="justify-content-sm-center">
              <Col md={6}>
                <address>
                  <p>
                    {/* <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`http://${organizer.webSite}`}
                    >
                      <strong>{organizer.name}</strong>
                    </a> */}
                  </p>

                  {/* <div className="address">
                    <FontAwesomeIcon icon="map-marker-alt" />
                    <p>
                      {organizer.address}
                      <br />
                      {`${organizer.postalCode} ${organizer.city}`}
                    </p>
                  </div> */}
                </address>
              </Col>
              <Col md={6}>
                <address>
                  {/* <div className="address">
                    <FontAwesomeIcon icon="at" />
                    <p>
                      e-mail:{' '}
                      <a
                        href={`mailto:${
                          organizer.eMail ? organizer.eMail[0] : null
                        }`}
                      >
                        {organizer.eMail ? organizer.eMail[0] : null}
                      </a>
                    </p>
                  </div> */}
                  {/* {organizer.phone
                    ? organizer.phone.map((item) => (
                        <div
                          key={organizer.phone.indexOf(item)}
                          className="address"
                        >
                          <FontAwesomeIcon icon="phone" />
                          <p>
                            tel:{' '}
                            <a href={`tel:${item.replace(/\s+/g, '')}`}>
                              {item}
                            </a>
                          </p>
                        </div>
                      ))
                    : null} */}
                  {/* {organizer.fax
                    ? organizer.fax.map((item) => (
                        <div
                          key={organizer.fax.indexOf(item)}
                          className="address"
                        >
                          <FontAwesomeIcon icon="fax" />
                          <p>
                            fax:{' '}
                            <a href={`tel:${item.replace(/\s+/g, '')}`}>
                              {item}
                            </a>
                          </p>
                        </div>
                      ))
                    : null} */}
                </address>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        {/* <p>© 2018 {organizer.shortName}</p> */}
        <p>© 2018 KSOIN</p>
      </Container>
    </footer>
  );
};

export default Footer;
