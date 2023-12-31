// React imports
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Library imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// Local imports
import { GALLERIES_NUM_IDS } from './Galleries';
import './InstanceModels.css';
import { googleKey } from '../../API_keys/Keys.js';


const GalleryInstance = () => {
  const galleryId = useParams().galleryId;
  const [galleryData, setGalleryData] = useState({});
  const [artworkId, setArtworkId] = useState({});
  const [artistId, setArtistId] = useState({});
  const [videoSrc, setVideoSrc] = useState("");
  const [mapSrc, setMapSrc] = useState("");

  // Run only once due to second arg
  useEffect(() => {
    console.log("page loaded")
    axios.get(`https://galleryguide.me/api/galleries/${ galleryId }`, {
      params : {
        artist_ids: 1 , 
        artwork_ids : 1
      }
    })
    .then(response => {
      const galleryData = response.data;
      setGalleryData(galleryData);
      console.log("response data: ", galleryData);

      // Get google maps media src
      // Take the title, split by spaces, join by browser space code %20
      const mapQuery = galleryData.name.replace(' ', "%20")
      setMapSrc(`https://www.google.com/maps/embed/v1/place?q=${ mapQuery }&key=${ googleKey.key }`);
      console.log("map src: ", mapSrc);

      // Get youtube media
      console.log("getting src for gallery ", galleryData.name)
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${ galleryData.name }&type=video&key=${ googleKey.key }`)
      .then(response => {
        console.log("youtube video data: ", response.data);
        setVideoSrc(`https://www.youtube.com/embed/${ response.data.items[0].id.videoId }`)
        console.log("src in request: ", videoSrc);
      })
      .catch((error) => {
        console.log("axios error when fetching video: ", error);
        setVideoSrc(`https://www.youtube.com/embed/fhdZxedNFr0`);
      })

      // Get artwork and artist IDs
      if (galleryData.artwork_ids) {
        setArtworkId(galleryData.artwork_ids[Math.floor(Math.random() * galleryData.artwork_ids.length)])
      }
      if (galleryData.artist_ids) {
        setArtistId(galleryData.artist_ids[Math.floor(Math.random() * galleryData.artist_ids.length)])
      }
    })
    .catch((error) => {
      console.log("axios error: ", error);
    })
  }, [])

  // Check that we got a valid ID request
  if (galleryId < 1 || galleryId > GALLERIES_NUM_IDS) {
    return (
      <div>
        <h1>Oops...!</h1>
        {/* Tara's note: &#41; is the html code for a closing parenthesis, ) */}
        <p>How did you get here? We don't have a gallery with identification #{ galleryId }. Let us know if you think this is our error. :&#41;</p>
      </div>
    );
  }

  // Tara's note: there's a lot more potential data we can add in Phase 3 to make this look prettier!
  //change to be relevant to galleries
  return (
    <div>
      <div class="art-instance-image-description-wrapper">
        <img class="art-instance-img" src={ galleryData.thumbnail } alt="Artwork visual representation"/>
        <div class="art-instance-description">
          <h1>{ galleryData.name }</h1>
          <em>{ galleryData.description }</em>
          <br/>
          <br/>
          <p>Located in { galleryData.region }</p>
          <p>Number of artists hosted: { galleryData.num_artists }</p>
          <p>Number of artworks hosted: { galleryData.num_artworks }</p>
          <p><a href={ galleryData.website }>Gallery website</a></p>
          <p>This gallery is stored as ID #{ galleryData.id } in GalleryGuide.</p>
          {/* INSTANCE CONNECTIONS  */}
          <Link to={`/artists/${ artistId }`}>
            <Button>Explore Artist</Button>
          </Link>
          <p></p>
          <Link to={`/artworks/${ artworkId }`}>
            <Button>Explore Artwork</Button>
          </Link>
        </div>
      </div>

      {/* More media */}
      <div>
        <h2>Media for a more immersive experience</h2>
        <p>Note that these results are generated by a search. Results are not curated and GalleryGuide takes no ownership of generated results.</p>
        <iframe width="600" height="450" src={ videoSrc } style={{marginRight: '3em'}}></iframe>
        <iframe width="600" height="450" src={ mapSrc }></iframe>
      </div>

      {/* TODO #? Add connections to other instances */}
      
      <p></p>
      <p></p>
      <Link to={'/galleries'}>
        <Button>&#60;</Button> Back to main galleries page
      </Link>
    </div>
  )
};

export default GalleryInstance;
