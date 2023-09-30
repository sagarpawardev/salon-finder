import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from '../App';
import { useContext } from 'react';
import styles from './styles/Header.module.scss';
import Offcanvas from 'react-bootstrap/Offcanvas';

function unauthNavLinks() {
  return (
    <>
      <Nav.Link className={`align-bottom ${styles.login}`} href="/signin">Login</Nav.Link>
    </>
  );
}

function authNavLinks() {
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Offcanvas placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            KROMPY
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/profile">Account</Nav.Link>
            <Nav.Link href="/bookings">Bookings</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
}

export function Header() {

  const { auth } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className={`${styles.whiteBg} shadow-sm mb-3 bg-white rounded`} sticky='top'>
      <Container className={styles.mainContainer}>
        <Navbar.Brand href="/">
          <span className={styles.logo}>KROMPY</span>
        </Navbar.Brand>

        {
          auth?.token ? authNavLinks() : unauthNavLinks()
        }
      </Container>
    </Navbar>
  );
}
export default Header;  