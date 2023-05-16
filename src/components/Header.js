import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from './react-js-icon.svg'
export function Header() {
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
        <Nav.Link href="signin">Login</Nav.Link>
        <Nav.Link eventKey={2} href="signup">
          Sign Up
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default Header;  