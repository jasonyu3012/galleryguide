// React imports
import { Link } from 'react-router-dom';
import React from 'react';
import ReactPaginate from 'react-paginate';
// Library imports
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
// Local imports
import './InstanceModels.css';
import '../Pagination.css';

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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (clickAction) {
    console.log("SELECTED: ", clickAction.selected)
    let selected = clickAction.selected + 1;
    this.setState({ pageIndex: selected })
    this.getResponseData(selected)
  }

  getResponseData = (targetIndex) => {
    // TODO PHASE 3 do some checks to make sure within range
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
        <h1>Artworks</h1>
        <p>Showing page { this.state.pageIndex }/{ ARTWORKS_NUM_PAGES }, 9/{ ARTWORKS_NUM_IDS } artworks.</p>
        {<ReactPaginate
          breakLabel={'...'}
          nextLabel={<Pagination.Next />}
          onPageChange={this.handleClick}
          activeClassName={'item active'}
          breakClassName={'item break-me'}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={'item next'}
          pageClassName={'item pagination-page'}
          pageRangeDisplayed={5}
          previousClassName={'item previous'}
          pageCount={ARTWORKS_NUM_PAGES}
          previousLabel={<Pagination.Prev /> }
          renderOnZeroPageCount={null} 
        />}
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
