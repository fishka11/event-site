import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkerAlt,
  faAt,
  faPhone,
  faFax,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../Components/header';
import Footer from '../Components/footer';
import SEO from '../Components/seo';
import { CURRENT_EVENT, MAIN_ORGANIZER, HELPER_ORGANIZER } from '../Constans';

import '../styles/layout.scss';
import layoutStyles from './siteTemplate.module.scss';

library.add(faMapMarkerAlt, faAt, faPhone, faFax, faGlobe);

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
    </div>
  );
};

export default Layout;