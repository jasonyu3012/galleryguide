import React from 'react';
import WheatField from '../../images/WheatFieldWithCypresses.jpg'

const ArtworkInstance = () => {
  return (
    <div>
      <h1>Wheat Field with Cypresses</h1>
      <img src={WheatField} alt="Little Girl In a Blue Armchair"></img>
      <br></br>
      <br></br>

      <p>
        Painting of a wheat field with two cypress trees to the right.
      </p>
      
      <br></br>
      <br></br>

      <p>Artist name: Vincent van Gogh</p> <br></br>
      <p>Artwork type: Painting</p> <br></br>
      <p>Styles: Expressionism</p> <br></br>
      <p>Date work started: 1889</p> <br></br>
      <p>Medium: Oil on canvas</p> <br></br>
    </div>
  );
}

export default ArtworkInstance;