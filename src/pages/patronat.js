import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Container from 'react-bootstrap/Container';

import Layout from '../templates/siteTemplate';
import PatronsGroup from '../components/patronsGroup';
import { CURRENT_EVENT, PATRONS_ROLE_PRIORITY } from '../const';

import patronatStyles from './patronat.module.scss';

const Sponsors = () => {
  const data = useStaticQuery(
    graphql`
      query {
        graphcms {
          patrons {
            id
            name
            logo {
              url
            }
            events
            roleKBB
            roleKBN
            roleKOIN
            roleZPO
          }
        }
      }
    `
  );
  const filteredPatrons = data.graphcms.patrons.filter((patron) =>
    patron.events.find(
      (event) => event.toLowerCase() === CURRENT_EVENT.toLowerCase()
    )
  );
  const goupedPatrons = [];
  filteredPatrons.forEach((patron) => {
    const currentEventKey = `role${CURRENT_EVENT}`;
    if (!goupedPatrons.find((i) => i.name === patron[currentEventKey])) {
      const patronsGroup = {};
      const related = PATRONS_ROLE_PRIORITY.find(
        (i) => i.name === patron[currentEventKey]
      );
      patronsGroup.name = patron[currentEventKey];
      patronsGroup.list = [patron];
      patronsGroup.priority = related.priority;
      patronsGroup.header = related.polishName;
      goupedPatrons.push(patronsGroup);
    } else {
      goupedPatrons
        .find((i) => i.name === patron[currentEventKey])
        .list.push(patron);
    }
  });
  const collator = new Intl.Collator('pl', {
    numeric: true,
    sensitivity: 'base',
  });
  const sortedPatrons = goupedPatrons.sort((a, b) =>
    collator.compare(a.priority, b.priority)
  );
  return (
    <Layout slug="patronat">
      <Container>
        <h1>Patronat</h1>
        {sortedPatrons.map((patronGroup) => (
          <section key={patronGroup.priority}>
            <Container>
              <h3 className={patronatStyles.groupName}>
                {patronGroup.header.toUpperCase()}
              </h3>
              <PatronsGroup partnersList={patronGroup.list} />
            </Container>
          </section>
        ))}
      </Container>
    </Layout>
  );
};

export default Sponsors;
