# API Comparison
For each of our three models - Artists, Artworks, and Galleries - we should have 5 sortable features. This document describes the output of the Artsy, Met, and Art Institute of Chicago APIs for each of the three models.

In cases where I could not find enough sortable features, a *FEATURE N* was added as a placeholder and to bring attention to a lack of fields.

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
- Instances: not sure; paginated
- Sortable fields: region, type, name (alphabetical), id (loose connection, not really useful), *FEATURE 5 MISSING*
- Media provided: website link, 

Note: can get the *paginated* list of artworks stored in a gallery using the format `https://api.artsy.net/api/artworks?partner_id=4f99c7b793ab4b0001000179&total_count=100` (the artworks API but with a partner_id parameter).

Example input/output: `https://api.artsy.net/api/partners/4f99c7b793ab4b0001000179`
```json
{
    "id": "4f99c7b793ab4b0001000179",
    "slug": "national-gallery-of-art-washington-dc",
    "created_at": "2012-04-26T22:09:59+00:00",
    "updated_at": "2022-05-20T08:57:27+00:00",
    "type": "Institution",
    "name": "National Gallery of Art, Washington, D.C.",
    "email": "",
    "region": "North America",
    "enforce_on_platform_transactions": null,
    "_links": {
        "self": {
            "href": "https://api.artsy.net/api/partners/4f99c7b793ab4b0001000179"
        },
        "profile": {
            "href": "https://api.artsy.net/api/profiles/ngadc"
        },
        "artworks": {
            "href": "https://api.artsy.net/api/artworks?partner_id=4f99c7b793ab4b0001000179"
        },
        "artists": {
            "href": "https://api.artsy.net/api/artists?partner_id=4f99c7b793ab4b0001000179"
        },
        "published_artworks": {
            "href": "https://api.artsy.net/api/artworks?partner_id=4f99c7b793ab4b0001000179&published=true"
        },
        "partner_contacts": {
            "href": "https://api.artsy.net/api/partner_contacts?partner_id=4f99c7b793ab4b0001000179"
        },
        "shows": {
            "href": "https://api.artsy.net/api/shows?partner_id=4f99c7b793ab4b0001000179"
        },
        "permalink": {
            "href": "https://www.artsy.net/ngadc"
        },
        "website": {
            "href": "http://www.nga.gov"
        }
    }
}
```

## The Met
### [Artists](https://metmuseum.github.io/#search)
No way to retrieve!

### [Artworks](https://metmuseum.github.io/#objects)
- Instances:  484,215 but regularly updates
- Sortable fields: accession year, object ID, object name, department (eg. American Wing), artist begin date, artist end date
- Media provided: primary and additiona images, WikiData URL, location via city & state data (using Google Places API)

