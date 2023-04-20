// https://gitlab.com/mrscottwlai/cs373-idb/-/blob/main/front-end/src/components/SearchPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Col, Container, Row, Tab, Tabs, Card, Button } from "react-bootstrap";
import axios from 'axios';
import { Highlight } from "react-highlight-regex";

function highlightText (input, raw_regex) {
  // console.log("INPUT: ", input)
  // console.log("REGEX: ", raw_regex)
  if (raw_regex != undefined && raw_regex.length != 0 && input != undefined && input.length != 0) {
    let queryRE = new RegExp(`(?:${raw_regex.replaceAll(" ", "|")})`, "i");
    return <Highlight match={queryRE} text={input} />
  }
  return input;
}

const SearchPage = () => {
  let query = useParams().query;
  const [artworkData, setArtworkData] = useState({});
  const [artistData, setArtistData] = useState({});
  const [galleryData, setGalleryData] = useState({});
  console.log("query search: ", query)

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
          {console.log("queryRE: ", query)}
          {console.log(artworkData.length !== undefined)}
          {console.log(artworkData)}
          { artworkData.length !== undefined ? artworkData.map(entry => (
            <Col>
              <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                <Card.Img variant="top" src={ entry.image } />
                <Card.Body>
                  <Card.Title>{ highlightText(entry.title, query) }</Card.Title>
                  <Card.Text>{ highlightText(entry.medium, query) }</Card.Text>
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
                  <Card.Title>{ highlightText(entry.name, query) }</Card.Title>
                  <Card.Text>{ highlightText(entry.medium, query) }</Card.Text>
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
                  <Card.Title>{ highlightText(entry.name, query) }</Card.Title>
                  <Card.Text>{ highlightText(entry.region, query) }</Card.Text>
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

export {SearchPage, highlightText};
