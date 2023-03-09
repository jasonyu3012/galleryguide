import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/*function getLocation(city, state, country) {
  if (state == null || state == "") {
    return city + ", " + country;
  }
  return city + ", " + state + ", " + country;
}
*/

const ArtworkCard = (props) => {

  const name = props.artwork.artworkname;
  const artist = props.artwork.artist_id;
  const date = props.artwork.date;
  const medium = props.artwork.medium;
  const copyright = props.artist.copyright;

  ArtworkCard.propTypes = {
    artwork: PropTypes.shape({
      artworkname: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
      medium: PropTypes.string.isRequired,
      copyright: PropTypes.string.isRequired,
    }),
  };

  return (
    <Card border="light">
      <Card.Body>
        <Card.Title> {name} </Card.Title>
        <Card.Img src=""></Card.Img>
        <Card.Text />
        <Card.Subtitle> Artist: {artist != null ? artist.toLocaleString() : "N/A"} </Card.Subtitle>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Medium : {medium}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Link to={`/artwork/${name}`}>More info</Link>
      </Card.Footer>
    </Card>
  );
};

export default ArtworkCard;
