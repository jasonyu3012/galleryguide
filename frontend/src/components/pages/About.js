import React from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import placeholderImage from '../images/face.png';

class TeamCards extends React.Component {
  state = {
    persons: []
  }

  // get the data after the page has loaded
  componentDidMount() {
    axios.get(`https://gitlab.com/api/v4/projects/43453197/repository/contributors`)
      .then(result => {
        const persons = result.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      this.state.persons.map(person =>
        <div key={person.id}>
          <Card style={{ width: '15rem', justifyContent: 'center' }}>
          <Card.Img variant="top" src={placeholderImage} />
          <Card.Body>
            <Card.Title>{person.name}</Card.Title>
            <Card.Text>
              Commits: {person.commits}
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      )
    );
  }
}

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <CardGroup>
        <TeamCards />
      </CardGroup>
    </div>
  );
}

export default About;