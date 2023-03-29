import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Card, Col, Row } from 'react-bootstrap';
import './InstanceModels.css';
import '../Pagination.css';
import { ArtworkSearch } from '../Search';
import {IconicityFilter, DateFilter} from '../Filters';

const ARTWORKS_NUM_PAGES = 888;
export const ARTWORKS_NUM_IDS = 7986;



class Artworks extends Component {
  state = {
    databaseResponse: [],
    data: [],
    pageIndex: 1,
  };

  componentDidMount() {
    this.getResponseData(1);
  }

  handleClick = (clickAction) => {
    const selected = clickAction.selected + 1;
    this.setState({ pageIndex: selected });
    this.getResponseData(selected);
  };

  getResponseData = (targetIndex) => {
    axios
      .get(`https://galleryguide.me/api/artworks?page=${targetIndex}`)
      .then((response) => {
        const responseData = response.data;
        this.setState({ databaseResponse: responseData, data: responseData.artworks });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      });
  };

  handleIconicity = (option) => {
    if(option === 'ascending'){
      axios
      .get(`https://galleryguide.me/api/artworks`, {
        params : {
          sort : 'iconicity+false'
          }
        })
        .then((response) => {
          const responseData = response.data;
          this.setState({ databaseResponse: responseData, data: responseData.artworks });
        })
        .catch((error) => {
          console.log("axios error: ", error);
        });
    }
  }

  handleDate = (option) => {
    if(option === 'ascending'){
      axios
      .get(`https://galleryguide.me/api/artworks`, {
        params : {
          sort : 'date+false'
          }
        })
        .then((response) => {
          const responseData = response.data;
          this.setState({ databaseResponse: responseData, data: responseData.artworks });
        })
        .catch((error) => {
          console.log("axios error: ", error);
        });
    }
  }
  /*
  IconicityFilter(props) {
    return (
      <DropdownButton id="filter-iconicity" title="Filter by Iconicity">
        <Dropdown.Item onClick={() => props.onSelect('ascending')}>Ascending</Dropdown.Item>
        <Dropdown.Item onClick={() => props.onSelect('descending')}>Descending</Dropdown.Item>
      </DropdownButton>
    );
  }
  */
  render() {
    const { pageIndex, data } = this.state;

    return (
      <div>
        <h1>Artworks</h1>
        <ArtworkSearch/>
        <IconicityFilter onSelect={this.handleIconicity}/>
        <DateFilter onSelect={this.handleDate}/>
        <p>Showing page {pageIndex}/{ARTWORKS_NUM_PAGES}, 9/{ARTWORKS_NUM_IDS} artworks.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactPaginate
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
          previousLabel={<Pagination.Prev />}
          renderOnZeroPageCount={null}
        />
        </div>
        <Row xs={1} md={3} className="g-4">
          {data.map((entry) => (
            <Col key={entry.id}>
              <Card style={{ justifyContent: 'center' }}>
                <Card.Img variant="top" src={entry.image} />
                <Card.Body>
                  <Card.Title>{entry.title}</Card.Title>
                  <Card.Text>{entry.medium}</Card.Text>
                  <Link to={`/artworks/${entry.id}`}>
                    <Button>Explore More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Artworks;
