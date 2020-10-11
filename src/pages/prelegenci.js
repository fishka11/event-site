import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SiteTemplate from '../templates/siteTemplate';
import { ROLE_SPEAKER } from '../const';

import prelegenciStyles from './prelegenci.module.scss';

const Speakers = ({ data, pageContext }) => {
  const currentEvent = data.graphcms.events[0];
  const filteredSpeakers = data.graphcms.conferees
    .filter((conferee) =>
      conferee.events.find(
        (event) =>
          event.toLowerCase() === pageContext.currentEvent.toLowerCase()
      )
    )
    .filter(
      (conferee) =>
        conferee[`role${pageContext.currentEvent}`].toLowerCase() ===
        ROLE_SPEAKER.toLowerCase()
    );
  const collator = new Intl.Collator('pl', {
    numeric: true,
    sensitivity: 'base',
  });
  const sortedEventSpeakers = filteredSpeakers.sort((a, b) =>
    collator.compare(a.lastName, b.lastName)
  );
  return (
    <SiteTemplate slug="prelegenci" currentEventName={currentEvent.eventName}>
      <Container>
        <h1>Prelegenci</h1>
        <section>
          <Row>
            {sortedEventSpeakers.map((speaker) => (
              <Col key={speaker.id} md={4}>
                <div className={prelegenciStyles.speaker}>
                  <img
                    className={prelegenciStyles.photo}
                    fluid="true"
                    src={speaker.photo.url}
                    alt={`${speaker.title ? speaker.title : ''} ${
                      speaker.firstName
                    } ${speaker.lastName}`}
                  />
                  <h2 className={prelegenciStyles.name}>{`${
                    speaker.title ? speaker.title : ''
                  } ${speaker.firstName} ${speaker.lastName}`}</h2>
                  <p className={prelegenciStyles.description}>
                    {speaker.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </SiteTemplate>
  );
};

export const data = graphql`
  query($currentEvent: GraphCMS_EventName) {
    graphcms {
      events(where: { eventName: $currentEvent }) {
        ...EventName
      }
      conferees {
        ...Conferees
      }
    }
  }
`;

Speakers.propTypes = {
  data: PropTypes.shape({
    graphcms: PropTypes.shape({
      events: PropTypes.arrayOf(
        PropTypes.shape({
          eventName: PropTypes.string,
        })
      ),
      conferees: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          description: PropTypes.string,
          photo: PropTypes.shape({ url: PropTypes.string }),
          events: PropTypes.arrayOf(PropTypes.string),
          roleKBB: PropTypes.PropTypes.string,
          roleKBN: PropTypes.PropTypes.string,
          roleKOIN: PropTypes.PropTypes.string,
          roleZPO: PropTypes.PropTypes.string,
        })
      ),
    }),
  }),
  pageContext: PropTypes.shape({ currentEvent: PropTypes.string.isRequired })
    .isRequired,
};

Speakers.defaultProps = {
  data: {},
};

export default Speakers;
