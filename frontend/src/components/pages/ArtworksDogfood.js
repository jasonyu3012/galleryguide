import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import axios from 'axios';

// import { Card, Row, Col, Container } from "react-bootstrap";
import './Artworks.css';

const DynamicArt = () => {
  const artInfo = [
    {
      artist_id:"chicken artist",
      date:"today before class",
      id:"1",
      image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.backwoodshome.com%2Fbhm%2Fwp-content%2Fuploads%2F2015%2F12%2Fanimal-chicken-cockscomb-34770.jpg&f=1&nofb=1&ipt=56231d29706197b0b256b0718d359a66aed0c7c639c0ffdd7367d20d6d1cead6&ipo=images",
      medium:"funny photo",
      title:"chicken",
    },
    {
      artist_id:"",
      date:"",
      id:"2",
      image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-ZJ-vP-TUvTs%2FUboFqFRTIaI%2FAAAAAAAADkk%2Fllhwb21VFOg%2Fs1600%2FSwan-Nice-Pic.jpg&f=1&nofb=1&ipt=0bc2cef5d7a29e7db594bebf200e9cf696d5f131d9930c314a82dac1fdac273a&ipo=images",
      medium:"",
      title:"swan",
    },
    {
      artist_id:"",
      date:"",
      id:"3",
      image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fe8%2FMute_swan.jpg&f=1&nofb=1&ipt=4cd384a7a83b75421c38b6d09458ca8ba277ae534a49928eba6580d09118634b&ipo=images",
      medium:"",
      title:"swan photo 2",
    }
  ]

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: '15rem', justifyContent: 'center' }} key={index}>
        <Card.Img variant="top" src={card.image}/>
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.medium}</Card.Text>
          {/* TODO #75 figure out how to link artwork previews to their instance pages */}
          <Link to='/artworks/AmericanGothic'>
            <Button>Explore More</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return (
    <CardGroup>
      {artInfo.map(renderCard)}
    </CardGroup>
  );
}

const instance = axios.create({
  baseURL: 'https://api.artic.edu/api/v1/artworks'
});

export default class Artworks extends React.Component {
  
  // Initialize artwork data
  // const [artworkData, setArtworkData] = useState({
  //   artist_id:"",
  //   date:"",
  //   id:"",
  //   image:"",
  //   medium:"",
  //   title:"",
  // });
  constructor(props) {
    super(props);
    this.state = {
      databaseResponse: [],
      data: []
    };
  }

  getUsersData() {
    instance.get()
      .then(response => {
        const responseData = response.data
        console.log("response data:")
        console.log(responseData)

        this.setState({databaseResponse:responseData})
        this.setState({data:responseData.data})
      })
      .catch((error) => {
        console.log("axios error: ", error)
      })
  }

  componentDidMount() {
    console.log("page loaded")
    this.getUsersData()
  }

  // // https://medium.com/how-to-react/simplest-way-to-use-axios-to-fetch-data-from-an-api-in-reactjs-cd9af9d7230
  // componentDidMount() {
  //   // axios.get(`https://galleryguide.me/api/artworks`)
  //   axios.get(`https://api.artic.edu/api/v1/artworks`)
  //     .then(response => {
  //       console.log(response.data)
  //       console.log(response.data.data)
  //       this.setState({ databaseResponse: response.data });
  //       console.log("state of databaseResponse:")
  //       console.log(this.state.databaseResponse)
  //     })
  // }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.data.map(entry =>
              <li key={entry.id}>{entry.id}: {entry.api_model}, {entry.api_link}</li>
            )
          }
        </ul>
        {DynamicArt()}
      </div>
    )
  }
}
