# GalleryGuide

## Proposal
### Idea
GalleryGuide allows users to find works of art and to learn more about their composers.

### APIs
- Artwork: MET Museum API (https://metmuseum.github.io/)
- Artists: Art Institute of Chicago Public API (https://www.artic.edu/open-access/public-api)
- Gallery: Artsy (https://developers.artsy.net/v2/docs/partners)

### Models
#### Artworks
- Instances: about 484,000
- Sortable attributes: artwork name (`title`), artist name (`artistDisplayName`), date artwork was started (`objectBeginDate`), country where artwork was found (`country`), term describing the artwork type (classification, eg. "Basketry", "Ceramics", "Paintings"), on display
- Media: image of artwork (`primaryImage`), Google Maps of where the artwork is held (using `repository` string as input)
- Connection to other models: artworks are created by artists and often on display at galleries

#### Artists
- Instances: about 13,000
- Sortable attributes: first name (`title`), last name (`sort_title`), date of birth (`birth_date`), date of death (`death_date`), unique identifier of the artist in Getty's ULAN3 (`ulan_id`)
- Media: photo of artwork, location of gallery/museum, biography
- Connection to other models: artists create artworks, which are often on display at galleries

#### Galleries/Museums
- Instances: 100-1000
- Sortable attributes: Number of artworks, number of artists, location, name, open/closed status
- Media: map of location, description of the musuem/gallery, pictures of the gallery
- Connection to other models: galleries display artworks made by artists

### Organizational Technique
We intended to use the standard organizational model with a page for each model populated by instances of that model.

### Questions
- What works of art did an artist create?
- Where can I go to see a work of art?
- What artists does a gallery have works of?