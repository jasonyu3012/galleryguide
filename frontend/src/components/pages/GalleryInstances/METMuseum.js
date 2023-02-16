import React from 'react';
import METMuseum from '../../images/METMuseum.jpg';

const GalleryInstance = () => {
  return (
    <div>
      <h1>MET Museum</h1>
      <img style={{ width: 600, height: 400 }} src={METMuseum} alt="The MET Museum"></img>
      <br></br>
      <br></br>
      <p> The Metropolitan Museum of Art, commonly known as the Met, is one of the most famous art museums in the world, 
        located in New York City. Founded in 1870, the museum houses a vast collection of over 2 million works of art from 
        around the globe and spanning over 5,000 years of human history. The Met's collection includes paintings, sculptures, 
        decorative arts, and artifacts from ancient civilizations, as well as contemporary art and photography.
         The museum is particularly renowned for its extensive collection of European paintings, including works by Rembrandt, 
         Vermeer, and Van Gogh, and its collection of ancient Egyptian art, which includes a complete temple from the reign of the pharaoh Hatshepsut. 
         In addition to its permanent collection, the Met hosts a wide variety of temporary exhibitions, educational programs, and public events. 
         The museum's iconic building, located on Fifth Avenue in Manhattan, is a popular tourist destination and cultural landmark.
        </p>
      <br></br>
      <br></br>
      <p>Location: New York City</p> <br></br>
    </div>
  );
}

export default GalleryInstance;