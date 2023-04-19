// React imports
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Library imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// Local imports
import { ARTISTS_NUM_IDS } from './Artists';
import './InstanceModels.css';
import { googleKey } from '../../API_keys/Keys.js';


const ArtistInstance = () => {
  const artistId = useParams().artistId;
  // Note on naming conventions: `data` is for the main information on the instance cards. `info` is
  // for the supplementary info (not the main point).
  const [artistData, setArtistData] = useState({});
  const [artworkId, setArtworkId] = useState(0);
  const [galleryId, setGalleryId] = useState(0);
  const [videoSrc, setVideoSrc] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const [artworkData, setArtworkData] = useState({});
  const [galleryData, setGalleryData] = useState({});
  // Run only once due to second arg
  useEffect(() => {
    console.log("page loaded")
    axios.get(`https://galleryguide.me/api/artists/${ artistId }`, {
    params : {
      gallery_ids: 1 , 
      artwork_ids : 1
      }
    })
    .then(response => {
      const artistData = response.data;
      setArtistData(artistData);
      console.log("response data: ", artistData);

      // Get google maps media src
      // Take the title, split by spaces, join by browser space code %20
      const mapQuery = artistData.name.replace(' ', "%20")
      setMapSrc(`https://www.google.com/maps/embed/v1/place?q=${ mapQuery }&key=${ googleKey.key }`);
      console.log("map src: ", mapSrc);

      // Get youtube media
      console.log("getting src for gallery ", artistData.name)
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${ artistData.name }&type=video&key=${ googleKey.key }`)
      .then(response => {
        console.log("youtube video data: ", response.data);
        const fullSrc = `https://www.youtube.com/embed/${ response.data.items[0].id.videoId }`
        setVideoSrc(fullSrc)
        console.log("id in request: ", response.data.items[0].id.videoId)
        console.log("src in request: ", fullSrc);
      })
      .catch((error) => {
        console.log("axios error when fetching video: ", error);
        setVideoSrc(`https://www.youtube.com/embed/fhdZxedNFr0`);
      })

      // Get artwork and gallery IDs
      if (artistData.artwork_ids) {
        setArtworkId(artistData.artwork_ids[Math.floor(Math.random() * artistData.artwork_ids.length)])
          axios.get(`https://galleryguide.me/api/artworks/${ artistId }`, { 
          params: {
        }})
        .then(response => {
          const responseData = response.data
          setArtworkData({responseData})
        })
      }
      if (artistData.gallery_ids) {
        setGalleryId(artistData.gallery_ids[Math.floor(Math.random() * artistData.gallery_ids.length)])
      }
    })
    .catch((error) => {
      console.log("axios error: ", error);
    })
  }, [])

  // Check that we got a valid ID request
  if (artistId < 1 || artistId > ARTISTS_NUM_IDS) {
    return (
      <div>
        <h1>Oops...!</h1>
        {/* Tara's note: &#41; is the html code for a closing parenthesis, ) */}
        <p>How did you get here? We don't have an artist with identification #{ artistId }. Let us know if you think this is our error. :&#41;</p>
      </div>
    );
  }
 
  // Tara's note: there's a lot more potential data we can add in Phase 3 to make this look prettier!
  //needs to be changed to be relevant to artists
  return (
    <div>
      <div class="art-instance-image-description-wrapper">
        <img class="art-instance-img" src={ artistData.thumbnail } alt="Artwork visual representation"/>
        <div class="art-instance-description">
          <h1>{ artistData.name }</h1>
          {/* Death year is null if still alive */}
          <h3><em>from { artistData.birth_year } to { artistData.death_year ? artistData.death_year : "Present" }</em></h3>
          <p>Number of artworks made: { artistData.num_artworks }</p>
          <p>Number of associated galleries: { artistData.num_galleries }</p>
          <br/>
          <br/>
        </div>
      </div>
      <p>{ artistData.biography }</p>
      <br/>
      <br/>
      <p>This artist is stored as ID #{ artistData.id } in GalleryGuide.</p>
      {/* INSTANCE CONNECTIONS  */}
      <Link to={`/artworks/${ artworkId }`}>
        <Button>Explore Random Artwork: {artworkData.name}</Button>
      </Link>
      <p></p>
      <Link to={`/galleries/${ galleryId }`}>
        <Button>Explore Related Gallery</Button>
      </Link>

      {/* More media */}
      <div>
        <h2>Media for a more immersive experience</h2>
        <p>Note that these results are generated by a search. Results are not curated and GalleryGuide takes no ownership of generated results.</p>
        <iframe width="600" height="450" src={ videoSrc } style={{marginRight: '3em'}}></iframe>
        <iframe width="600" height="450" src={ mapSrc }></iframe>
      </div>

      {/* TODO #? Add connections to other instances */}

      <Link to={'/artists'}>
        <Button>&#60;</Button> Back to main artworks page
      </Link>
    </div>
  )
};

export default ArtistInstance;
