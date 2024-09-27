import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

export const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary'>
      <Container
        fluid
        className='!px-4'>
        <Navbar.Brand
          href='/'
          className='!mr-auto font-bold'>
          Pen & Post
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='!flex-grow-0'>
          <Nav className='!ms-auto'>
            <Nav.Link
              href='/'
              className='!px-3'>
              Home
            </Nav.Link>

            {user ? (
              <Nav.Link href='/profile'>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                    user.image
                  }`}
                  alt='profile picture'
                  className='w-10 h-10 rounded-full'
                />
              </Nav.Link>
            ) : (
              <>
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button>Click me</Button>
    </Navbar>
  );
};
