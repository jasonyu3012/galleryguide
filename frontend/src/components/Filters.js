import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export function IconicityFilter(props) {
  return (
    <DropdownButton id="filter-iconicity" title="Filter by Iconicity">
      <Dropdown.Item onClick={() => props.onSelect('ascending')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('descending')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function DateFilter(props) {
  return (
    <DropdownButton id="filter-date" title="Sort by Date">
      <Dropdown.Item onClick={() => props.onSelect('ascending')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('descending')}>Descending</Dropdown.Item>
    </DropdownButton>
  );
}

export function ArtworkNumSort(props) {
  return (
    <DropdownButton id="sort-num-artworks" title="Sort by Number of Artworks">
      <Dropdown.Item onClick={() => props.onSelect('ascending')}>Ascending</Dropdown.Item>
      <Dropdown.Item onClick={() => props.onSelect('descending')}>Descending</Dropdown.Item>
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



