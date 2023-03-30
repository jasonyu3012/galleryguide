import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navigation = () => {
  // From GeoJobs
  const handleQueryChange = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    console.log(`search query: ${form.query.value}`)
    window.location.assign(`/search/${form.query.value}`)
  }

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
          <form onSubmit={ handleQueryChange }>
            <input
              type="text"
              placeholder="Site-wide search"
              id="query"
              name="query"
              // onChange={(event) => setGlobalQuery(event.target.value)}
            />
            <button style={{marginLeft: "1em"}} type="submit">Search</button>
          </form>
      </Container>
    </Navbar>
  );
}

export default Navigation;