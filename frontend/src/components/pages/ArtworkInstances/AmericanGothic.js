import React from 'react';
import AmericanGothic from '../../images/AmericanGothic.jpg'

const ArtworkInstance = () => {
  return (
    <div>
      <h1>American Gothic</h1>
      <img src={AmericanGothic} alt="American Gothic"></img>
      <br></br>
      <br></br>

      <p>
        Painting of a woman and an older white man holding a pitchfork, both seen from the waist up. They stand side by side with stern expressions, in front of a white house with a peaked roof.
      </p>
      
      <br></br>
      <br></br>

      <p>Artist name: Grant Wood</p> <br></br>
      <p>Artwork type: Painting</p> <br></br>
      <p>Styles: Realism, Modernism</p> <br></br>
      <p>Date work started: 1930</p> <br></br>
      <p>Medium: Oil on Beaver Board</p> <br></br>
    </div>
  );
}

export default ArtworkInstance;