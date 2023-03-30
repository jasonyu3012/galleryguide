import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export function IconicityFilter(props) {
  return (
    <DropdownButton id="filter-iconicity" title="Filter by Iconicity">
      <Dropdown.Item onClick={() => props.onSelect('true')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('false')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function DateFilter(props) {
  return (
    <DropdownButton id="filter-date" title="Sort by Date">
      <Dropdown.Item onClick={() => props.onSelect('true')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('false')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function ArtworkNumSort(props) {
  return (
    <DropdownButton id="sort-num-artworks" title="Sort by Number of Artworks">
      <Dropdown.Item onClick={() => props.onSelect('artworks+true')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('artworks+false')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function DeathFilter(props) {
  return (
    <DropdownButton id="filter-death" title="Sort by Death Year">
      <Dropdown.Item onClick={() => props.onSelect('ascending')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('descending')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function BirthFilter(props) {
  return (
    <DropdownButton id="filter-birth" title="Sort by Birth Year">
      <Dropdown.Item onClick={() => props.onSelect('ascending')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('descending')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

//gallery
export function RegionFilter(props) {
  return (
    <DropdownButton id="filter-region-gallery" title="Filter by Region">
      <Dropdown.Item onClick={() => props.onSelect('Europe')}>Europe</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('Asia')}>Asia</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('North America')}>North America</Dropdown.Item>
    </DropdownButton>
  );
}

//gallery
export function ArtistNumSort(props) {
  return (
    <DropdownButton id="sort-num-artists" title="Sort by Number of Artists">
      <Dropdown.Item onClick={() => props.onSelect('artists+true')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('artists+false')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function ArtistArtworkNumSort(props) {
  return (
    <DropdownButton id="sort-num-artworks" title="Sort by Number of Artworks">
      <Dropdown.Item onClick={() => props.onSelect('artworks+true')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('artworks+false')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

