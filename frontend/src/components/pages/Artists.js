import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Artists = () => {
  return (
    <div>
      <h1>Artists</h1>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Grant Wood</Card.Title>
            <Card.Text>
              Grant Wood is known for his stylized and subtly humorous scenes of rural people, Iowa cornfields, and mythic subjects from American history
            </Card.Text>
            <Link to='/GrantWood'>
              <Button>Read More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Vincent van Gogh</Card.Title>
            <Card.Text>
              A Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history. 
            </Card.Text>
            <Link to='/VincentvanGogh'>
              <Button>Read More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Mary Cassat</Card.Title>
            <Card.Text>
              The National Gallery of Art is a museum in Washington, D.C. that hosts a variety of artworks, collected primarily though donation.  
            </Card.Text>
            <Link to='/NationalGallery'>
              <Button>Explore the National Gallery of Art</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Artists;