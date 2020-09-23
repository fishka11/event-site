import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkerAlt,
  faAt,
  faPhone,
  faFax,
  faGlobe,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import CookieConsent from 'react-cookie-consent';
import Header from '../components/header';
import Footer from '../components/footer';
import SEO from '../components/seo';
import { CURRENT_EVENT, MAIN_ORGANIZER, HELPER_ORGANIZER } from '../Constans';

import '../styles/layout.scss';
import layoutStyles from './siteTemplate.module.scss';

library.add(faMapMarkerAlt, faAt, faPhone, faFax, faGlobe, faFilePdf);

const Layout = ({ children, slug }) => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          events {
            eventName
            eventFullName
            brand {
              id
              url
              fileName
              height
              width
            }
            organizers {
              id
              name
              shortName
              organizerType
              logo {
                width
                height
                url
              }
              webSite
              eMail
              address
              postalCode
              city
              phone
              fax
            }
            eventSiteMenu(orderBy: itemOrder_ASC) {
              displayName
              id
              visibleInMenu
              itemOrder
              path
              button
              description
              title
            }
          }
        }
      }
    `
  );
  const currentEvent = data.graphcms.events.find(
    (item) => item.eventName.toLowerCase() === CURRENT_EVENT.toLocaleLowerCase()
  );
  const menuItems = currentEvent.eventSiteMenu.filter(
    (item) => item.visibleInMenu === true
  );
  const mainOrganizer = currentEvent.organizers.find(
    (organizer) => organizer.organizerType === MAIN_ORGANIZER
  );
  const helperOrganizer = currentEvent.organizers.find(
    (organizer) => organizer.organizerType === HELPER_ORGANIZER
  );
  const organizer = helperOrganizer || mainOrganizer;
  return (
    <div className={layoutStyles.siteWrapper}>
      <div className={layoutStyles.headerWithContent}>
        <Header
          menuItems={menuItems}
          brand={currentEvent.brand}
          eventFullName={currentEvent.eventFullName}
        />
        <SEO metaData={currentEvent.eventSiteMenu} slug={slug} />
        <div className={layoutStyles.content}>{children}</div>
      </div>
      <Footer organizer={organizer} />
      <CookieConsent
        location="bottom"
        buttonText="OK, rozumiem"
        cookieName="cookiesBar"
        style={{ background: '#333', color: '#ddd' }}
        buttonStyle={{
          color: '#ffffff',
          background: '#ca1818',
          fontSize: '0.8rem',
          fontWeight: 'bold',
        }}
        expires={150}
      >
        Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach
        statystycznych, reklamowych oraz funkcjonalnych. Każdy może zaakceptować
        pliki cookies albo ma możliwość wyłączenia ich w przeglądarce.{' '}
        <a
          aria-label="dowiedz się więcej o ciasteczkach"
          role="button"
          rel="noopener noreferrer"
          tabIndex="0"
          className="cc-link"
          href="http://wszystkoociasteczkach.pl/"
          target="_blank"
          style={{ color: '#ca1818' }}
        >
          Dowiedz się więcej.
        </a>
      </CookieConsent>
    </div>
  );
};

export default Layout;
