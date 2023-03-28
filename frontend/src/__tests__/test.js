import renderer from "react-test-renderer";

import ArtworkInstance from "../components/Pages/ArtworkInstance";
import GalleryInstance from "../components/Pages/GalleryInstance";
import ArtistInstance from "../components/Pages/ArtistInstance";

import Navigation from "../components/Navigation";

import App from "../App";
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';



it("displays the artwork correctly", () => {
  const artworkSample = {
    id: 1,
    title: "Title",
    date: "2022",
    medium: "Oil on canvas",
    iconicity: "High",
    image: "https://example.com/image.jpg",
    image_rights: "All rights reserved",
    artist_id: 1,
    gallery_id: 1,
  };

  const component = renderer.create(
    <BrowserRouter>
      <ArtworkInstance artworkData={artworkSample} />
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



it("Navbar initializes correctly", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

