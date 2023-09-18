import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../images/AppLogo.svg';
import { AuthContext } from '../App';
import { useContext } from 'react';

function unauthNavLinks() {
  return (
    <>
      <Nav.Link href="/signin">Login</Nav.Link>
      <Nav.Link eventKey={2} href="/signup">
        Sign Up
      </Nav.Link>
    </>
  );
}

function authNavLinks() {
  return (
    <>
      <Nav.Link href="/profile">Account</Nav.Link>
      <Nav.Link href="/bookings">Bookings</Nav.Link>
      <Nav.Link href="/logout">Logout</Nav.Link>
    </>
  );
}

export function Header() {

  const { auth } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Brand logo"
        />
      </Navbar.Brand>

      <Nav className='ms-auto'>
        {
          auth?.token ? authNavLinks() : unauthNavLinks()
        }
      </Nav>
    </Navbar>
  );
}
export default Header;  