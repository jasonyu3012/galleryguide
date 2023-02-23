# API Comparison
For each of our three models - Artists, Artworks, and Galleries - we should have 5 sortable features. This document describes the output of the Artsy, Met, and Art Institute of Chicago APIs for each of the three models.

## Artists
### [Artsy](https://developers.artsy.net/v2/docs/artists)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [The Met](https://metmuseum.github.io/#search)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [Art Institute of Chicago](https://api.artic.edu/docs/#quick-start)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

## Artworks
### [Artsy](https://developers.artsy.net/v2/docs/artworks)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json

```

### [The Met](https://metmuseum.github.io/#search)
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

### [Art Institute of Chicago](https://api.artic.edu/docs/#quick-start)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

## Galleries
### [Artsy](https://developers.artsy.net/v2/docs/partners)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [The Met](https://metmuseum.github.io/#search)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

### [Art Institute of Chicago](https://api.artic.edu/docs/#quick-start)
- Instances:
- Sortable fields:
- Media provided:

Example input/output: `code`
```json
result
```

## Conclusion

