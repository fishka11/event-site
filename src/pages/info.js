import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoogleMap from '../components/embeddedGoogleMap';

import Layout from '../templates/siteTemplate';
import pointer from '../assets/agenda-pointer.png';
import { CURRENT_EVENT, MAIN_ORGANIZER } from '../Constans';

import infoStyles from './info.module.scss';

const Info = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          eventDiscounts {
            id
            name
            discount
          }
          events {
            eventName
            eventFullName
            eventType
            genitiveEventType
            locativeEventType
            eventStartDate
            eventEndDate
            singleRoomPrice
            doubleRoomPrice

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
              bankName
              bankAccount
              nip
              regon
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
  const eventDuration = eventEndDate.getDate() - eventStartDate.getDate();

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
      return 'Spotkamy się';
    }
    if (Date.now() >= eventStartDate && Date.now() <= eventEndDate) {
      return 'Jesteśmy';
    }
    return 'Spotkaliśmy się';
  };

  return (
    <Layout slug="info">
      <Container>
        <h1>Informacje organizacyjne</h1>
        <section className={infoStyles.section}>
          <Row>
            <Col xs={2} sm={1}>
              <div className="info-pointer">
                <img
                  className={infoStyles.pointer}
                  fluid="true"
                  src={pointer}
                  alt="pointer"
                />
              </div>
            </Col>
            <Col xs={10} sm={11}>
              <ol>
                <li>
                  Przyjazd, rejestracja i zakwaterowanie uczestników{' '}
                  {currentEvent.genitiveEventType} w dniu{' '}
                  {eventStartDate.getDate()}.
                  {(eventStartDate.getMonth() + 1).toString().padStart(2, '0')}.
                  {eventStartDate.getFullYear()} r. do godz.{' '}
                  {eventStartDate.getHours() - 1}.
                  {eventDuration < 2
                    ? (eventStartDate.getMinutes() + 30)
                        .toString()
                        .padStart(2, '0')
                    : eventStartDate.getMinutes().toString().padStart(2, '0')}
                  . Rozpoczęcie obrad o godz. {eventStartDate.getHours()}.
                  {eventStartDate.getMinutes().toString().padStart(2, '0')}, a
                  zakończenie {eventEndDate.getDate()}.
                  {(eventEndDate.getMonth() + 1).toString().padStart(2, '0')}.
                  {eventEndDate.getFullYear()} r. ok. godz.{' '}
                  {eventEndDate.getHours()}.
                  {eventEndDate.getMinutes().toString().padStart(2, '0')}.
                </li>
                <li>
                  <span className="font-weight-bold">
                    Koszt uczestnictwa w {currentEvent.locativeEventType} wynosi
                    od osoby:
                  </span>
                  <ul>
                    <li className="font-weight-bold">
                      {`${currentEvent.singleRoomPrice} zł netto +23% VAT - zakwaterowanie w pokoju
                      jednoosobowym,`}
                    </li>
                    <li className="font-weight-bold">
                      {`${currentEvent.doubleRoomPrice} zł netto +23% VAT - zakwaterowanie w pokoju
                      dwuosobowym.`}
                    </li>
                  </ul>
                  Cena obejmuje: wykłady, materiały szkoleniowe, certyfikat,
                  wyżywienie, zakwaterowanie.
                  <br />
                  <span className="font-italic">
                    Szkolenia w zakresie kształcenia zawodowego lub
                    przekwalifikowania finansowane w co najmniej 70% ze środków
                    publicznych są zwolnione z podatku VAT. W przypadku
                    korzystania ze zwolnienia prosimy o przesłanie oświadczenia
                    wraz ze zgłoszeniem uczestnictwa.
                  </span>
                </li>
                <li>
                  Preferencyjne zniżki:
                  <ul>
                    {data.graphcms.eventDiscounts.map((discount) => (
                      <li key={discount.id}>
                        {discount.name !== 'uczestnicy szkoleń'
                          ? `${discount.name}: -${discount.discount}%`
                          : `${discount.name} z ${
                              eventStartDate.getFullYear() - 1
                            } i ${eventStartDate.getFullYear()} r: -${
                              discount.discount
                            }%`}
                      </li>
                    ))}
                  </ul>
                  Zniżki nie sumują się.
                </li>
                <li>
                  Zgłoszenia uczestnictwa prosimy przesyłać najpóźniej na 5 dni
                  roboczych przed rozpoczęciem {currentEvent.genitiveEventType}{' '}
                  na adres{' '}
                  <span className="font-weight-bold">
                    <a href={`mailto:${email}`}>{email}</a>
                  </span>
                  , faksem - nr tel.{' '}
                  <a href={`tel:${fax.replace(/\s+/g, '')}`}>
                    <span className="font-weight-bold">{fax}</span>
                  </a>{' '}
                  lub przy pomocy{' '}
                  <span className="font-weight-bold">
                    <a href="rejestracja">formularza zgłoszeniowego</a>
                  </span>
                  .
                </li>
                <li>
                  Należność za udział w Kongresie prosimy wpłacać na konto:{' '}
                  <span className="font-weight-bold">
                    {mainOrganizer.bankName}
                  </span>
                  , nr rachunku{' '}
                  <span className="font-weight-bold">
                    {mainOrganizer.bankAccount}
                  </span>{' '}
                  przed rozpoczęciem {currentEvent.genitiveEventType} (nie
                  dotyczy sfery budżetowej).
                </li>
                <li>
                  Zgłoszenie udziału jest zobowiązaniem do zapłaty. Rezygnację
                  należy zgłaszać wyłącznie na adres{' '}
                  <a href={`mailto:${email}`}>{email}</a> lub faxem{' '}
                  <a href={`tel:${fax.replace(/\s+/g, '')}`}>{fax}</a>.
                  Rezygnacja z uczestnictwa nie zgłoszona na 3 dni robocze przed
                  rozpoczęciem obrad nie zwalnia od zapłaty.
                </li>
                <li>
                  Miejsce {currentEvent.genitiveEventType}:{' '}
                  <span className="font-weight-bold">{location.name}</span>,{' '}
                  {location.address}, {location.postalCode} {location.city}.
                </li>
                <li>
                  Dane organizatora: {mainOrganizer.name},{' '}
                  {mainOrganizer.postalCode} {mainOrganizer.city},{' '}
                  {mainOrganizer.address}, NIP: {mainOrganizer.nip}, REGON{' '}
                  {mainOrganizer.regon}, e-mail: {email}, tel. {phone}, fax{' '}
                  {fax}.
                </li>
              </ol>
            </Col>
          </Row>
        </section>
        <section className={infoStyles.section}>
          <h2 className={infoStyles.h2}>{tense()} tutaj:</h2>

          <address>
            <p className="lead">{location.name}</p>

            <div className={infoStyles.address}>
              <FontAwesomeIcon
                icon="map-marker-alt"
                className={infoStyles.icon}
              />
              <p>
                {location.address}
                <br />
                {location.postalCode} {location.city}
              </p>
            </div>
            <div className={infoStyles.address}>
              <FontAwesomeIcon icon="globe" className={infoStyles.icon} />
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
          <GoogleMap location={location} title={currentEvent.name} />
        </section>
      </Container>
    </Layout>
  );
};

export default Info;
