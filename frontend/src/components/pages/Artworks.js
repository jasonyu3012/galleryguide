import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AmericanGothic from '../images/AmericanGothic.jpg'
import GirlInChair from '../images/LittleGirlInABlueArmchair.jpg'
import WheatField from '../images/WheatFieldWithCypresses.jpg'

const Artworks = () => {
  return (
    <div>
      <h1>Artworks</h1>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src={AmericanGothic}/>
          <Card.Body>
            <Card.Title>American Gothic</Card.Title>
            <Card.Text>
            Painting of a woman and an older white man holding a pitchfork, both seen from the waist up. They stand side by side with stern expressions, in front of a white house with a peaked roof.
            </Card.Text>
            <Link to='/artworks/AmericanGothic'>
              <Button>Explore More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src={WheatField}/>
          <Card.Body>
            <Card.Title>Wheat Field with Cypresses</Card.Title>
            <Card.Text>
              *image here*
            </Card.Text>
            <Link to='/artworks/WheatFieldwithCypresses'>
              <Button>Explore More</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          {/* add in image! */}
          <Card.Img variant="top" src={GirlInChair}/>
          <Card.Body>
            <Card.Title>Little Girl in a Blue Armchair</Card.Title>
            <Card.Text>
            Painting of girl sprawled on a blue armchair in a room with three other chairs of a matching design.
            </Card.Text>
            <Link to='/artworks/LittleGirlInaBlueArmchair'>
              <Button>ExploreMore More</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Artworks;