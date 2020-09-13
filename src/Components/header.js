import React from 'react';
import { Link } from 'gatsby';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import headerStyles from './header.module.scss';

const Header = () => {
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
            {/* <img
              src={`assets/brand-${currentEvent}.png`}
              width="61"
              height="40"
              alt={`Logo - ${eventFullName}`}
            />
            <span className="sr-only">(current)</span> */}
            <Link to="/" activeClassName="active">
              Logo
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={headerStyles.nav}>
              {/* {menuItems
                .filter((item) => !!item.visibleInMenu)
                .map((item) => (
                  <Nav.Link
                    key={item.id}
                    href={`/${item.path}`}
                    className={` ${
                      location.pathname === `/${item.path}/` ? 'active' : ''
                    }`}
                  >
                    {item.displayName}
                  </Nav.Link>
                ))} */}
              <Nav.Item>
                <Link
                  to="/tematyka"
                  className={`nav-link ${headerStyles.navLink}`}
                  activeClassName="active"
                >
                  Tematyka & Program
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/prelegenci"
                  className={`nav-link ${headerStyles.navLink}`}
                  activeClassName="active"
                >
                  Prelegenci
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/patronat"
                  className={`nav-link ${headerStyles.navLink}`}
                  activeClassName="active"
                >
                  Patronat
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/info"
                  className={`nav-link ${headerStyles.navLink}`}
                  activeClassName="active"
                >
                  Inf. Organizacyjne
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/kontakt"
                  className={`nav-link ${headerStyles.navLink}`}
                  activeClassName="active"
                >
                  Kontakt
                </Link>
              </Nav.Item>
              <Nav.Item className={headerStyles.navBtn}>
                <Link
                  to="/rejestracja"
                  className="btn btn-primary"
                  activeClassName="active"
                >
                  Zarejestruj się
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
