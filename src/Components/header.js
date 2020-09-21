import React from 'react';
import { Link } from 'gatsby';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import headerStyles from './header.module.scss';

const Header = ({ brand, eventFullName, menuItems }) => {
  return (
    <header className="navigation">
      <Navbar
        className={headerStyles.navbar}
        fixed="top"
        collapseOnSelect
        expand="xl"
        variant="light"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand>
            <Link to="/" activeClassName="active">
              <img
                src={brand.url}
                width={brand.width}
                height={brand.height}
                alt={`Logo - ${eventFullName}`}
              />
              <span className="sr-only">(current)</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={headerStyles.nav}>
              {menuItems.map((item) =>
                !item.button ? (
                  <Nav.Item key={item.id}>
                    <Link
                      to={`/${item.path}`}
                      className={`nav-link ${headerStyles.navLink}`}
                      activeClassName="active"
                    >
                      {item.displayName}
                    </Link>
                  </Nav.Item>
                ) : (
                  <Nav.Item key={item.id} className={headerStyles.navBtn}>
                    <Link
                      to={`/${item.path}`}
                      className="btn btn-primary"
                      activeClassName="active"
                    >
                      {item.displayName}
                    </Link>
                  </Nav.Item>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
