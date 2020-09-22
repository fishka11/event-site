import React from 'react';
import { Link } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Counter from './counter';
import Independence from './independence';

import { POLISH_MONTHS } from '../Constans';

import heroStyles from './hero.module.scss';

const Hero = ({ currentEvent }) => {
  const multilineTitle = currentEvent.eventFullName.split('\n');
  const eventStartDate = new Date(currentEvent.eventStartDate);
  const eventEndDate = new Date(currentEvent.eventEndDate);
  console.log(currentEvent);
  return (
    <section>
      <Jumbotron fluid className={heroStyles.jumbo}>
        <Container>
          <Row>
            <Col lg={6}>
              <div>
                {currentEvent.cite ? (
                  <p className={heroStyles.cite}>
                    &bdquo;
                    {currentEvent.cite}
                    &rdquo;
                    <br />
                    <span className={heroStyles.author}>
                      {currentEvent.citeAuthor}
                    </span>
                  </p>
                ) : null}
              </div>
              <h1 className={heroStyles.title}>
                {multilineTitle.map((item) => (
                  <span
                    key={multilineTitle.indexOf(item)}
                    className={
                      multilineTitle.indexOf(item) === 0
                        ? 'd-block display-3'
                        : 'd-block display-5'
                    }
                  >
                    {item}
                  </span>
                ))}
              </h1>
              <div>
                <Link
                  className={`btn btn-danger btn-lg ${heroStyles.callToAction}`}
                  to='/rejestracja'
                >
                  Zarejestruj się
                </Link>
              </div>
              <div>
                <p className={heroStyles.location}>
                  {currentEvent.eventLocation.city}
                </p>
                <p className={heroStyles.date}>
                  {`${eventStartDate.getDate()} ${
                    eventStartDate.getMonth() !== eventEndDate.getMonth()
                      ? POLISH_MONTHS[eventStartDate.getMonth()]
                      : ''
                  } - ${eventEndDate.getDate()} ${
                    POLISH_MONTHS[eventEndDate.getMonth()]
                  } ${eventEndDate.getFullYear()}`}
                </p>
              </div>
              <Counter eventStartDate={eventStartDate} />
              <Independence />
            </Col>
            <Col lg={6}>druga kolumna</Col>
          </Row>
        </Container>
      </Jumbotron>
    </section>
  );
};

export default Hero;
