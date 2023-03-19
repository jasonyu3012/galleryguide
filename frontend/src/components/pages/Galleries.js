// React imports
import { Link } from 'react-router-dom';
import React from 'react';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
// Local imports
import './InstanceModels.css';

// TODO Placeholders for now
const GALLERIES_NUM_PAGES = 100;
export const GALLERIES_NUM_IDS = 1000;

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
    axios.get(`https://galleryguide.me/api/galleries?page=${this.state.pageIndex}`)
      .then(response => {
        console.log(this.url)
        const responseData = response.data
        console.log("response data:")
        console.log(responseData)
        console.log("gallery data:")
        console.log(responseData.galleries)

        this.setState({ databaseResponse: responseData })
        this.setState({ data: responseData.galleries })
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
        <h1>Galleries</h1>
        <p>Showing page {this.state.pageIndex}/{GALLERIES_NUM_PAGES}, 9/{GALLERIES_NUM_IDS} galleries.</p>
        {
          <Row xs={ 1 } md={ 3 } className="g-4">
            { this.state.data.map(entry => (
              <Col>
                <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                  <Card.Img variant="top" src={ entry.thumbnail } />
                  <Card.Body>
                    {/* TODO #? add 5 sortable features to card */}
                    <Card.Title>{ entry.name }</Card.Title>
                    <Card.Text>{ entry.region }</Card.Text>
                    <Link to={`/galleries/${ entry.id }`}>
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
