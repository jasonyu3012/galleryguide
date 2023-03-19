// React imports
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Library imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// Local imports
import { GALLERIES_NUM_IDS } from './Galleries';
import './InstanceModels.css';


const GalleryInstance = () => {
  const galleryId = useParams().galleryId;
  const [galleryData, setGalleryData] = useState({});
  // const [artworkInfo, setArtworkInfo] = useState({});
  // const [artistInfo, setArtistInfo] = useState({});

  // Run only once due to second arg
  useEffect(() => {
    console.log("page loaded")
    axios.get(`https://galleryguide.me/api/galleries/${ galleryId }`)
    .then(response => {
      const galleryData = response.data;
      console.log("gallery data: ", galleryData);
      setGalleryData(galleryData);
    })
    .catch((error) => {
      console.log("axios error: ", error);
    })

    // Get artwork and artist information
    if (galleryData.description) {
      // TODO filter artworks by gallery id
      // axios.get(`https://galleryguide.me/api/artworks/${ galleryData.artwork_id }`)
      // .then(response => {
      //   setArtworkData(response.data);
      //   console.log("artwork data: ", artworkData);
      // })
      // .catch((error) => {
      //   console.log("axios error while getting artwork info: ", error);
      // })
      // // TODO filter artists by gallery id
      // axios.get(`https://galleryguide.me/api/artists/${ artworkData.artist_id }`)
      // .then(response => {
      //   setArtistInfo(response.data);
      //   console.log("artist data: ", artistInfo);
      // })
      // .catch((error) => {
      //   console.log("axios error while getting artist info: ", error);
      // })
    }
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
        </div>
      </div>

      {/* TODO #? Add connections to other instances */}

      <Link to={'/galleries'}>
        <Button>&#60;</Button> Back to main galleries page
      </Link>
    </div>
  )
};

export default GalleryInstance;
