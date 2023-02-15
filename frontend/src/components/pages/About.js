import React from 'react'
import axios from 'axios';

class TeamData extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://gitlab.com/api/v4/projects/43453197/repository/contributors`)
      .then(result => {
        const persons = result.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>
                {person.name}<br/>
                Number of commits: {person.commits}
              </li>
            )
        }
      </ul>
    )
  }
}

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <TeamData />
    </div>
  );
}

export default About;