Example input/output: `https://collectionapi.metmuseum.org/public/collection/v1/objects/237`
```json
{
    "objectID": 237,
    "isHighlight": true,
    "accessionNumber": "1970.35.1",
    "accessionYear": "1970",
    "isPublicDomain": true,
    "primaryImage": "https://images.metmuseum.org/CRDImages/ad/original/DT179.jpg",
    "primaryImageSmall": "https://images.metmuseum.org/CRDImages/ad/web-large/DT179.jpg",
    "additionalImages": [
        "https://images.metmuseum.org/CRDImages/ad/original/ADA3177.jpg"
    ],
    "constituents": [
        {
            "constituentID": 163814,
            "role": "Maker",
            "name": "Attributed to Pottier and Stymus Manufacturing Company",
            "constituentULAN_URL": "http://vocab.getty.edu/page/ulan/500330539",
            "constituentWikidata_URL": "https://www.wikidata.org/wiki/Q2106610",
            "gender": ""
        }
    ],
    "department": "The American Wing",
    "objectName": "Armchair",
    "title": "Armchair",
    "culture": "American",
    "period": "",
    "dynasty": "",
    "reign": "",
    "portfolio": "",
    "artistRole": "Maker",
    "artistPrefix": "Attributed to",
    "artistDisplayName": "Pottier and Stymus Manufacturing Company",
    "artistDisplayBio": "active ca. 1859–1910",
    "artistSuffix": "",
    "artistAlphaSort": "Pottier and Stymus Manufacturing Company",
    "artistNationality": "",
    "artistBeginDate": "1859",
    "artistEndDate": "1910",
    "artistGender": "",
    "artistWikidata_URL": "https://www.wikidata.org/wiki/Q2106610",
    "artistULAN_URL": "http://vocab.getty.edu/page/ulan/500330539",
    "objectDate": "ca. 1870–75",
    "objectBeginDate": 1867,
    "objectEndDate": 1875,
    "medium": "Rosewood, prickly juniper veneer",
    "dimensions": "37 x 27 1/2 x 27 1/2 in. (94 x 69.9 x 69.9 cm)",
    "measurements": [
        {
            "elementName": "Overall",
            "elementDescription": null,
            "elementMeasurements": {
                "Depth": 69.9,
                "Height": 93.9802,
                "Width": 69.9
            }
        }
    ],
    "creditLine": "Funds from various donors, 1970",
    "geographyType": "Made in",
    "city": "New York",
    "state": "New York",
    "county": "",
    "country": "United States",
    "region": "Mid-Atlantic",
    "subregion": "",
    "locale": "",
    "locus": "",
    "excavation": "",
    "river": "",
    "classification": "",
    "rightsAndReproduction": "",
    "linkResource": "",
    "metadataDate": "2022-01-26T04:41:46.827Z",
    "repository": "Metropolitan Museum of Art, New York, NY",
    "objectURL": "https://www.metmuseum.org/art/collection/search/237",
    "tags": [
        {
            "term": "Sphinx",
            "AAT_URL": "http://vocab.getty.edu/page/aat/300375739",
            "Wikidata_URL": "https://www.wikidata.org/wiki/Q151480"
        }
    ],
    "objectWikidata_URL": "https://www.wikidata.org/wiki/Q29382865",
    "isTimelineWork": true,
    "GalleryNumber": "713"
}
```

### [Galleries](https://metmuseum.github.io/#search)
No way to retrieve!

## Art Institute of Chicago
### [Artists](https://api.artic.edu/docs/#agents-2)
- Instances: 15,057

Note: agents are not necessarily artists. Have to use the `is_artist` data to determine. I didn't investigate further because of this.

### [Artworks](https://api.artic.edu/docs/#quick-start)
- Instances: 119,465
- Sortable fields: title, start date, end date, place of origin, medium, year acquired, colorfulness, depaartment title, artist title
- Media provided: image ID which can be used for fetching the image, licensing data, publication history, exhibition history, if lat/long data is provided can use the Google Places API to plot location

