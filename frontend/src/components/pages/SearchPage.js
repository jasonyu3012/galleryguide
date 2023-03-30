// https://gitlab.com/mrscottwlai/cs373-idb/-/blob/main/front-end/src/components/SearchPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Col, Container, Row, Tab, Tabs, Card, Button } from "react-bootstrap";
import axios from 'axios';
import { Highlight } from "react-highlight-regex";

const SearchPage = () => {
  let query = useParams().query;
  let queryRE = new RegExp(`(?:${query.replaceAll(" ", "|")})`, "i");
  const [artworkData, setArtworkData] = useState({});
  const [artistData, setArtistData] = useState({});
  const [galleryData, setGalleryData] = useState({});
  console.log("query search: ", query)

  function highlightText (input, regex) {
    if (regex != null && input != null) {
      return <Highlight match={regex} text={input} />
    }
    return input;
  }

  useEffect(() => {
    // artworks
    axios.get("https://galleryguide.me/api/artworks", { 
      params: {
        ...(query === '' ? {} : { query: query.replaceAll(' ', '+') })
    }})
    .then(artworkResponse => {
      const artworkCons = artworkResponse.data.artworks;
      console.log("artwork data: ", artworkCons);
      setArtworkData(artworkCons);
      console.log("stored artwork data: ", artworkData);
    })
    .catch((error) => {
      console.log("axios error while getting artwork info: ", error);
    })

    // artists
    axios.get("https://galleryguide.me/api/artists", { 
      params: {
        ...(query === '' ? {} : { query: query.replaceAll(' ', '+') })
    }})
    .then(artistResponse => {
      const artistCons = artistResponse.data.artists;
      console.log("artist data: ", artistCons);
      setArtistData(artistCons);
      console.log("stored artist data: ", artistData);
    })
    .catch((error) => {
      console.log("axios error while getting artist info: ", error);
    })

    // galleries
    axios.get("https://galleryguide.me/api/galleries", { 
      params: {
        ...(query === '' ? {} : { query: query.replaceAll(' ', '+') })
    }})
    .then(galleryResponse => {
      const galleryCons = galleryResponse.data.galleries;
      console.log("gallery data: ", galleryCons);
      setGalleryData(galleryCons);
      console.log("stored gallery data: ", galleryData);
    })
    .catch((error) => {
      console.log("axios error while getting gallery info: ", error);
    })
  }, [query])

  return (
    <div>
      <h1>Search results for { query }</h1>
      <Container>
      <Tabs defaultActiveKey="Artworks">
        <Tab eventKey="Artworks" title="Artworks">
          <Row xl={4} lg={3} md={2} sm={1} xs={1}>
          {console.log("queryRE: ", queryRE)}
          {console.log(artworkData.length !== undefined)}
          {console.log(artworkData)}
          { artworkData.length !== undefined ? artworkData.map(entry => (
            <Col>
              <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                <Card.Img variant="top" src={ entry.image } />
                <Card.Body>
                  <Card.Title>{ highlightText(entry.title, queryRE) }</Card.Title>
                  <Card.Text>{ highlightText(entry.medium, queryRE) }</Card.Text>
                  <Card.Text>ID #{ entry.id } | made in { entry.date } by artist ID {entry.artist_id}</Card.Text>
                  <Link to={`/artworks/${ entry.id }`}>
                    <Button>Explore More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )) : "No artwork found for the search"}
          </Row>
        </Tab>
        <Tab eventKey="Artists" title="Artists">
          <Row xl={4} lg={3} md={2} sm={1} xs={1}>
          { artistData.length !== undefined ? artistData.map(entry => (
            <Col>
              <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                <Card.Img variant="top" src={ entry.thumbnail } />
                <Card.Body>
                  <Card.Title>{ highlightText(entry.name, queryRE) }</Card.Title>
                  <Card.Text>{ highlightText(entry.medium, queryRE) }</Card.Text>
                  <Card.Text>{ entry.birth_year } - { entry.death_year ? entry.death_year : "Present" }</Card.Text>
                  <Card.Text>ID #{ entry.id } | { entry.num_artworks } artworks | { entry.num_galleries } gallery</Card.Text>
                  <Link to={`/artists/${ entry.id }`}>
                    <Button>Explore More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )) : "No artists found for the search"}
          </Row>
        </Tab>
        <Tab eventKey="Galleries" title="Galleries">
          <Row xl={4} lg={3} md={2} sm={1} xs={1}>
          { galleryData.length !== undefined ? galleryData.map(entry => (
            <Col>
              <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                <Card.Img variant="top" src={ entry.thumbnail } />
                <Card.Body>
                  <Card.Title>{ highlightText(entry.name, queryRE) }</Card.Title>
                  <Card.Text>{ highlightText(entry.region, queryRE) }</Card.Text>
                  <Card.Text>ID #{ entry.id } | { entry.num_artworks } artworks | { entry.num_artists } artists</Card.Text>
                  <Link to={`/galleries/${ entry.id }`}>
                    <Button>Explore More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )) : "No gallery data found for the search"}
          </Row>
        </Tab>
      </Tabs>
      </Container>
    </div>
  );
}

export default SearchPage;
