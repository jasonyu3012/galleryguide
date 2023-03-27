import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { GlobalSearch } from './Search';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">GalleryGuide</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/artworks">Artworks</Nav.Link>
            <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
            <Nav.Link as={Link} to="/galleries">Galleries</Nav.Link>
          </Nav>
          <GlobalSearch/>
      </Container>
    </Navbar>
  );
}

export default Navigation;