Example input/output: `https://api.artic.edu/api/v1/artworks/82306`
```json
{
    "data": {
        "id": 82306,
        "api_model": "artworks",
        "api_link": "https://api.artic.edu/api/v1/artworks/82306",
        "is_boosted": false,
        "title": "Pink Composition (Composition en rose)",
        "alt_titles": null,
        "thumbnail": {
            "lqip": "data:image/gif;base64,R0lGODlhBwAFAPUAAJSGXpOGYZGHZZuKYJmJY5mKYpuNYpyKZp6NZZ+PZqCRZaCQZ6GRZ6SVZ6GRaKCSaKKTa6OWa6SYb6eabqeacaeYc6OZdaaadKWbd6iccKicdKufeqqgdq2hdKyhdquifKujfbCnfLOoewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAHAAUAAAYhwJCow/GAPpKIoZHBbCaKwiIAoWgeBEYC4bBcBIDBoRIEADs=",
            "width": 5013,
            "height": 3837,
            "alt_text": "A work made of oil on canvas."
        },
        "main_reference_number": "1954.1203",
        "has_not_been_viewed_much": false,
        "boost_rank": null,
        "date_start": 1951,
        "date_end": 1951,
        "date_display": "1951",
        "date_qualifier_title": "",
        "date_qualifier_id": null,
        "artist_display": "Zao Wou-Ki\nFrench, born China, 1921-2013",
        "place_of_origin": "France",
        "dimensions": "Without frame: 87 × 114.3 cm (34 5/16 × 45 in.); 87.7 × 114.3 cm (34 1/2 × 45 in.)",
        "medium_display": "Oil on canvas",
        "inscriptions": "Signed, lower right recto (in black paint)",
        "credit_line": "Gift of James W. Alsdorf",
        "catalogue_display": null,
        "publication_history": "Dorothy Holland and W.E. Militzer, Nebraska Art Association Sixty-Third Annual Exhibition, exh. cat. (Lincoln, NE: University Galleries, University of Nebraska, 1953), 11.\n\nC.C. Cunningham, Paintings in the Art Institute of Chicago, a Catalogue of the Picture Collection (Art Institute of Chicago, 1961), 487, as The World and the Deer.\n\nC.C. Cunningham, Supplement to Paintings in the Art Institute of Chicago, A Catalogue of the Picture Collection (Art Institute of Chicago, November 15, 1966), 64, as The Wolf and the Deer.\n\nJean Leymarie, Zao Wou-Ki  (Edition Hier et Demain and Ediciones Poligrafa, 1978), cat. 28, as Composition.\n\nJean Leymarie, Zao Wou-Ki, trans. Kenneth Lyons (Rizzoli International Publications, 1979), cat. 28, as Composition.\n\nJean Leymarie, Zao Wou-Ki, Documentation by Françoise Marquet (Cercle d’Art and Ediciones Polígrafa, 1978), cat. 28, as Composition.\n\nJean-Luc Chalumeau, ed., Zao Wou-Ki, (Galerie nationale du Jeu de Paume, 2003), p. 66 (color ill), as Composition rose ou Le Loup et le Cerf.",
        "exhibition_history": "Chicago, Main Street Gallery, 1952.\n\nLincoln, University of Nebraska, University Galleries, Nebraska Art Association, Sixty-Third Annual Exhibition, March 1953, p.11, as The Wolf and the Deer.",
        "provenance_text": "The artist; sold through Galerie Pierre, Paris, to Joseph W. Faulkner, Main Street Gallery, Chicago, 1952; sold to James W. Alsdorf (died 1990) about 1952; given to the Art Institute, 1954.",
        "publishing_verification_level": "Web Cataloged",
        "internal_department_id": 246,
        "fiscal_year": 1955,
        "fiscal_year_deaccession": null,
        "is_public_domain": false,
        "is_zoomable": false,
        "max_zoom_window_size": 843,
        "copyright_notice": null,
        "has_multimedia_resources": false,
        "has_educational_resources": false,
        "has_advanced_imaging": false,
        "colorfulness": 23.6966,
        "color": {
            "h": 37,
            "l": 32,
            "s": 39,
            "percentage": 0.007172611658252641,
            "population": 39
        },
        "latitude": null,
        "longitude": null,
        "latlon": null,
        "is_on_view": false,
        "on_loan_display": null,
        "gallery_title": null,
        "gallery_id": null,
        "artwork_type_title": "Painting",
        "artwork_type_id": 1,
        "department_title": "Contemporary Art",
        "department_id": "PC-8",
        "artist_id": 37410,
        "artist_title": "Wou-Ki Zao",
        "alt_artist_ids": [],
        "artist_ids": [
            37410
        ],
        "artist_titles": [
            "Wou-Ki Zao"
        ],
        "category_ids": [
            "PC-8"
        ],
        "category_titles": [
            "Contemporary Art"
        ],
        "term_titles": [
            "painting",
            "modern and contemporary art"
        ],
        "style_id": null,
        "style_title": null,
        "alt_style_ids": [],
        "style_ids": [],
        "style_titles": [],
        "classification_id": "TM-9",
        "classification_title": "painting",
        "alt_classification_ids": [
            "TM-155"
        ],
        "classification_ids": [
            "TM-9",
            "TM-155"
        ],
        "classification_titles": [
            "painting",
            "modern and contemporary art"
        ],
        "subject_id": null,
        "alt_subject_ids": [],
        "subject_ids": [],
        "subject_titles": [],
        "material_id": null,
        "alt_material_ids": [],
        "material_ids": [],
        "material_titles": [],
        "technique_id": null,
        "alt_technique_ids": [],
        "technique_ids": [],
        "technique_titles": [],
        "theme_titles": [],
        "image_id": "28789d64-9012-0b86-782a-cdb6e847ba84",
        "alt_image_ids": [],
        "document_ids": [],
        "sound_ids": [],
        "video_ids": [],
        "text_ids": [],
        "section_ids": [],
        "section_titles": [],
        "site_ids": [],
        "suggest_autocomplete_all": [
            {
                "input": [
                    "1954.1203"
                ],
                "contexts": {
                    "groupings": [
                        "accession"
                    ]
                }
            },
            {
                "input": [
                    "Pink Composition (Composition en rose)"
                ],
                "weight": 751,
                "contexts": {
                    "groupings": [
                        "title"
                    ]
                }
            }
        ],
        "source_updated_at": "2023-02-23T18:24:45-06:00",
        "updated_at": "2023-02-23T18:27:13-06:00",
        "timestamp": "2023-02-23T20:40:03-06:00"
    },
    "info": {
        "license_text": "The data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.",
        "license_links": [
            "https://creativecommons.org/publicdomain/zero/1.0/",
            "https://www.artic.edu/terms"
        ],
        "version": "1.6"
    },
    "config": {
        "iiif_url": "https://www.artic.edu/iiif/2",
        "website_url": "http://www.artic.edu"
    }
}
```

