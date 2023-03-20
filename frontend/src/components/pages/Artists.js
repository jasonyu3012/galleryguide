// React imports
import { Link } from 'react-router-dom';
import React from 'react';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (clickAction) {
    console.log("SELECTED: ", clickAction.selected)
    let selected = clickAction.selected + 1;
    this.setState({ pageIndex: selected })
    this.getResponseData(selected)
  }

  getResponseData = (targetIndex) => {
    axios.get(`https://galleryguide.me/api/artists?page=${ targetIndex }`)
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

  // Run once the page has loaded
  componentDidMount() {
    console.log("page loaded")
    this.getResponseData(1)
  }

  render() {
    return (
      <div>
        <h1>Artists</h1>
        <p>Showing page {this.state.pageIndex}/{ARTISTS_NUM_PAGES}, 9/{ARTISTS_NUM_IDS} artworks.</p>
        {<ReactPaginate
          pageCount={ARTISTS_NUM_PAGES}
          marginPagesDisplayed={2}
          onPageChange={this.handleClick}
          containerClassName={'container'}
          previousLinkClassName={'page'}
          breakClassName={'page'}
          nextLinkClassName={'page'}
          pageClassName={'page'}
          disabledClassNae={'disabled'}
          activeClassName={'active'}
        />}
        {
          <Row xs={ 1 } md={ 3 } className="g-4">
            { this.state.data.map(entry => (
              <Col>
                <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                  <Card.Img variant="top" src={ entry.thumbnail } />
                  <Card.Body>
                    {/* TODO #? add 5 sortable features to card */}
                    <Card.Title>{ entry.name }</Card.Title>
                    <Card.Text>{ entry.medium }</Card.Text>
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
