import React from 'react';
import GirlInChair from '../../images/LittleGirlInABlueArmchair.jpg'

const ArtworkInstance = () => {
  return (
    <div>
      <h1>Little Girl In a Blue Armchair</h1>
      <img src={GirlInChair} alt="Little Girl In a Blue Armchair"></img>
      <br></br>
      <br></br>

      <p>
      Painting of girl sprawled on a blue armchair in a room with three other chairs of a matching design.
      </p>
      
      <br></br>
      <br></br>

      <p>Artist name: Mary Stevenson Cassatt</p> <br></br>
      <p>Artwork type: Painting</p> <br></br>
      <p>Styles: Impressionism</p> <br></br>
      <p>Date work started: 1878</p> <br></br>
      <p>Medium: Oil on canvas</p> <br></br>
    </div>
  );
}

export default ArtworkInstance;