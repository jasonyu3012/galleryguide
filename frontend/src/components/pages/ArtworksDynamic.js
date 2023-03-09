import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import ArtworkCard from './ArtworkInstances/ArtworkCard';


const client = axios.create({
    baseURL: 'https://galleryguide.me',
  });

  
export default function Artworks() {
    // Code credit to nba db

    //initialize empty array of artworks
    const [artworks, setArtworks] = useState([]);
    // Number of works returned
     const [count, setCount] = useState(0);
    // We have not yet loaded the data
    const [loaded, setLoaded] = useState(false);
    //check the page
    const [currentPage, setCurrentPage] = useState(2);
    //items to be displayed per page
    const ITEMS_PER_PAGE = 20;

    function pageChange(pageNumber) {
      setCurrentPage(pageNumber);
      setLoaded(false);
    }

    useEffect(() => {
    // Read artworks from database
    const fetchArtworks = async () => {
      await client
        .get('artworks', {
          params: {
            offset: currentPage - 1,
            limit: 20,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((response) => {
          console.log(response);
          setArtworks(response.data);
          setCount(response.data.total);
        });
      setLoaded(true);
    };
    // Load the arenas if no done yet
    if (!loaded) {
      fetchArtworks();
    }
  });

  // Create the pagination bar
  const numPages = ((count % ITEMS_PER_PAGE) == 0 ? (count / ITEMS_PER_PAGE) : (Math.floor(count / ITEMS_PER_PAGE) + 1));
  const items = [];
  for (let i = 1; i <= numPages; i++) {
    items.push(
      <Pagination.Item key={i} onClick={() => pageChange(i + 1)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    // Returns a grid of cards
    <div>
      <p>
        {' '}
        Page {currentPage - 1} / {numPages}{' '} <br />
        Showing {ITEMS_PER_PAGE} of {count} instances
      </p>
      <Pagination className="justify-content-center">{items} </Pagination>
      <Row xl={4}
        lg={3}
        md={2}
        sm={1}
        xs={1}>
        {loaded ? (
          artworks['data'].map((artwork) => {
            return (
              // Send artwork data to the artwork card object
              <Col key={artwork.id} className="d-flex align-self-stretch">
                <ArtworkCard artwork={artwork} />
              </Col>
            );
          })
        ) : (
          <Spinner animation="grow" />
        )}
      </Row>
      <Pagination className="justify-content-center">{items}</Pagination>
    </div>
  );

}
