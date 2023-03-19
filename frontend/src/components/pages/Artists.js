// React imports
import { Link } from 'react-router-dom';
import React from 'react';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
// Local imports
import './InstanceModels.css';

// TODO Placeholders for now
const ARTISTS_NUM_PAGES = 100;
export const ARTISTS_NUM_IDS = 1000;

export default class Artworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseResponse: [],
      data: [],
      pageIndex: 1
    };
  }

  // TODO #33 implement pagination
  getResponseData() {
    axios.get(`https://galleryguide.me/api/artists?page=${this.state.pageIndex}`)
      .then(response => {
        console.log(this.url)
        const responseData = response.data
        console.log("response data:")
        console.log(responseData)
        console.log("artwork data:")
        console.log(responseData.artists)

        this.setState({ databaseResponse: responseData })
        this.setState({ data: responseData.artists })
      })
      .catch((error) => {
        console.log("axios error: ", error)
      })
  }

  // Run once the page has loaded
  componentDidMount() {
    console.log("page loaded")
    this.getResponseData()
  }

  render() {
    return (
      <div>
        <h1>Artworks</h1>
        <p>Showing page {this.state.pageIndex}/{ARTISTS_NUM_PAGES}, 9/{ARTISTS_NUM_IDS} artworks.</p>
        {
          <Row xs={ 1 } md={ 3 } className="g-4">
            { this.state.data.map(entry => (
              <Col>
                <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                  <Card.Img variant="top" src={ entry.image } />
                  <Card.Body>
                    {/* TODO #? add 5 sortable features to card */}
                    <Card.Title>{ entry.title }</Card.Title>
                    <Card.Text>{ entry.medium }</Card.Text>
                    <Link to={`/artworks/${ entry.id }`}>
                      <Button>Explore More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )) }
          </Row>
        }
      </div>
    )
  }
}
