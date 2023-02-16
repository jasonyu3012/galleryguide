import React from 'react';
import VincentvanGogh from '../../images/VincentvanGogh.jpg';

const ArtistInstance = () => {
  return (
    <div>
      <h1>Vincent van Gogh</h1>
      <img src={VincentvanGogh} alt="Vincent van Gogh"></img>
      <br></br>
      <br></br>
      <p>  Vincent van Gogh (1853-1890) was a Dutch post-impressionist painter who is widely regarded as one of the greatest artists of all time. 
        Born in the Netherlands to a pastor, van Gogh's early career included failed attempts at various professions before he decided to pursue 
        his passion for art. He studied at the Academy of Fine Arts in Brussels and later in Paris, where he was exposed to the work of impressionist 
        painters such as Claude Monet and Edgar Degas.
        <br></br>
        Throughout his career, van Gogh created hundreds of paintings, including many landscapes, still lifes, and portraits. 
        He was known for his bold use of color, dramatic brushstrokes, and emotional intensity, which set him apart from other artists of his time. 
        Some of his most famous works include "Starry Night," "Sunflowers," and "The Potato Eaters."
        </p>
      <br></br>
      <br></br>
      <p>Birth Date: 1853</p> <br></br>
      <p>Death Date: 1890</p> <br></br>
    </div>
  );
}

export default ArtistInstance;