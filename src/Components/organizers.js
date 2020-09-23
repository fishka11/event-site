import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import organizersStyles from './organizers.module.scss';

const Organizers = ({ organizers }) => {
  const columns = Math.floor(12 / organizers.length);
  return (
    <section className={organizersStyles.container}>
      <Container>
        <h4 className={organizersStyles.sectionTitle}>
          {organizers.length === 1 ? 'Organizator' : 'Organizatorzy'}
        </h4>
        <Row className="justify-content-sm-center">
          {organizers.map((organizer) => (
            <Col
              key={organizer.id}
              className="text-center"
              xs={12}
              sm={columns >= 6 ? columns : 6}
              md={columns >= 4 ? columns : 4}
              lg={columns >= 3 ? columns : 3}
              xl={columns >= 2 ? columns : 2}
            >
              <div className={organizersStyles.logoContainer}>
                {organizer.webSite ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`http://${organizer.webSite}`}
                  >
                    <img
                      className={organizersStyles.logo}
                      fluid="true"
                      src={organizer.logo.url}
                      alt={`logo ${organizer.name}`}
                    />
                  </a>
                ) : (
                  <img
                    className={organizersStyles.logo}
                    fluid="true"
                    src={organizer.logo.url}
                    alt={`logo ${organizer.name}`}
                  />
                )}
              </div>
              <div className="organizer-name">
                <p>{organizer.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
export default Organizers;
