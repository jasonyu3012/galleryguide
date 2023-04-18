import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Pagination from 'react-bootstrap/Pagination';
import { Button, Card, Col, Row } from 'react-bootstrap';
import './InstanceModels.css';
import '../Pagination.css';
import {IconicityFilter, DateFilter} from '../Filters';
import { highlightText } from './SearchPage';

const ARTWORKS_NUM_PAGES = 888;
export const ARTWORKS_NUM_IDS = 7986;


class Artworks extends Component {
  state = {
    databaseResponse: [],
    data: [],
    pageIndex: 1,
    query: '',
    sortOption: '',
    sortState: ''
  };
  

  componentDidMount() {
    this.getResponseData(1);
  }

  handleClick = (clickAction) => {
    const selected = clickAction.selected + 1;
    this.setState({ pageIndex: selected });
    this.getResponseData(selected);
  };

  handleQueryChange = () => {
    let value = this.state.query;
    this.setState({ pageIndex: 1 })
    if (value === '') {
      this.setState({ query: ''})
    } else {
      // Update the request URL by replacing ' ' with +
      value = value.replaceAll(' ', '+')
      this.setState({ query: value})
    }

    // Make the request to the DB
    axios.get("https://galleryguide.me/api/artworks", { 
      params: {
        page: this.state.pageIndex,
        ...(this.state.query === '' ? {} : { query: this.state.query })
    }})
    .then(response => {
      const responseData = response.data
      console.log("SEARCH artworks data:")
      console.log(responseData.artworks)

      this.setState({ databaseResponse: responseData })
      this.setState({ data: responseData.artworks })
    })
    .catch((error) => {
      console.log("axios error: ", error)
    })
  }


  getResponseData = (targetIndex) => {
    axios
      .get("https://galleryguide.me/api/artworks", { 
        params: {
          page: targetIndex,
          ...(this.state.query === '' ? {} : { query: this.state.query }),
          ...(this.state.sortOption === '' ? {} : { sort: this.state.sortOption+" "+this.state.sortState }),
          ...(this.state.filterOption === '' ? {} : { filter: this.state.filterOption})
      }})
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("artwork data:")
        console.log(responseData.artworks)
        this.setState({ databaseResponse: responseData, data: responseData.artworks });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      });
  };

  handleIconicity = (option) => {
      this.setState({ pageIndex: 1 })
      this.setState({sortOption : 'iconicity'})
      this.setState({sortState : option}, ()=>
      axios
      .get(`https://galleryguide.me/api/artworks`, {
        params : {
          page: this.state.pageIndex,
          sort: this.state.sortOption+' '+this.state.sortState
          }
        })
        .then((response) => {
          const responseData = response.data;
          console.log("response data:")
          console.log(responseData)
          console.log("artwork data:")
          console.log(responseData.artworks)
          this.setState({ databaseResponse: responseData, data: responseData.artworks });
        })
        .catch((error) => {
          console.log("axios error: ", error);
        })
      )
  }

  handleDate = (option) => {
    this.setState({sortOption : 'date'})
    this.setState({sortState : option}, ()=> 
     axios
     .get(`https://galleryguide.me/api/artworks`, {
       params : {page: this.state.pageIndex,
       sort: this.state.sortOption+' '+this.state.sortState
       }
       })
        .then((response) => {
          const responseData = response.data;
          this.setState({ databaseResponse: responseData, data: responseData.artworks });
        })
        .catch((error) => {
          console.log("axios error: ", error);
        })
    )
  }

  handleDefault = () => {
    this.setState({sortOption : ''})
    this.setState({sortState : ''})
    axios
    .get(`https://galleryguide.me/api/artworks`, {
      params : {
        page: this.state.pageIndex,
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

  render() {
    const { pageIndex, data } = this.state;

    return (
      <div>
        <h1>Artworks</h1>
        <div>
          <input
            type="text"
            placeholder="Search artworks"
            id="query"
            name="query"
            onChange={(event) => this.setState({query: event.target.value})}
          />
          <button id="artworks-search" style={{marginLeft: "1em"}} type="submit" onClick={ this.handleQueryChange }>Search</button>
        </div>
        <p><IconicityFilter onSelect={this.handleIconicity}/>
        <DateFilter onSelect={this.handleDate}/>
        <Button onClick={this.handleDefault}>Clear Sorting Options</Button>
        </p>
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
                  <Card.Title>{ highlightText(entry.title, this.state.query) }</Card.Title>
                  <Card.Text>{ highlightText(entry.medium, this.state.query) }</Card.Text>
                  <Card.Text>ID #{ entry.id } | made in { entry.date } by artist ID {entry.artist_id}</Card.Text>
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
