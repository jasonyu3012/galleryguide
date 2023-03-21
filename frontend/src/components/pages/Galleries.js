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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (clickAction) {
    console.log("SELECTED: ", clickAction.selected)
    let selected = clickAction.selected + 1;
    this.setState({ pageIndex: selected })
    this.getResponseData(selected)
  }

  getResponseData = (targetIndex) => {
    axios.get(`https://galleryguide.me/api/galleries?page=${ targetIndex }`)
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
    this.getResponseData(1)
  }

  render() {
    return (
      <div>
        <h1>Galleries</h1>
        <p>Showing page {this.state.pageIndex}/{GALLERIES_NUM_PAGES}, 9/{GALLERIES_NUM_IDS} galleries.</p>
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
          pageCount={GALLERIES_NUM_PAGES}
          previousLabel={<Pagination.Prev /> }
          renderOnZeroPageCount={null}
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
