import { Row, Container } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { PageControl } from './../../components/ModelPagination'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { SearchBar } from '../../components/SearchBar';
import { convertToBCE } from '../instances/InstanceConversions'
import Highlighter from 'react-highlight-words'

import './Grid.css'
import filterData from './artistFilters.json';

export interface ArtistTableProps {
  data: any
  highlight: string[]
}

export function ArtistTable(props: ArtistTableProps) {

  // https://github.com/TanStack/table/discussions/2336
  const navigate = useNavigate();
  const handleRowClick = (artist: any) => {
    navigate(`/artists/${artist.id}`);
  }

  if (props.data.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  var searchTerms: string[];
  if (props.highlight[0] === undefined) {
    searchTerms = []
  } else {
    searchTerms = props.highlight
  }

  return (

    <Table hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Birth Date</th>
          <th>Death Date</th>
          <th>Status</th>
          <th>Birth Country</th>
          <th>Ethnicity</th>
          <th>Number of Works</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item: any) => {
          return (
            <tr onClick={() => handleRowClick(item)}>
              <td>
                <Highlighter
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={item.name}
                >
                </Highlighter>

              </td>
              <td>
                <Highlighter
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={item.gender}
                >
                </Highlighter>

              </td>
              <td>
                {convertToBCE(item.birth_date)}
              </td>
              <td>
                {convertToBCE(item.death_date)}
              </td>
              <td>
                <Highlighter
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={item.status}
                >
                </Highlighter>

              </td>
              <td>
                <Highlighter
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={item.birth_place}
                >
                </Highlighter>

              </td>
              <td>
                <Highlighter
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={item.ethnicity}
                >
                </Highlighter>

              </td>
              <td>
                {item.number_of_works}
              </td>
            </tr>
          );
        })}

      </tbody>
    </Table>
  )
}

function ArtistPage() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [apiDataLoaded, setApiDataLoaded] = useState(false)
  const [apiData, setApiData] = useState<any[]>([])

  const [apiDataLength, setApiDataLength] = useState(0)
  const [highlightInput, setHighlightInput] = useState([])

  const fetchData = () => {
    return fetch("https://api.artdb.me/artists?" + searchParams.toString())
      .then((response) => response.json())
      .then((responseJson) => {
        setApiData(responseJson.data)
        setApiDataLength(responseJson.total)
        setHighlightInput(responseJson.highlight)
      })
      .finally(() => setApiDataLoaded(true))
  }

  useEffect(() => {
    fetchData()
  }, [searchParams])

  const currentPage = useMemo(() => {
    return Number(searchParams.get("page") ?? 1)
  }, [searchParams])

  const pageSize = useMemo(() => {
    return Number(searchParams.get("per_page") ?? 20)
  }, [searchParams])

  // TODO: Use the page and per_page ones filters so we don't
  // slice the data
  const currentData = useMemo(() => {
    if (apiDataLoaded) {
      return apiData
    } else {
      return []
    }
  }, [apiDataLoaded, apiData]);

  return (
    <Container>
      <Row className="title">
        Artists
      </Row>
      <Row className="space" />
      <SearchBar
        searchParams={searchParams}
        searchParamsChange={setSearchParams}
        sortableFields={["name", "birth_date", "death_date", "number_of_works"]}
        filterData={filterData} />
      <ArtistTable data={currentData} highlight={highlightInput} />
      <PageControl
        currentPage={currentPage}
        totalCount={apiDataLength}
        pageSize={pageSize}
        dataLoaded={apiDataLoaded}
        searchParams={searchParams}
        searchParamsChange={setSearchParams}
      />
    </Container>
  )
}
export default ArtistPage;
