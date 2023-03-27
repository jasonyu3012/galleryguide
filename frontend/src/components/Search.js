const ArtistSearch = () => (
  <div>
    <input
      // from FindACarForMe
      // ref={inputRef}
      type="text"
      placeholder="Search artists"
      id="artists-query"
      name="artists-search-query"
      // value={searchInput}
      // onChange={(event) => searchItems(event.target.value)}
    />
    <button style={{marginLeft: "1em"}} type="submit">Search</button>
  </div>
);

const ArtworkSearch = () => (
  <div>
    <input
      // from FindACarForMe
      // ref={inputRef}
      type="text"
      placeholder="Search artworks"
      id="artworks-query"
      name="artworks-search-query"
      // value={searchInput}
      // onChange={(event) => searchItems(event.target.value)}
    />
    <button style={{marginLeft: "1em"}} type="submit">Search</button>
  </div>
);

const GallerySearch = () => (
  <div>
    <input
      // from FindACarForMe
      // ref={inputRef}
      type="text"
      placeholder="Search galleries"
      id="galleries-query"
      name="galleries-search-query"
      // value={searchInput}
      // onChange={(event) => searchItems(event.target.value)}
    />
    <button style={{marginLeft: "1em"}} type="submit">Search</button>
  </div>
);

const GlobalSearch = () => (
  <div>
    <input
      // from FindACarForMe
      // ref={inputRef}
      type="text"
      placeholder="Site-wide search"
      id="g-query"
      name="global-search-query"
      // value={searchInput}
      // onChange={(event) => searchItems(event.target.value)}
    />
    <button style={{marginLeft: "1em"}} type="submit">Search</button>
  </div>
  // https://www.emgoto.com/react-search-bar/
  // <form action="/" method="get">
  //     <label htmlFor="header-search">
  //         <span className="visually-hidden">Search blog posts</span>
  //     </label>
  //     <input
  //         type="text"
  //         id="header-search"
  //         placeholder="Search blog posts"
  //         name="s" 
  //     />
  //     <button type="submit">Search</button>
  // </form>
);

export {GlobalSearch,
        ArtistSearch,
        ArtworkSearch,
        GallerySearch};