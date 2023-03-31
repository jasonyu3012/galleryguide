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
import { highlightText } from './SearchPage';
import {DeathFilter, BirthFilter, ArtistArtworkNumSort} from '../Filters';

// TODO Placeholders for now
const ARTISTS_NUM_PAGES = 100;
export const ARTISTS_NUM_IDS = 1000;

export default class Artworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseResponse: [],
      data: [],
      pageIndex: 1,
      query: '',
      sortOption: '',
      sortState: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleClick (clickAction) {
    console.log("SELECTED: ", clickAction.selected)
    let selected = clickAction.selected + 1;
    this.setState({ pageIndex: selected })
    this.getResponseData(selected)
  }

  handleQueryChange () {
    let value = this.state.query;
    this.setState({ pageIndex: 1 })
    if (value === '') {
      this.setState({ query: ''})
    } else {
      // Update the request URL by replacing ' ' with +
      value = value.replaceAll(' ', '+')
      this.setState({ query: value})
    }
    console.log("artist search value: ", value)

    // Make the request to the DB
    axios.get("https://galleryguide.me/api/artists", { 
      params: {
        page: this.state.pageIndex,
        ...(this.state.query === '' ? {} : { query: this.state.query })
    }})
    .then(response => {
      const responseData = response.data
      console.log("SEARCH response data:")
      console.log(responseData)
      console.log("SEARCH artist data:")
      console.log(responseData.artists)

      this.setState({ databaseResponse: responseData })
      this.setState({ data: responseData.artists })
    })
    .catch((error) => {
      console.log("axios error: ", error)
    })
  }

  getResponseData = (targetIndex) => {
    axios.get("https://galleryguide.me/api/artists", { 
      params: {
        page: targetIndex,
        ...(this.state.query === '' ? {} : { query: this.state.query }),
        ...(this.state.sortOption === '' ? {} : { sort: this.state.sortOption+" "+this.state.sortState }),
    }})
    .then(response => {
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

  handleDeaths = (option) => {
    this.setState({ pageIndex: 1 })
    this.setState({sortOption : 'death_year'})
    this.setState({sortState : option}, ()=> 
    axios
     .get(`https://galleryguide.me/api/artists`, {
      params : {
        page: this.state.pageIndex,
        sort: this.state.sortOption+' '+this.state.sortState
        }
      })
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("artist data:")
        console.log(responseData.artists)
        this.setState({ databaseResponse: responseData, data: responseData.artists });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      })
    )
  }

  handleBirths = (option) => {
    this.setState({ pageIndex: 1 })
    this.setState({sortOption : 'birth_year'})
    this.setState({sortState : option}, () =>
    axios
     .get(`https://galleryguide.me/api/artists`, {
      params : {
        page: this.state.pageIndex,
        sort: this.state.sortOption+' '+this.state.sortState
        }
      })
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("artist data:")
        console.log(responseData.artists)
        this.setState({ databaseResponse: responseData, data: responseData.artists });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      })
    )
  }

  handleArtworks = (option) => {
    this.setState({ pageIndex: 1 })
    this.setState({sortOption : 'num_artworks'})
    this.setState({sortState : option}, () =>
    axios
     .get(`https://galleryguide.me/api/artists`, {
      params : {
        page: this.state.pageIndex,
        sort: this.state.sortOption+' '+this.state.sortState
        }
      })
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("artist data:")
        console.log(responseData.artists)
        this.setState({ databaseResponse: responseData, data: responseData.artists });
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

  // Run once the page has loaded
  componentDidMount() {
    console.log("page loaded")
    this.getResponseData(1)
  }

  render() {
    return (
      <div>
        <h1>Artists</h1>
        <div>
          <input
            type="text"
            placeholder="Search artists"
            id="query"
            name="query"
            onChange={(event) => this.setState({query: event.target.value})}
          />
          <button style={{marginLeft: "1em"}} type="submit" onClick={ this.handleQueryChange }>Search</button>
        </div>
            <DeathFilter onSelect={this.handleDeaths}/>
            <BirthFilter onSelect={this.handleBirths}/>
            <ArtistArtworkNumSort onSelect={this.handleArtworks}/>
            <Button onClick={this.handleDefault}>Clear Sorting Options</Button>
        <p>Showing page {this.state.pageIndex}/{ARTISTS_NUM_PAGES}, 9/{ARTISTS_NUM_IDS} artists.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
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
          pageCount={ARTISTS_NUM_PAGES}
          previousLabel={<Pagination.Prev /> }
          renderOnZeroPageCount={null} 
        />}
        </div>
        {
          <Row xs={ 1 } md={ 3 } className="g-4">
            { this.state.data.map(entry => (
              <Col>
                <Card style={{ justifyContent: 'center' }} key={ entry.id }>
                  <Card.Img variant="top" src={ entry.thumbnail } />
                  <Card.Body>
                    <Card.Title>{ highlightText(entry.name, this.state.query) }</Card.Title>
                    <Card.Text>{ highlightText(entry.medium, this.state.query) }</Card.Text>
                    <Card.Text>{ entry.birth_year } - { entry.death_year ? entry.death_year : "Present" }</Card.Text>
                    <Card.Text>ID #{ entry.id } | { entry.num_artworks } artworks | { entry.num_galleries } gallery</Card.Text>
                    <Link to={`/artists/${ entry.id }`}>
                      <Button>Explore More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        }
      </div>
    )
  }
}
