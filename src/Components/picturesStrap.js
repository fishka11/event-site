import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import pictureStrapsStyles from './picturesStrap.module.scss';

const PicturesStrap = (props) => {
  const { pictures } = props;

  return (
    <section>
      <Row className="justify-content-sm-center" noGutters>
        {pictures.map((picture) => (
          <Col key={picture.id} xs={4} md={2}>
            <img
              className={pictureStrapsStyles.picture}
              src={picture.url}
              alt="obrazek dekoracyjny"
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default PicturesStrap;
