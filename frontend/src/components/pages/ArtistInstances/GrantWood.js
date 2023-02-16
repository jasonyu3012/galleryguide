import React from 'react';
import GrantWood from '../../images/GrantWood.jpg';


const ArtistInstance = () => {
  return (
    
    <div>
      <h1>Grant Wood</h1>
      <img src={GrantWood} alt="Grant Wood"></img>
      <br></br>
      <br></br>
      <p> Grant Wood is known for his stylized and subtly humorous scenes of rural people, 
        Iowa cornfields, and mythic subjects from American history—such as the Art Institute’s iconic painting
        American Gothic. Along with other Midwestern Regionalist painters like John Steuwart Curry and Thomas Hart Benton, 
        Wood advocated for a realistic style and recognizable subjects that showed local places and common people,
         a radically different approach from European modernism and its push toward abstraction.
        </p>
      <br></br>
      <br></br>
      <p>Birth Date: 1891</p> <br></br>
      <p>Death Date: 1942</p> <br></br>
    </div>
  );
}

export default ArtistInstance;