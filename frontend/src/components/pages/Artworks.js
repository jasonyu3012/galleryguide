import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Artworks = () => {
  return (
    <div>
      <h1>Artworks</h1>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>American Gothic</Card.Title>
            <Card.Text>
              *insert image here*
            </Card.Text>
            <Link to='/AmericanGothic'>
              <Button>Explore More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Wheat Field with Cypresses</Card.Title>
            <Card.Text>
              *image here*
            </Card.Text>
            <Link to='/WheatFieldwithCypresses'>
              <Button>Explore More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src=''/>
          <Card.Body>
            <Card.Title>Little Girl in a Blue Armchair</Card.Title>
            <Card.Text>
             *image here*
            </Card.Text>
            <Link to='/LittleGirlInaBlueArmchair'>
              <Button>ExploreMore More</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Artworks;