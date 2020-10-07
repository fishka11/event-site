import React from 'react';
import { graphql } from 'gatsby';

import Hero from '../components/hero';
import HomeTemplate from '../templates/homeTemplate';

import Organizers from '../components/organizers';
import KOINIntro from '../components/koinIntro';
import KBNIntro from '../components/kbnIntro';

const IndexPage = ({ data, pageContext }) => {
  const currentEvent = data.graphcms.events[0];
  const eventSwitch = () => {
    switch (pageContext.currentEvent.toLowerCase()) {
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
    <HomeTemplate slug="" currentEventName={currentEvent.eventName}>
      <Hero currentEvent={currentEvent} />
      <Organizers organizers={currentEvent.organizers} />
      {eventSwitch()}
    </HomeTemplate>
  );
};

export const data = graphql`
  query($currentEvent: GraphCMS_EventName) {
    graphcms {
      events(where: { eventName: $currentEvent }) {
        ...EventInformation
        ...EventPictureStrap
        ...EventLocation
        ...EventOrganizers
      }
    }
  }
`;

export default IndexPage;
