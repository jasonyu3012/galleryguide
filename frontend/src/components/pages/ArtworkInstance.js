// React imports
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Library imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// Local imports
import { ARTWORKS_NUM_IDS } from './Artworks';
import './InstanceModels.css';


const ArtworkInstance = () => {
  const artworkId = useParams().artworkId;
  const [artworkData, setArtworkData] = useState({});
  const [artistInfo, setArtistInfo] = useState({});
  const [galleryInfo, setGalleryInfo] = useState({});

  // Tara's note: Run only once due to second arg
  useEffect(() => {
    console.log("page loaded")
    axios.get(`https://galleryguide.me/api/artworks/${ artworkId }`)
    .then(response => {
      const artworkData = response.data;
      console.log("artwork data: ", artworkData);
      setArtworkData(artworkData);

      // Tara's note: Want to get information only after getting the artwork data, hence the nesting
      // Could also use async/await, but I figure this is okay for only a couple requests.
      axios.get(`https://galleryguide.me/api/galleries/${ artworkData.gallery_id }`)
      .then(response => {
        setGalleryInfo(response.data);
        console.log("gallery data: ", galleryInfo);
      })
      .catch((error) => {
        console.log("axios error while getting gallery info: ", error);
      })

      axios.get(`https://galleryguide.me/api/artists/${ artworkData.artist_id }`)
      .then(response => {
        setArtistInfo(response.data);
        console.log("artist data: ", artistInfo);
      })
      .catch((error) => {
        console.log("axios error while getting artist info: ", error);
      })
    })
    .catch((error) => {
      console.log("axios error: ", error);
    })
  }, [])

  // Check that we got a valid ID request
  if (artworkId < 1 || artworkId > ARTWORKS_NUM_IDS) {
    return (
      <div>
        <h1>Oops...!</h1>
        {/* Tara's note: &#41; is the html code for a closing parenthesis, ) */}
        <p>How did you get here? We don't have an artwork with identification #{ artworkId }. Let us know if you think this is our error. :&#41;</p>
      </div>
    );
  }
 
  // Tara's note: there's a lot more potential data we can add in Phase 3 to make this look prettier!
  return (
    <div>
      <div class="art-instance-image-description-wrapper">
        <img class="art-instance-img" src={ artworkData.image } alt="Artwork visual representation"/>
        <div class="art-instance-description">
          <h1>{ artworkData.title }</h1>
          <h3>{ artistInfo.name }, { artworkData.date }</h3>
          <em>{ artworkData.medium }</em>
          <br/>
          <br/>
          <p>{galleryInfo.name ? `Artwork hosted at ${ galleryInfo.name } in ${ galleryInfo.region }` : null}</p>
          <p>{ artworkData.image_rights }</p>
        </div>
      </div>

      {/* TODO #65 Add connections to other instances */}

      <Link to={'/artworks'}>
        <Button>&#60;</Button> Back to main artworks page
      </Link>
    </div>
  )
};

export default ArtworkInstance;
