/* eslint-disable react/jsx-indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const isLoggedIn = !!session?.user?.email;
  const role = (session?.user as { randomKey?: string })?.randomKey;

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">digits</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {isLoggedIn && (
              <>
                <Nav.Link id="add-stuff-nav" href="/add" active={pathName === '/add'}>
                  Add Stuff
                </Nav.Link>
                <Nav.Link id="list-stuff-nav" href="/list" active={pathName === '/list'}>
                  List Contacts
                </Nav.Link>
              </>
            )}
            {isLoggedIn && role === 'ADMIN' && (
              <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown id="login-dropdown" title={session.user?.email}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
{' '}
Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
{' '}
Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
{' '}
Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
{' '}
Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
