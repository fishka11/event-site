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
  return (
    <section>
      <Jumbotron fluid className={heroStyles.jumbo}>
        <Container>
          <Row>
            <Col lg={7}>
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
                        ? 'd-block display-2'
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
                  to="/rejestracja"
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
            <Col className={heroStyles.features} lg={5}>
              <p className={heroStyles.featureHeader}>Debata:</p>
              <h4>
                Bezpieczeństwo epidemiologiczne. Świat i Polska w czasach
                pandemii, życie na nowo?
              </h4>
              <p>z udziałem:</p>
              <dl>
                <dt>prof. dr hab. Agnieszka Dobrzyń</dt>
                <dd className={heroStyles.speakerDescription}>
                  Kierownik Projektu SONAR Anty-CoronaVirus, Dyrektor Instytutu
                  Biologii Doświadczalnej im. M. Nenckiego PAN, kierownik
                  Pracowni Sygnałów Komórkowych i Zaburzeń Metabolicznych.
                </dd>
                <dt>prof. dr hab. n. med. Robert Flisiak</dt>
                <dd className={heroStyles.speakerDescription}>
                  Kierownik Kliniki Chorób Zakaźnych i Hepatologii Uniwersytetu
                  Medycznego w Białymstoku. Prezes Polskiego Towarzystwa
                  Epidemiologów i Lekarzy Chorób Zakaźnych.
                </dd>
                <dt>dr hab. n. med. Jarosław Pinkas</dt>
                <dd className={heroStyles.speakerDescription}>
                  Główny Inspektor Sanitarny, konsultant krajowy w dziedzinie
                  zdrowia publicznego.
                </dd>
                <dt>Marek Posobkiewicz</dt>
                <dd className={heroStyles.speakerDescription}>
                  b. Główny Inspektor Sanitarny.
                </dd>
                <dt>prof. dr hab. n. med. Krzysztof Simon</dt>
                <dd className={heroStyles.speakerDescription}>
                  Kierownik Kliniki Chorób Zakaźnych i Hepatologii Uniwersytetu
                  Medycznego we Wrocławiu. Ordynator 1. Oddziału Chorób
                  Zakaźnych w Wojewódzkim Szpitalu Specjalistycznym we
                  Wrocławiu.
                </dd>
                <dt>dr n. med. Andrzej Sośnierz</dt>
                <dd className={heroStyles.speakerDescription}>
                  Poseł, b. prezes Narodowego Funduszu Zdrowia.
                </dd>
              </dl>
              <p className={heroStyles.featureHeader}>Atrakcja wieczoru:</p>
              <Row>
                <Col xs={4}>
                  <img
                    src="./dominika-zamara.jpg"
                    alt="Dominika Zamara"
                    height="160"
                  />
                </Col>
                <Col xs={8}>
                  <h4>Występ znanej śpiewaczki operowej Dominiki Zamary</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </section>
  );
};

export default Hero;
