import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import heroStyles from './hero.module.scss';

const Hero = ({ currentEvent }) => {
  console.log(currentEvent);
  return (
    <section>
      <Jumbotron fluid className={heroStyles.jumbo}>
        <Container>
          <div className="what-where-when">
            {currentEvent.cite ? (
              <p className="cite">
                &bdquo;
                {currentEvent.cite}
                &rdquo;
                <br />
                <span className="author">{currentEvent.citeAuthor}</span>
              </p>
            ) : null}
          </div>
        </Container>
      </Jumbotron>
    </section>
  );
};

export default Hero;
