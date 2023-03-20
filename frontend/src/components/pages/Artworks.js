// React imports
import { Link } from 'react-router-dom';
import React from 'react';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
// Local imports
import './InstanceModels.css';

const ARTWORKS_NUM_PAGES = 888;
export const ARTWORKS_NUM_IDS = 7986;


export default class Artworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseResponse: [],
      data: [],
      pageIndex: 1,
    };
  }

  // TODO #33 implement pagination
  getResponseData = (targetIndex) => {
    console.log("getting response data")
    // TODO do some checks
    axios.get(`https://galleryguide.me/api/artworks?page=${ targetIndex }`)
      .then(response => {
        console.log(this.url)
        const responseData = response.data
        console.log("response data:")
        console.log(responseData)
        console.log("artwork data:")
        console.log(responseData.artworks)

        this.setState({ databaseResponse: responseData })
        this.setState({ data: responseData.artworks })
        this.setState({ pageIndex: targetIndex })
      })
      .catch((error) => {
        console.log("axios error: ", error)
      })
  }

  // Set up pagination items
  paginationSetup() {
    return (
      <Pagination>
        <Pagination.First onClick={this.getResponseData(1)}/>
        <Pagination.Prev onClick={this.getResponseData(this.state.pageIndex - 1)}/>
        <Pagination.Item onClick={this.getResponseData(5)} key={5} active={5 === this.state.pageIndex}>
          {5}</Pagination.Item>
        <Pagination.Ellipsis/>

        <Pagination.Item onClick={this.getResponseData(10)} key={10} active={10 === this.state.pageIndex}>
          {10}</Pagination.Item>

        <Pagination.Ellipsis/>
        <Pagination.Item onClick={this.getResponseData(ARTWORKS_NUM_PAGES)} key={ARTWORKS_NUM_PAGES} active={ARTWORKS_NUM_PAGES === this.state.pageIndex}>
          { ARTWORKS_NUM_PAGES }</Pagination.Item>
        <Pagination.Next onClick={this.getResponseData(this.state.pageIndex + 1)}/>
        <Pagination.Last onClick={this.getResponseData(ARTWORKS_NUM_PAGES)}/>
      </Pagination>
    )
  }

  // Run once the page has loaded
  componentDidMount() {
    console.log("page loaded")
    this.getResponseData(1)
  }

  render() {
    return (
      <div>
        <h1>Artworks</h1>
        <p>Showing page { this.state.pageIndex }/{ ARTWORKS_NUM_PAGES }, 9/{ ARTWORKS_NUM_IDS } artworks.</p>
        { this.paginationSetup() }
        <h1>test</h1>
        {
          <Row xs={1} md={3} className="g-4">
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
