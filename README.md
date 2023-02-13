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
- Sortable attributes: artwork name (`title`), artist name (`artistDisplayName`), date artwork was started (`objectBeginDate`), country where artwork was found (`country`), term describing the artwork type (classification, eg. "Basketry", "Ceramics", "Paintings")
- Media: image of artwork (`primaryImage`), Google Maps of where the artwork is held (using `repository` string as input)
- Connection to other models: artworks are created by artists and often on display at galleries

#### Artists
- Instances: about 13,000
- Sortable attributes: first name (`title`), last name (`sort_title`), date of birth (`birth_date`), date of death (`death_date`), unique identifier of the artist in Getty's ULAN3 (`ulan_id`)
- Media: 1, 2
- Connection to other models: artists create artworks, which are often on display at galleries

#### Galleries/Museums
- Instances:
- Sortable attributes: 1, 2, 3, 4, 5
- Media: 1, 2
- Connection to other models: galleries display artworks made by artists

## Organizational Technique
We intended to use the standard organizational model with a page for each model populated by instances of that model.

## Questions
- What works of art did an artist create?
- Where can I go to see a work of art?
- What art does a gallery have?

## Group Info

| Name             | GitLabID         | EID     |
| ---------------- | ---------------- | ------- |
| Landon Johnson   | @LandonDude      | lyj93   |
| Tara Roshan      | @troshan         | tsr742  |
| Jason Yu         | @jasonyu3012     | jy23435 |
| xxxxxxxxxxx      | xxxxxxxx         | xxxxxx  |

### Git SHA

| Phase | Git Sha                                  |
| ----- | ---------------------------------------- |
| 1     | TODO                                     |

### Project Leader

| Phase | Project Leader   |
| ----- | ---------------- |
| 1     | ??               |

#### Responsibilities

Organize and direct group meetings, create meeting agendas, make sure everyone is on track.

# GitLab Pipelines

**TODO**

# Website Link

[galleryguide.me](galleryguide.me)

# Completion Times

### Phase 1

| Name             | Est. Completion Time (hrs) | Real Completion Time (hrs) |
| ---------------- | -------------------------- | -------------------------- |
| ??               | n                          | n                          |
| Tara Roshan      | 10                         | ?                          |

### Comments


