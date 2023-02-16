import React from 'react';
import MaryCassatt from '../../images/MaryCassatt.jpg';

const ArtistInstance = () => {
  return (
    <div>
      <h1>Mary Cassatt</h1>
      <img src={MaryCassatt} alt="Mary Cassatt"></img>
      <br></br>
      <br></br>
      <p>  One of only three women -- and the only American, woman or man -- invited to exhibit with the Impressionists in Paris, 
        Cassatt spent the majority of her career abroad. In addition to producing her distinctive images of women and children, 
        Cassatt also served as an advisor to important American collectors including Henry and Louisine Havemeyer, 
        whose collection became a cornerstone of New York's Metropolitan Museum of Art. 
        The Philadelphia-born Cassatt studied at the Pennsylvania Academy of the Fine Arts before setting off for Europe, 
        where she eventually became a friend and colleague of Edgar Degas. Widely recognized on both sides of the Atlantic 
        and considered one of the greatest living artists of her time, Cassatt was viewed as a truly "modern" woman,
        and she lent her efforts to help American women earn the right to vote. 
        Cassatt produced her characteristic figurative works in oil and pastel, and was also a highly accomplished printmaker and etcher. 
        She owned a collection of Japanese prints, and the harmonious colors and flattened forms that characterize her style indicate the 
        influence of Japonisme upon her work. She frequently employed friends and family members as her subjects, and the ensuing works 
        explore themes of family, femininity, and daily life.
        </p>
      <br></br>
      <br></br>
      <p>Birth Date: 1844</p> <br></br>
      <p>Death Date: 1926</p> <br></br>
    </div>
  );
}

export default ArtistInstance;