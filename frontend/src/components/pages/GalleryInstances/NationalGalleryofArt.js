import React from 'react';
import NationalGalleryofArt from '../../images/NationalGalleryofArt.jpg';

const GalleryInstance = () => {
  return (
    <div>
      <h1>Art Institute of Chicago</h1>
      <img style={{ width: 600, height: 400 }} src={NationalGalleryofArt} alt="National Gallery of Art"></img>
      <br></br>
      <br></br>
      <p>  The National Gallery of Art is an art museum located in Washington, D.C. 
        The museum was established in 1937 as a gift to the American people by financier and art collector Andrew Mellon. 
        The museum's collection includes over 150,000 works of art, ranging from paintings and sculptures to decorative arts and photographs,
         from all over the world and spanning from the Middle Ages to the present day. 
         The collection includes works by some of the most celebrated artists in history, such as Leonardo da Vinci, 
         Rembrandt, and Vermeer, as well as works by contemporary artists. In addition to its permanent collection, 
         the National Gallery of Art hosts a variety of temporary exhibitions and offers a wide range of educational programs and public events. 
         The museum's two buildings, the West Building and the East Building, are situated on the National Mall and are 
         popular tourist destinations and cultural landmarks in the heart of the nation's capital.
        </p>
      <br></br>
      <br></br>
      <p>City: Washington D.C.</p> <br></br>
      <p>Country: United States</p> <br></br>
      <p>Opening Year: 1937</p> <br></br>
      <p>Website: https://www.nga.gov/</p> <br></br>
      <p>Operational Hours: 10 AM to 5 PM</p> <br></br>
    </div>
  );
}

export default GalleryInstance;