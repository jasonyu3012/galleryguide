import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Galleries = () => {
  return (
    <div>
      <h1>Galleries</h1>
      <p>Showing 1/1 Pages, 3/3 galleries.</p>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Art Institute of Chicago</Card.Title>
            <Card.Text>
              The Art Institute of Chicago is the second largest art museum in the USA housing a world-renowned encyclopedic collection.
            </Card.Text>
            <Link to='/galleries/ArtInstituteofChicago'>
              <Button>Explore the Art Institute of Chicago</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>MET Museum</Card.Title>
            <Card.Text>
              The Metropolitan Museum of Art, also known as the MET, is the largest and most visited Museum in the United States. 
            </Card.Text>
            <Link to='/galleries/MetMuseum'>
              <Button>Explore the MET Museum</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>National Gallery of Art</Card.Title>
            <Card.Text>
              The National Gallery of Art is a museum in Washington, D.C. that hosts a variety of artworks, collected primarily though donation.  
            </Card.Text>
            <Link to='/galleries/NationalGalleryofArt'>
              <Button>Explore the National Gallery of Art</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>

    </div>
  );
}

export default Galleries;