import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Artists = () => {
  return (
    <div>
      <h1>Artists</h1>
      <p>1 Page, 3 artists.</p>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Grant Wood</Card.Title>
            <Card.Text>
              Grant Wood is known for his stylized and subtly humorous scenes of rural people, Iowa cornfields, and mythic subjects from American history
            </Card.Text>
            <Link to='/artists/GrantWood'>
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
            <Link to='/artists/VincentvanGogh'>
              <Button>Read More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Mary Cassatt</Card.Title>
            <Card.Text>
            One of only three women -- and the only American, woman or man -- invited to exhibit with the Impressionists in Paris, Cassatt spent the majority of her career abroad. 
            </Card.Text>
            <Link to='/artists/MaryCassatt'>
              <Button>Read More</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Artists;