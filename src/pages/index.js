import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Hero from '../components/hero';
import HomeTemplate from '../templates/homeTemplate';

import { CURRENT_EVENT } from '../constans';
import Organizers from '../components/organizers';
import KOINIntro from '../components/koinIntro';
import KBNIntro from '../components/kbnIntro';

const IndexPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
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
            cite
            citeAuthor
            picturesStrap {
              url
            }
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
  const eventSwitch = () => {
    switch (currentEvent.eventName.toLowerCase()) {
      case 'koin':
        return <KOINIntro pictures={currentEvent.picturesStrap} />;
      case 'kbn':
        return <KBNIntro pictures={currentEvent.picturesStrap} />;
      default:
        return null;
    }
  };
  return (
    // eslint-disable-next-line prettier/prettier
    <HomeTemplate slug="">
      <Hero currentEvent={currentEvent} />
      <Organizers organizers={currentEvent.organizers} />
      {eventSwitch()}
    </HomeTemplate>
  );
};

export default IndexPage;
