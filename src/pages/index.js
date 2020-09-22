import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Hero from '../Components/hero';
import Layout from '../templates/homeTemplate';

import { CURRENT_EVENT } from '../Constans';

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
  return (
    // eslint-disable-next-line prettier/prettier
    <Layout slug=''>
      <Hero currentEvent={currentEvent} />
    </Layout>
  );
};

export default IndexPage;
