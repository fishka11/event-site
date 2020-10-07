import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoogleMap from '../components/embeddedGoogleMap';

import SiteTemplate from '../templates/siteTemplate';
import pointer from '../assets/agenda-pointer.png';
import { CURRENT_EVENT, MAIN_ORGANIZER, HELPER_ORGANIZER } from '../const';

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
  const helperOrganizer = currentEvent.organizers.find(
    (organizer) =>
      organizer.organizerType.toLowerCase() === HELPER_ORGANIZER.toLowerCase()
  );
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
    <SiteTemplate slug="info">
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
                <li>
                  Przebieg wydarzenia może zostać utrwalony za pomocą urządzeń
                  rejestrujących obraz i dźwięk.
                </li>
                <li>
                  Zgłoszenie uczestnictwa jest równoznaczne z wyrażeniem zgody
                  na publikację wizerunku bądź wypowiedzi utrwalonych podczas
                  wydarzenia, stosownie do art. 81 ust. 1 ustawy z dnia 4 lutego
                  1994 r. o prawie autorskim i prawach pokrewnych (Dz. U. z 2019
                  r. poz.1231, z późn. zm.) i na wykorzystanie ich w materiałach
                  go promujących, w tym publikowanych w postaci zdjęć lub filmów
                  na <Link to="/">stronie internetowej wydarzenia</Link>,
                  stronach{' '}
                  {helperOrganizer ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://${helperOrganizer.webSite}/`}
                    >
                      {`${helperOrganizer.webSite}, `}
                    </a>
                  ) : null}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://${mainOrganizer.webSite}/`}
                  >
                    {mainOrganizer.webSite}
                  </a>
                  , kanale youtube, mediach społecznościowych: facebook,
                  twitter, linkedin, a także w materiałach promocyjnych
                  Organizatorów związanych z wydarzeniem, z poszanowaniem
                  obowiązujących przepisów i bez dodatkowego wynagrodzenia.
                </li>
                <li>
                  Zgoda na wykorzystanie wizerunku i wypowiedzi może zostać w
                  każdym czasie odwołana, pod adresem:{' '}
                  <a href={`mailto:${email}`}>{email}</a> z zastrzeżeniem, że
                  cofnięcie zgody nie obejmuje materiałów promocyjnych
                  wyemitowanych przed dniem jej cofnięcia.
                </li>
                <li>
                  W oparciu o art. 81 ust. 2 ustawy z dnia 4 lutego 1994 r. o
                  prawie autorskim i prawach pokrewnych (Dz. U. z 2019 r. poz.
                  1231, zm. Dz. U. z 2019 r. poz. 2245) zezwolenia nie wymaga
                  rozpowszechnianie wizerunku:
                  <ul>
                    <li>
                      osoby powszechnie znanej, jeżeli wizerunek wykonano w
                      związku z pełnieniem przez nią funkcji publicznych, w
                      szczególności politycznych, społecznych, zawodowych;
                    </li>
                    <li>
                      osoby stanowiącej jedynie szczegół całości takiej jak
                      zgromadzenie, krajobraz, publiczna impreza.
                    </li>
                  </ul>
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
    </SiteTemplate>
  );
};

export default Info;
