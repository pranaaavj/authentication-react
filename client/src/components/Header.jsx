import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary'>
      <Container
        fluid
        className='!px-4'>
        <Navbar.Brand
          href='/'
          className='!mr-auto'>
          Authorization
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='!flex-grow-0'>
          <Nav className='!ms-auto'>
            <Nav.Link
              href='/about'
              className='!px-3'>
              About
            </Nav.Link>
            <Nav.Link
              href='/sign-up'
              className='!px-3'>
              Sign Up
            </Nav.Link>
            <Nav.Link
              href='/sign-in'
              className='!px-3'>
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
