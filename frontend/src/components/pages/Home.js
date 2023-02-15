import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Motivation for GalleryGuide, paste from readme.</p>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Artworks</Card.Title>
            <Card.Text>
              View our artwork instances.
            </Card.Text>
            <Link to='/artworks'>
              <Button>Artworks</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Artists</Card.Title>
            <Card.Text>
              View our artist instances.
            </Card.Text>
            <Link to='/artists'>
              <Button>Artists</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Galleries</Card.Title>
            <Card.Text>
              View our gallery instances.
            </Card.Text>
            <Link to='/galleries'>
              <Button>Galleries</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Home;