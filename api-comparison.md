# API Comparison
For each of our three models - Artists, Artworks, and Galleries - we should have 5 sortable features. This document describes the output of the Artsy, Met, and Art Institute of Chicago APIs for each of the three models.

Contents:
- Artsy
- The Met
- Art Institute of Chicago
- *to investigate* Cleveland
- *to investigate* Harvard
- *to investigate* Wikidata

## Artsy
### [Artists](https://developers.artsy.net/v2/docs/artists)
- Instances: not sure; paginated
- Sortable fields: name, sortable_name, birthday, deathday, nationality (alphabetical).
- Media provided: location (via Google Places API), thumbnail image, biography, *potentially* the similar artists.

Notes:
 - The results are [paginated](https://developers.artsy.net/v2/docs/pagination). I'm not sure how to get all of the artists results.
 - Results have a thumbnail (under the _links list) that can be shown on the instances page. 
Example input/output: `https://api.artsy.net/api/artists/4d8b92b34eb68a1b2c0003f4`
```json
{
    "id": "4d8b92b34eb68a1b2c0003f4",
    "slug": "andy-warhol",
    "created_at": "2010-08-23T14:15:30+00:00",
    "updated_at": "2023-02-23T01:30:08+00:00",
    "name": "Andy Warhol",
    "sortable_name": "Warhol Andy",
    "gender": "male",
    "biography": "An American painter, printmaker, sculptor, draughtsman, illustrator, filmmaker, writer and collector, who became one of the most famous artists of the 20th century. Warhol began his career as a successful commercial artist and illustrator for magazines and newspapers but by 1960 was determined to establish his name as a painter. He quickly became renowned for painting everyday advertisements or images from comic strips that looked eerily similar to the originals and contained no traditional marks of an artist. Warhol accentuated this look through the use of silkscreens and by painting in collaboration with a team of assistants in a studio he called \"The Factory.\" In the late sixties, Warhol turned his attention to making experimental films and multimedia events, and in the 1970s, to creating commissioned portraits. During the 1980s Warhol continued to exert an influence on the art world, collaborating with young artists such as Jean-Michel Basquiat and creating a series of paintings, which engaged with Renaissance masterworks.",
    "birthday": "1928",
    "deathday": "1987",
    "hometown": "Pittsburgh, PA, USA",
    "location": "New York, NY, USA",
    "nationality": "American",
    "target_supply": true,
    "image_versions": [
        "four_thirds",
        "large",
        "square",
        "tall"
    ],
    "_links": {
        "thumbnail": {
            "href": "https://d32dm0rphc51dk.cloudfront.net/E-k-uLoQADM8AjadsSKHrA/four_thirds.jpg"
        },
        "image": {
            "href": "https://d32dm0rphc51dk.cloudfront.net/E-k-uLoQADM8AjadsSKHrA/{image_version}.jpg",
            "templated": true
        },
        "self": {
            "href": "https://api.artsy.net/api/artists/4d8b92b34eb68a1b2c0003f4"
        },
        "permalink": {
            "href": "https://www.artsy.net/artist/andy-warhol"
        },
        "artworks": {
            "href": "https://api.artsy.net/api/artworks?artist_id=4d8b92b34eb68a1b2c0003f4"
        },
        "published_artworks": {
            "href": "https://api.artsy.net/api/artworks?artist_id=4d8b92b34eb68a1b2c0003f4&published=true"
        },
        "similar_artists": {
            "href": "https://api.artsy.net/api/artists?similar_to_artist_id=4d8b92b34eb68a1b2c0003f4"
        },
        "similar_contemporary_artists": {
            "href": "https://api.artsy.net/api/artists?similar_to_artist_id=4d8b92b34eb68a1b2c0003f4&similarity_type=contemporary"
        },
        "genes": {
            "href": "https://api.artsy.net/api/genes?artist_id=4d8b92b34eb68a1b2c0003f4"
        }
    }
}
```

### [Artworks](https://developers.artsy.net/v2/docs/artworks)
- Instances: not sure; paginated
- Sortable fields: date, title, category (alphabetical), iconicity, medium
- Media provided: thumbnail image, collecting institution location (via Google Places API)

Example input/output: `https://api.artsy.net/api/artworks/516dfb9ab31e2b2270000c45`
```json
{
    "id": "516dfb9ab31e2b2270000c45",
    "slug": "william-michael-harnett-the-old-violin",
    "created_at": "2013-04-17T01:32:10+00:00",
    "updated_at": "2021-05-17T19:56:15+00:00",
    "title": "The Old Violin",
    "category": "Painting",
    "medium": "Oil on canvas",
    "date": "1886",
    "dimensions": {
        "in": {
            "text": "38 × 23 5/8 in",
            "height": 38.0,
            "width": 23.625,
            "depth": null,
            "diameter": null
        },
        "cm": {
            "text": "96.5 × 60 cm",
            "height": 96.5,
            "width": 60.0,
            "depth": null,
            "diameter": null
        }
    },
    "published": true,
    "website": "",
    "signature": "",
    "series": "",
    "provenance": "",
    "literature": "",
    "exhibition_history": "",
    "collecting_institution": "National Gallery of Art, Washington D.C.",
    "additional_information": "\n    overall: 96.5 x 60 cm (38 x 23 5/8 in.)  framed: 119.7 x 84.1 x 5.1 cm (47 1/8 x 33 1/8 x 2 in.)\n    ",
    "image_rights": "Courtesy National Gallery of Art, Washington",
    "blurb": "",
    "unique": false,
    "cultural_maker": null,
    "iconicity": 25.245520919676473,
    "can_inquire": false,
    "can_acquire": false,
    "can_share": true,
    "sale_message": null,
    "sold": false,
    "image_versions": [
        "large",
        "large_rectangle",
        "larger",
        "medium",
        "medium_rectangle",
        "normalized",
        "square",
        "tall"
    ],
    "_links": {
        "thumbnail": {
            "href": "https://d32dm0rphc51dk.cloudfront.net/dTGcd0Xx0aEp_MDFdHIUIw/medium.jpg"
        },
        "image": {
            "href": "https://d32dm0rphc51dk.cloudfront.net/dTGcd0Xx0aEp_MDFdHIUIw/{image_version}.jpg",
            "templated": true
        },
        "partner": {
            "href": "https://api.artsy.net/api/partners/4f99c7b793ab4b0001000179"
        },
        "self": {
            "href": "https://api.artsy.net/api/artworks/516dfb9ab31e2b2270000c45"
        },
        "permalink": {
            "href": "https://www.artsy.net/artwork/william-michael-harnett-the-old-violin"
        },
        "genes": {
            "href": "https://api.artsy.net/api/genes?artwork_id=516dfb9ab31e2b2270000c45"
        },
        "artists": {
            "href": "https://api.artsy.net/api/artists?artwork_id=516dfb9ab31e2b2270000c45"
        },
        "similar_artworks": {
            "href": "https://api.artsy.net/api/artworks?similar_to_artwork_id=516dfb9ab31e2b2270000c45"
        },
        "collection_users": {
            "href": "https://api.artsy.net/api/users?collected_artwork_id=516dfb9ab31e2b2270000c45"
        },
        "sale_artworks": {
            "href": "https://api.artsy.net/api/sale_artworks?artwork_id=516dfb9ab31e2b2270000c45"
        }
    },
    "_embedded": {
        "editions": []
    }
}
```

### [Galleries](https://developers.artsy.net/v2/docs/partners)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

## The Met
### [Artists](https://metmuseum.github.io/#search)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [Artworks](https://metmuseum.github.io/#search)
- Instances:  484,176
- Sortable fields:
- Media provided: can use the suffix of the *constituents/constituentWikidataURL* to get information from WikiData (eg. `https://wikidata.org/w/rest.php/wikibase/v0/entities/items/Q3806459`)

Example input/output: `https://collectionapi.metmuseum.org/public/collection/v1/objects/1`
```json
{
    "objectID": 1,
    "isHighlight": false,
    "accessionNumber": "1979.486.1",
    "accessionYear": "1979",
    "isPublicDomain": false,
    "primaryImage": "",
    "primaryImageSmall": "",
    "additionalImages": [],
    "constituents": [
        {
            "constituentID": 164292,
            "role": "Maker",
            "name": "James Barton Longacre",
            "constituentULAN_URL": "http://vocab.getty.edu/page/ulan/500011409",
            "constituentWikidata_URL": "https://www.wikidata.org/wiki/Q3806459",
            "gender": ""
        }
    ],
    "department": "The American Wing",
    "objectName": "Coin",
    "title": "One-dollar Liberty Head Coin",
    "culture": "",
    "period": "",
    "dynasty": "",
    "reign": "",
    "portfolio": "",
    "artistRole": "Maker",
    "artistPrefix": "",
    "artistDisplayName": "James Barton Longacre",
    "artistDisplayBio": "American, Delaware County, Pennsylvania 1794–1869 Philadelphia, Pennsylvania",
    "artistSuffix": "",
    "artistAlphaSort": "Longacre, James Barton",
    "artistNationality": "American",
    "artistBeginDate": "1794",
    "artistEndDate": "1869",
    "artistGender": "",
    "artistWikidata_URL": "https://www.wikidata.org/wiki/Q3806459",
    "artistULAN_URL": "http://vocab.getty.edu/page/ulan/500011409",
    "objectDate": "1853",
    "objectBeginDate": 1853,
    "objectEndDate": 1853,
    "medium": "Gold",
    "dimensions": "Dimensions unavailable",
    "measurements": null,
    "creditLine": "Gift of Heinz L. Stoppelmann, 1979",
    "geographyType": "",
    "city": "",
    "state": "",
    "county": "",
    "country": "",
    "region": "",
    "subregion": "",
    "locale": "",
    "locus": "",
    "excavation": "",
    "river": "",
    "classification": "",
    "rightsAndReproduction": "",
    "linkResource": "",
    "metadataDate": "2021-04-06T04:41:04.967Z",
    "repository": "Metropolitan Museum of Art, New York, NY",
    "objectURL": "https://www.metmuseum.org/art/collection/search/1",
    "tags": null,
    "objectWikidata_URL": "",
    "isTimelineWork": false,
    "GalleryNumber": ""
}
```

### [Galleries](https://metmuseum.github.io/#search)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

## Art Institute of Chicago
### [Artists](https://api.artic.edu/docs/#quick-start)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [Artworks](https://api.artic.edu/docs/#quick-start)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [Galleries](https://api.artic.edu/docs/#quick-start)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

## Conclusion
