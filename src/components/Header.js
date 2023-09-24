import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../App';
import { useContext } from 'react';
import styles from './styles/Header.module.scss';

function unauthNavLinks() {
  return (
    <>
      <Nav.Link className={`align-bottom ${styles.login}`} href="/signin">Login</Nav.Link>
      {/* <Nav.Link eventKey={2} href="/signup">
        Sign Up
      </Nav.Link> */}
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
    <Navbar className={`${styles.whiteBg} shadow-sm mb-3 bg-white rounded`} sticky='top'>
      <Navbar.Brand href="/">
        <span className={styles.logo}>KROMPY</span>
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