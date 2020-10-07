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
import Cookies from './cookies';
import Header from './header';
import Footer from './footer';
import SEO from './seo';
import { MAIN_ORGANIZER, HELPER_ORGANIZER } from '../const';

import '../styles/layout.scss';
import layoutStyles from './layout.module.scss';

library.add(faMapMarkerAlt, faAt, faPhone, faFax, faGlobe, faFilePdf);

const Layout = ({ children, slug, currentEventName }) => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          events {
            ...EventInformation
            ...EventBrandLogo
            ...EventMenuItems
            ...EventOrganizers
          }
        }
      }
    `
  );
  const currentEvent = data.graphcms.events.find(
    (item) => item.eventName.toLowerCase() === currentEventName.toLowerCase()
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
        {children}
      </div>
      <Footer organizer={organizer} />
      <Cookies />
    </div>
  );
};

export default Layout;
