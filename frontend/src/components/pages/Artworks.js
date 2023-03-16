// React imports
import { Link } from 'react-router-dom';
import React from 'react';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
// Local imports
import './Artworks.css';

const ARTWORKS_NUM_PAGES = 888;
export const ARTWORKS_NUM_IDS = 7986;

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
    axios.get(`https://galleryguide.me/api/artworks?page=${this.state.pageIndex}`)
      .then(response => {
        console.log(this.url)
        const responseData = response.data
        console.log("response data:")
        console.log(responseData)
        console.log("artwork data:")
        console.log(responseData.artworks)

        this.setState({ databaseResponse: responseData })
        this.setState({ data: responseData.artworks })
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
        {
          <Row xs={ 1 } md={ 3 } className="g-4">
            { this.state.data.map(entry => (
              <Col>
                <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                  <Card.Img variant="top" src={ entry.image } />
                  <Card.Body>
                    <Card.Title>{ entry.title }</Card.Title>
                    <Card.Text>{ entry.medium }</Card.Text>
                    {/* TODO #75 figure out how to link artwork previews to their instance pages */ }
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
