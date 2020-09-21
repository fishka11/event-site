import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import patronsGroupStyles from './patronsGroupStyles.module.scss';

const PatronsGroup = ({ partnersList }) => {
  return (
    <Row className="justify-content-sm-center">
      {partnersList.map((item) => (
        <Col key={item.id} xs={12} sm={6} lg={4}>
          <div className={patronsGroupStyles.logoContainer}>
            <img
              className={patronsGroupStyles.logo}
              fluid="true"
              src={item.logo.url}
              alt={item.name}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default PatronsGroup;
