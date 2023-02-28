import React from 'react';
import ArtInstituteofChicago from '../../images/ArtInstituteofChicago.jpg';

const GalleryInstance = () => {
  return (
    <div>
      <h1>Art Institute of Chicago</h1>
      <img style={{ width: 600, height: 400 }} src={ArtInstituteofChicago} alt="The Art Institute of Chicago"></img>
      <br></br>
      <br></br>
      <p>  The Art Institute of Chicago is a world-renowned art museum located in downtown Chicago, Illinois. 
        Founded in 1879, the museum's collection contains over 300,000 works of art, including paintings, sculptures, photographs, and decorative arts from a variety of cultures and historical periods. 
        The museum is particularly well-known for its impressive collection of Impressionist and Post-Impressionist paintings,
         including works by Monet, Renoir, and Van Gogh. In addition to its permanent collection, the Art Institute of Chicago 
         hosts a variety of temporary exhibitions throughout the year and offers a range of educational programs and public events. 
         The museum's iconic building, located in the heart of Chicago's Grant Park, is a major tourist attraction
          and a beloved institution among locals and art lovers worldwide.
        </p>
      <br></br>
      <br></br>
      <p>City: Chicago</p> <br></br>
      <p>Country: United States</p> <br></br>
      <p>Opening Year: 1879</p> <br></br>
      <p>Website: https://www.artic.edu/</p> <br></br>
      <p>Operational Hours: Thursday - Monday, 11 AM to 5 PM</p> <br></br>

    </div>
  );
}

export default GalleryInstance;