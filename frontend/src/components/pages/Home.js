import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import './Home.css';
import { Link } from 'react-router-dom';
import StarryNight from '../images/StarryNight.jpg'
import VanGogh from '../images/VanGogh.jpg'
import METMuseum from '../images/METMuseum.jpg'
import splash from '../images/splash.png'

const Home = () => {
  return (
    <div>
      <img src={splash} style={{maxWidth:"100%", height: 'auto', borderRadius: '1rem'}}/>
      <CardGroup>
        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          <Card.Img variant="top" src={StarryNight}/>
          <Card.Body>
            <Card.Title>Artworks</Card.Title>
            <Card.Text>
              View our artwork instances.
            </Card.Text>
            <Link to='/artworks' id="artworks-link">
              <Button>Artworks</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          <Card.Img variant="top" src={VanGogh}/>
          <Card.Body>
            <Card.Title>Artists</Card.Title>
            <Card.Text>
              View our artist instances.
            </Card.Text>
            <Link to='/artists' id="artists-link">
              <Button>Artists</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card style={{ width: '15rem', justifyContent: 'center' }}>
          <Card.Img variant="top" src={METMuseum}/>
          <Card.Body>
            <Card.Title>Galleries</Card.Title>
            <Card.Text>
              View our gallery instances.
            </Card.Text>
            <Link to='/galleries' id="galleries-link">
              <Button>Galleries</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Home;