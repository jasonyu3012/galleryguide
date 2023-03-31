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
import {RegionFilter, ArtistNumSort, ArtworkNumSort} from '../Filters';

// TODO Placeholders for now
const GALLERIES_NUM_PAGES = 3;
export const GALLERIES_NUM_IDS = 30;

export default class Artworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databaseResponse: [],
      data: [],
      pageIndex: 1,
      sortOption: '',
      sortState: '', 
      filterOption: ''
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
    console.log("gallery search value: ", value)

    // Make the request to the DB
    axios.get("https://galleryguide.me/api/galleries", { 
      params: {
        page: this.state.pageIndex,
        ...(this.state.query === '' ? {} : { query: this.state.query })
    }})
    .then(response => {
      const responseData = response.data
      console.log("SEARCH response data:")
      console.log(responseData)
      console.log("SEARCH gallery data:")
      console.log(responseData.galleries)

      this.setState({ databaseResponse: responseData })
      this.setState({ data: responseData.galleries })
    })
    .catch((error) => {
      console.log("axios error: ", error)
    })
  }

  getResponseData = (targetIndex) => {
    axios.get("https://galleryguide.me/api/galleries", { 
      params: {
        page: targetIndex,
        ...(this.state.query === '' ? {} : { query: this.state.query }),
        ...(this.state.sortOption === '' ? {} : { sort: this.state.sortOption+"+"+this.state.sortState }),
        ...(this.state.filterOption === '' ? {} : { filter: this.state.filterOption}),
    }})
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

  handleRegion = (option) => {
    this.setState({ pageIndex: 1 })
    this.setState({filterOption : option}, () =>
    axios
    .get(`https://galleryguide.me/api/galleries`, {
      params : {
        page: this.state.pageIndex,
        region: this.state.filterOption
      }
      })
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("gallery data:")
        console.log(responseData.galleries)
        this.setState({ databaseResponse: responseData, data: responseData.galleries });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      })
    )
}

  handleArtistNum = (option) => {
    this.setState({ pageIndex: 1 })
    this.setState({sortOption : 'artists'},  ()=>
    this.setState({sortState : option}, () =>
    console.log('sortoption: '+ this.state.sortOption), 
    console.log('sortstate: '+ this.state.sortState), 
    axios
     .get(`https://galleryguide.me/api/galleries`, {
      params : {
        page: this.state.pageIndex,
        sort: this.state.sortOption+'+'+this.state.sortState
        }
      })
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("artwork data:")
        console.log(responseData.galleries)
        this.setState({ databaseResponse: responseData, data: responseData.galleries });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      })
    )
    )
  }

  handleArtworkNum = (option) => {
    this.setState({ pageIndex: 1 })
    this.setState({sortOption : 'artworks'})
    this.setState({sortState : option})
    axios
     .get(`https://galleryguide.me/api/galleries`, {
      params : {
        page: this.state.pageIndex,
        sort: this.state.sortOption+'+'+this.state.sortState
        }
      })
      .then((response) => {
        const responseData = response.data;
        console.log("response data:")
        console.log(responseData)
        console.log("artwork data:")
        console.log(responseData.galleries)
        this.setState({ databaseResponse: responseData, data: responseData.galleries });
      })
      .catch((error) => {
        console.log("axios error: ", error);
      });
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
        <h1>Galleries</h1>
        <div>
          <input
            type="text"
            placeholder="Search galleries"
            id="query"
            name="query"
            onChange={(event) => this.setState({query: event.target.value})}
          />
          <button style={{marginLeft: "1em"}} type="submit" onClick={ this.handleQueryChange }>Search</button>
        </div>
        <RegionFilter onSelect={this.handleRegion}/>
        <ArtistNumSort onSelect={this.handleArtistNum}/>
        <ArtworkNumSort onSelect={this.handleArtworkNum}/>
        <Button onClick={this.handleDefault}>Clear Sorting Options</Button>
        <p>Showing page {this.state.pageIndex}/{GALLERIES_NUM_PAGES}, {this.state.data.length}/{GALLERIES_NUM_IDS} galleries.</p>
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
          pageCount={GALLERIES_NUM_PAGES}
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
                    <Card.Text>ID #{ entry.id } | { entry.num_artworks } artworks | { entry.num_artists } artists</Card.Text>
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
