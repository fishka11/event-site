import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import organizersStyles from './organizers.module.scss';

const Organizers = ({ organizers }) => {
  const columns = Math.floor(12 / organizers.length);
  return (
    <section className="organizers">
      <Container>
        <h4 className="section-title text-center">
          {organizers.length === 1 ? 'Organizator' : 'Organizatorzy'}
        </h4>
        <Row className="justify-content-sm-center">
          {organizers.map((item) => (
            <Col
              key={item.id}
              className="text-center"
              xs={12}
              sm={columns >= 6 ? columns : 6}
              md={columns >= 4 ? columns : 4}
              lg={columns >= 3 ? columns : 3}
              xl={columns >= 2 ? columns : 2}
            >
              <div className="organizer-logo">
                {item.webSite ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`http://${item.webSite}`}
                  >
                    <img
                      fluid="true"
                      src={item.logo.url}
                      alt={`logo ${item.name}`}
                    />
                  </a>
                ) : (
                  <img
                    fluid="true"
                    src={item.logo.url}
                    alt={`logo ${item.name}`}
                  />
                )}
              </div>
              <div className="organizer-name">
                <p>{item.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
export default Organizers;
