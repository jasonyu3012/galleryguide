// React imports
import { Link } from 'react-router-dom';
import React from 'react';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
// Local imports
import './Artworks.css';

//where to find the actual numbers?
const ARTISTS_NUM_PAGES = 10;
export const ARTISTS_NUM_IDS = 1000;

export default class Artists extends React.Component {
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
        console.log("artist data:")
        console.log(responseData.artists)

        this.setState({ databaseResponse: responseData })
        this.setState({ data: responseData.artists })
      })
      .catch((error) => {
        console.log("axios error: ", error)
      })
  }

  // Run once the page has loaded (will actually run twice because of App.js, I think)
  componentDidMount() {
    console.log("page loaded")
    this.getResponseData()
  }

  render() {
    return (
      <div>
        <h1>Artists</h1>
        <p>Showing page {this.state.pageIndex}/{ARTISTS_NUM_PAGES}, 9/{ARTISTS_NUM_IDS} artworks.</p>
        {
          <Row xs={ 1 } md={ 3 } className="g-4">
            { this.state.data.map(entry => (
              <Col>
                <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                  <Card.Img variant="top" src={ entry.image } />
                  <Card.Body>
                    <Card.Title>{ entry.title }</Card.Title>
                    <Card.Text>{ "put relevant artist information here" }</Card.Text>
                    {/* TODO #75 figure out how to link gallery previews to their instance pages */ }
                    <Link to={`/artists/${ entry.id }`}>
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