### [Galleries](https://api.artic.edu/docs/#quick-start)
- Instances: 180
- Sortable fields: id, title, *FEATURE 3*, *FEATURE 4*, *FEATURE 5*
- Media provided: location (via lat/long, can be plotted w/Google Places API)

Example input/output: `https://api.artic.edu/api/v1/galleries/25467`
```json
{
    "data": {
        "id": 25467,
        "api_model": "galleries",
        "api_link": "https://api.artic.edu/api/v1/galleries/25467",
        "title": "Gallery 289",
        "latitude": 41.879989835077,
        "longitude": -87.621983272144,
        "tgn_id": null,
        "is_closed": false,
        "number": "289",
        "floor": "2",
        "latlon": "41.879989835077,-87.621983272144",
        "source_updated_at": "2023-02-22T14:23:39-06:00",
        "updated_at": "2023-02-22T14:27:16-06:00",
        "timestamp": "2023-02-23T20:56:07-06:00"
    },
    "info": {
        "license_text": "The data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.",
        "license_links": [
            "https://creativecommons.org/publicdomain/zero/1.0/",
            "https://www.artic.edu/terms"
        ],
        "version": "1.6"
    },
    "config": {
        "iiif_url": "https://www.artic.edu/iiif/2",
        "website_url": "http://www.artic.edu"
    }
}
```

## Cleveland
### [Artists](link)
- Instances:
- Sortable fields: 
- Media provided: 
### [Artworks](link)
- Instances:
- Sortable fields: 
- Media provided: 
### [Galleries](link)
- Instances:
- Sortable fields: 
- Media provided: 

## Harvard
### [Artists](link)
- Instances:
- Sortable fields: 
- Media provided: 
### [Artworks](link)
- Instances:
- Sortable fields: 
- Media provided: 
### [Galleries](link)
- Instances:
- Sortable fields: 
- Media provided: 

## Wikidata
### [Artists](link)
- Instances:
- Sortable fields: 
- Media provided: 
### [Artworks](link)
- Instances:
- Sortable fields: 
- Media provided: 
### [Galleries](link)
- Instances:
- Sortable fields: 
- Media provided: 

Note: ArtIC has [videos](https://api.artic.edu/docs/#videos) but I wasn't able to query any...

## Conclusion
