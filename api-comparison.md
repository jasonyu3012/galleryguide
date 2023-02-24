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
### [Artists](https://openaccess-api.clevelandart.org/)
- Instances: 8,740
- Sortable fields: name, nationality, birth year, death year, ID
- Media provided: description (of artist)

Example input/output: `https://openaccess-api.clevelandart.org/api/creators/?name=monet`
```json
{
    "info": {
        "total": 1,
        "parameters": {
            "name": "monet",
            "skip": 0,
            "limit": 100
        }
    },
    "data": [
        {
            "name": "Claude Monet",
            "nationality": "French",
            "description": "Claude Monet (French, 1840–1926)",
            "biography": "Claude Monet spent his youth in Le Havre in Normandy, where his father worked as a wholesale grocer. By the age of sixteen, he had exhibited some of his caricatures in an art supply store, leading to his acquaintance with Boudin (q.v.). It was Boudin who first encouraged him to paint out of doors. In 1859 Monet traveled to Paris, where he saw Boudin's salon debut and met Constant Troyon (1810-1865). A year later he joined the Académie Suisse, where he was introduced to Pissarro (q.v.), but his studies were interrupted in 1861 when he was drafted for a seven-year stint in the military. His family would pay for his release from military duties only if he gave up painting. Finding this unacceptable, Monet served for one year in Algeria before an early return to France to convalesce after a severe illness. In 1862 he met Jongkind (q.v.), another important influence on the young painter's development. Monet's father then allowed him to pursue his art career in Paris, where he entered the studio of the Swiss painter Charles Gleyre (1806-1874). He studied with Gleyre until 1864 and befriended Frédéric Bazille (1841-1870), Renoir (q.v.), and Sisley (q.v.), with whom he painted in the forest of Fontainebleau (Déjeuner sur l'herbe, 1865, two fragments in Musée d'Orsay, Paris). Monet first exhibited at the Salon of 1865 and would do so again in 1866, 1868, and 1880. In 1868 he shared a studio with Bazille and Renoir but was soon forced to leave Paris to escape his creditors. He took his mistress, Camille Doncieux, and their son, Jean, to Fécamp, then Étretat, and finally Saint-Michel. There Renoir provided hospitality, and the two also painted at the boating and bathing center of La Grenouillère on the Seine. In 1870 Monet married Camille and, to escape the Franco-Prussian War, left for London, where he remained for nine months and met Durand-Ruel, his first dealer. In the summer of 1871 he visited the Netherlands and then settled in Argenteuil, to the west of Paris. He converted a boat into a studio, as Daubigny (q.v.) had done before him, allowing him to explore different viewpoints for his landscapes. He assisted in the organization of the First Impressionist Exhibition in 1874, partly because Durand-Ruel's worsened business situation had prevented the dealer from buying his art. The following year he participated in the Hôtel Drouot sale with Morisot (q.v.), Renoir, and Sisley. In 1878 Monet and his wife moved to Vétheuil with the Hoschedés, who had previously commissioned some works. Camille died the following year, and, while Ernest Hoschedé spent most of his time in Paris trying to settle his precarious financial situation, Monet stayed behind with Ernest's wife, Alice. In 1881 he moved with her and her children to Poissy and within two years was living at Giverny, where he would remain for the rest of his life. He painted some of his famous scenes-the haystack and poplar series, for example- in 1890-91. Ernest Hoschedé died in 1891, and Monet married Alice the following year. At Giverny, Monet explored the themes of his garden and water lilies. He continued to travel, going to Norway in 1895, making three trips to London from 1899 through 1901, and taking Alice to Venice in 1908. The final years of his life were mainly spent working on his Great Decorations, large paintings of a water lily pond designed for two oval rooms at the Paris Orangerie. Monet is generally considered the most typical exponent of impressionism.",
            "birth_year": "1840",
            "death_year": "1926",
            "id": 1844,
            "artworks": [
                {
                    "id": 95272,
                    "accession_number": "1916.1044",
                    "title": "Gardener's House at Antibes",
                    "tombstone": "Gardener's House at Antibes, 1888. Claude Monet (French, 1840–1926). Oil on fabric; framed: 91.1 x 118.4 x 13.7 cm (35 7/8 x 46 5/8 x 5 3/8 in.); unframed: 66.3 x 93 cm (26 1/8 x 36 5/8 in.). The Cleveland Museum of Art, Gift of Mr. and Mrs. J. H. Wade 1916.1044",
                    "url": "https://clevelandart.org/art/1916.1044"
                },
                {
                    "id": 125234,
                    "accession_number": "1947.196",
                    "title": "Low Tide at Pourville, near Dieppe, 1882",
                    "tombstone": "Low Tide at Pourville, near Dieppe, 1882, 1882. Claude Monet (French, 1840–1926). Oil on fabric; framed: 65.4 x 106.7 x 10.5 cm (25 3/4 x 42 x 4 1/8 in.); unframed: 59.9 x 81.3 cm (23 9/16 x 32 in.). The Cleveland Museum of Art, Gift of Mrs. Henry White Cannon 1947.196",
                    "url": "https://clevelandart.org/art/1947.196"
                },
                {
                    "id": 130391,
                    "accession_number": "1953.155",
                    "title": "Spring Flowers",
                    "tombstone": "Spring Flowers, 1864. Claude Monet (French, 1840–1926). Oil on fabric; framed: 144.5 x 117.2 x 12.1 cm (56 7/8 x 46 1/8 x 4 3/4 in.); unframed: 116.8 x 90.5 cm (46 x 35 5/8 in.). The Cleveland Museum of Art, Gift of the Hanna Fund 1953.155",
                    "url": "https://clevelandart.org/art/1953.155"
                },
                {
                    "id": 135382,
                    "accession_number": "1958.39",
                    "title": "The Red Kerchief",
                    "tombstone": "The Red Kerchief, c. 1868–73. Claude Monet (French, 1840–1926). Oil on fabric; framed: 128.3 x 105.7 x 14.6 cm (50 1/2 x 41 5/8 x 5 3/4 in.); unframed: 99 x 79.8 cm (39 x 31 7/16 in.). The Cleveland Museum of Art, Bequest of Leonard C. Hanna, Jr. 1958.39",
                    "url": "https://clevelandart.org/art/1958.39"
                },
                {
                    "id": 136510,
                    "accession_number": "1960.81",
                    "title": "Water Lilies (Agapanthus)",
                    "tombstone": "Water Lilies (Agapanthus), c. 1915–26. Claude Monet (French, 1840–1926). Oil on canvas; framed: 204.9 x 430.3 x 6 cm (80 11/16 x 169 7/16 x 2 3/8 in.); unframed: 201.3 x 425.6 cm (79 1/4 x 167 9/16 in.). The Cleveland Museum of Art, John L. Severance Fund and an anonymous gift 1960.81",
                    "url": "https://clevelandart.org/art/1960.81"
                }
            ]
        }
    ]
}
```

### [Artworks](https://openaccess-api.clevelandart.org/)
- Instances: 64,956
- Sortable fields: title, creation_date_earliest, department, type, technique
- Media provided: wall description, image links

Example input/output: `https://openaccess-api.clevelandart.org/api/artworks/130707`
```json
{
    "data": {
        "id": 130707,
        "accession_number": "1953.424",
        "share_license_status": "CC0",
        "tombstone": "Head of Saint John the Baptist, c. 1550–1650. Spain or Northern Italy, mid 16th - mid 17th century. Oil on canvas; framed: 80.6 x 104.8 x 7.6 cm (31 3/4 x 41 1/4 x 3 in.); unframed: 50 x 75.2 cm (19 11/16 x 29 5/8 in.). The Cleveland Museum of Art, Mr. and Mrs. William H. Marlatt Fund 1953.424",
        "current_location": "118 Italian Renaissance",
        "title": "Head of Saint John the Baptist",
        "creation_date": "c. 1550–1650",
        "creation_date_earliest": 1550,
        "creation_date_latest": 1650,
        "artists_tags": [],
        "culture": [
            "Spain or Northern Italy, mid 16th - mid 17th century"
        ],
        "technique": "oil on canvas",
        "support_materials": [],
        "department": "European Painting and Sculpture",
        "collection": "P - Italian 16th & 17th Century",
        "type": "Painting",
        "measurements": "Framed: 80.6 x 104.8 x 7.6 cm (31 3/4 x 41 1/4 x 3 in.); Unframed: 50 x 75.2 cm (19 11/16 x 29 5/8 in.)",
        "dimensions": {
            "framed": {
                "height": 0.806,
                "width": 1.048,
                "depth": 0.076
            },
            "unframed": {
                "height": 0.5,
                "width": 0.752
            }
        },
        "state_of_the_work": null,
        "edition_of_the_work": null,
        "copyright": null,
        "inscriptions": [
            {
                "inscription": "Inscription of ribbon entwining the reed cross: ECCE AGNUS DEI",
                "inscription_translation": null,
                "inscription_remark": null
            }
        ],
        "exhibitions": {
            "current": [
                {
                    "id": 300859,
                    "title": "The Venetian Tradition",
                    "description": "<i>The Venetian Tradition</i>. The Cleveland Museum of Art (November 8, 1956-January 1, 1957).",
                    "opening_date": "1956-11-08T05:00:00"
                }
            ],
            "legacy": [
                "Vienna, Sezesion (second exhibition by the Verein der Museumfreunde), 1924: \"Meisterwerker Italienischer Renaissance Kunst aus Privtbesitz,\" cat. no. 112. <br>Venice, Palazo Pésaro, 1935: \"Mostra di Tiziano,\" cat. no. 63 (catalogue by Gino Fogliari). <br>CMA, 1956: \"The Venetian Tradition,\" cat. no. 22, pl. IX. (Catalogue by Henry S Francis)."
            ]
        },
        "provenance": [
            {
                "description": "[Alessandro Brass, Venice], sold to the Cleveland Museum of Art, 1953.",
                "citations": [],
                "footnotes": null,
                "date": null
            }
        ],
        "find_spot": null,
        "related_works": [],
        "former_accession_numbers": [],
        "fun_fact": "The scroll wrapped around the cross next to John the Baptist's head reads <em>Ecce Agnus Dei</em>, meaning \"Behold the Lamb of God.\"",
        "digital_description": null,
        "wall_description": "Salome’s dancing so pleased her stepfather Herod that he offered her anything she wanted. Her mother advised Salome to demand John the Baptist’s head, which Salome presented to her family in an elaborate dish. Here, the head stands on its own, with a startlingly tangible presence. Despite its biblical source, this work was meant for a domestic setting, whose owner would have admired the artful presentation of a shocking story. Acquired in 1953 as the work of the Venetian Renaissance artist Titian, the painting soon lost this attribution because it lacks Titian’s distinctive brushwork. After decades of research, the museum has yet to identify a clear author. Recently, several scholars have argued persuasively for a Spanish artist, partly because the subject is common in Spanish art in the early 1600s. Yet the color scheme and the handling of paint in the face recalls the work of earlier artists inspired by Titian in northern Italy.",
        "external_resources": {
            "wikidata": [],
            "internet_archive": []
        },
        "citations": [
            {
                "citation": "The Cleveland Museum of Art. <em>Handbook of the Cleveland Museum of Art/1966</em>. Cleveland, OH: The Cleveland Museum of Art, 1966.",
                "page_number": "Reproduced: p. 97",
                "url": "https://archive.org/details/CMAHandbook1966/page/n121"
            },
            {
                "citation": "The Cleveland Museum of Art. <em>Handbook of the Cleveland Museum of Art/1969</em>. Cleveland, OH: The Cleveland Museum of Art, 1969.",
                "page_number": "Reproduced: p. 97",
                "url": "https://archive.org/details/CMAHandbook1969/page/n121"
            },
            {
                "citation": "The Cleveland Museum of Art. <em>Handbook of the Cleveland Museum of Art/1978</em>. Cleveland, OH: The Cleveland Museum of Art, 1978.",
                "page_number": "Reproduced: p. 111",
                "url": "https://archive.org/details/CMAHandbook1978/page/n131"
            },
            {
                "citation": "The Cleveland Museum of Art<em>. The Cleveland Museum of Art Catalogue of Paintings, Part 3: European Paintings of the 16th, 17th, and 18th Centuries</em>. Cleveland, OH: The Cleveland Museum of Art, 1982.",
                "page_number": "Mentioned and Reproduced: p. 442",
                "url": null
            },
            {
                "citation": "Brettell, Richard R. <em>On Modern Beauty: Three Paintings by Manet, Gauguin, and Cezanne</em>. Los Angeles: The J. Paul Getty Museum, 2019.",
                "page_number": "Reproduced: P. 56, no. 40",
                "url": null
            }
        ],
        "url": "https://clevelandart.org/art/1953.424",
        "images": {
            "web": {
                "url": "https://openaccess-cdn.clevelandart.org/1953.424/1953.424_web.jpg",
                "width": "1263",
                "height": "830",
                "filesize": "724828",
                "filename": "1953.424_web.jpg"
            },
            "print": {
                "url": "https://openaccess-cdn.clevelandart.org/1953.424/1953.424_print.jpg",
                "width": "3400",
                "height": "2235",
                "filesize": "5897752",
                "filename": "1953.424_print.jpg"
            },
            "full": {
                "url": "https://openaccess-cdn.clevelandart.org/1953.424/1953.424_full.tif",
                "width": "6060",
                "height": "3983",
                "filesize": "72441096",
                "filename": "1953.424_full.tif"
            }
        },
        "alternate_images": [
            {
                "date_created": "2009-06-24T17:18:13",
                "annotation": "",
                "web": {
                    "url": "https://openaccess-cdn.clevelandart.org/alternate/1953.424/1953.424_alt0_web.jpg",
                    "width": "1263",
                    "height": "842",
                    "filesize": "773909"
                },
                "print": {
                    "url": "https://openaccess-cdn.clevelandart.org/alternate/1953.424/1953.424_alt0_print.jpg",
                    "width": "3400",
                    "height": "2266",
                    "filesize": "6111661"
                },
                "full": {
                    "url": "https://openaccess-cdn.clevelandart.org/alternate/1953.424/1953.424_alt0_full.tif",
                    "width": "6382",
                    "height": "4253",
                    "filesize": "81458260"
                }
            },
            {
                "date_created": "2009-06-24T13:34:51",
                "annotation": "",
                "web": {
                    "url": "https://openaccess-cdn.clevelandart.org/alternate/1953.424/1953.424_alt1_web.jpg",
                    "width": "1162",
                    "height": "893",
                    "filesize": "815160"
                },
                "print": {
                    "url": "https://openaccess-cdn.clevelandart.org/alternate/1953.424/1953.424_alt1_print.jpg",
                    "width": "3400",
                    "height": "2614",
                    "filesize": "6894001"
                },
                "full": {
                    "url": "https://openaccess-cdn.clevelandart.org/alternate/1953.424/1953.424_alt1_full.tif",
                    "width": "5841",
                    "height": "4491",
                    "filesize": "78729108"
                }
            }
        ],
        "creditline": "Mr. and Mrs. William H. Marlatt Fund",
        "sketchfab_id": null,
        "sketchfab_url": null,
        "athena_id": 130707,
        "creators": [],
        "updated_at": "2023-01-10 23:57:59.055000"
    }
}
```

### [Galleries](https://openaccess-api.clevelandart.org/)
No way to retrieve!

## Harvard
### [Artists](link)
Contains information on entities that have some association to works of art in the collection or publications. Associations include artists, sitters, printers, donors, authors, publishers, and more. (Not applicable.)

Example input/output: `https://api.harvardartmuseums.org/person?q=culture:Dutch`
```json
{
    "info": {
        "totalrecordsperquery": 10,
        "totalrecords": 600,
        "pages": 60,
        "page": 1
    },
    "records": [
        {
            "gender": "male",
            "displaydate": "1872 - 1944",
            "objectcount": 10,
            "wikidata_id": "Q151803",
            "dateend": 1944,
            "url": "https://www.harvardartmuseums.org/collections/person/27650",
            "names": [
                {
                    "displayname": "Pieter Cornelis Mondriaan",
                    "type": "Alternate Name"
                },
                {
                    "displayname": "Piet Mondrian",
                    "type": "Primary Name"
                },
                {
                    "displayname": "Piet Mondriaan",
                    "type": "Alternate Name"
                }
            ],
            "birthplace": "Amersfoort, The Netherlands",
            "datebegin": 1872,
            "culture": "Dutch",
            "displayname": "Piet Mondrian",
            "alphasort": "Mondrian, Piet",
            "ulan_id": "500004972",
            "personid": 27650,
            "deathplace": "New York, N.Y.",
            "id": 27650,
            "lastupdate": "2021-07-23T03:57:30-0400",
            "lcnaf_id": "n79135254"
        },
        {
            "gender": "male",
            "displaydate": "1606 - 1669",
            "objectcount": 709,
            "dateend": 1669,
            "url": "https://www.harvardartmuseums.org/collections/person/28241",
            "viaf_id": "64013650",
            "names": [
                {
                    "displayname": "Rembrandt Harmensz. van Rijn",
                    "type": "Primary Name"
                },
                {
                    "displayname": "Rembrandt van Rijn",
                    "type": "Alternate Name"
                },
                {
                    "displayname": "Rembrandt",
                    "type": "Alternate Name"
                }
            ],
            "birthplace": "Leiden",
            "wikipedia_id": "4254144",
            "datebegin": 1606,
            "culture": "Dutch",
            "displayname": "Rembrandt Harmensz. van Rijn",
            "alphasort": "Rembrandt Harmensz. van Rijn",
            "ulan_id": "500011051",
            "personid": 28241,
            "deathplace": "Amsterdam",
            "id": 28241,
            "lastupdate": "2021-07-23T03:51:29-0400"
        }
    ]
}
```

### [Artworks](link)
- Instances: *TODO*
- Sortable fields: id, classificationid, techniqueid, periodid, rank
- Media provided: *TODO*

Example input/output: `https://api.harvardartmuseums.org/object/304069`
```json
{
    "objectid": 304069,
    "objectnumber": "1949.89",
    "accessionyear": 1949,
    "dated": "late 5th century BCE",
    "datebegin": -430,
    "dateend": -400,
    "classification": "Vessels",
    "classificationid": 57,
    "medium": "Bronze, traces of silvering and possible gilding",
    "technique": "Cast, lost-wax process",
    "techniqueid": 1311,
    "period": "Classical period, High",
    "periodid": 416,
    "century": "5th century BCE",
    "culture": "Greek",
    "style": null,
    "signed": null,
    "state": null,
    "edition": null,
    "standardreferencenumber": null,
    "dimensions": "h. 41.9 cm x diam. 28.5 cm (37 cm in diam. with handles) (16 1/2 x 11 1/4 in.; 14 9/16 in diam. with handles)",
    "copyright": null,
    "creditline": "Harvard Art Museums/Arthur M. Sackler Museum, Grace Nichols Strong Memorial Fund",
    "department": "Department of Ancient and Byzantine Art & Numismatics",
    "division": "Asian and Mediterranean Art",
    "contact": "am_asianmediterranean@harvard.edu",
    "description": "",
    "provenance": "John Edward Taylor Collection, London, (by 1912). [Christie’s, July 1, 1912, lot 367]. H. Oppenheimer collection, London, sold; [through Christie’s, London, July 22-23, 1936, lot 126]; sold; [to the International Studio Art Corp. (William Randolph Hearst), Oct. 24, 1940], sold; [through J. Brummer Gallery, New York, 1940-1949, inv. no. N4736], sold; to Fogg Art Museum, 1949.",
    "commentary": "",
    "labeltext": null,
    "imagecount": 5,
    "mediacount": 0,
    "colorcount": 9,
    "markscount": 0,
    "peoplecount": 0,
    "titlescount": 1,
    "publicationcount": 12,
    "exhibitioncount": 4,
    "contextualtextcount": 1,
    "groupcount": 3,
    "relatedcount": 0,
    "totalpageviews": 595,
    "totaluniquepageviews": 486,
    "dateoffirstpageview": "2009-06-03",
    "dateoflastpageview": "2018-08-22",
    "verificationlevel": 4,
    "verificationleveldescription": "Best. Object is extensively researched, well described and information is vetted",
    "imagepermissionlevel": 0,
    "accesslevel": 1,
    "accessionmethod": "Purchase",
    "rank": 164,
    "url": "https://www.harvardartmuseums.org/collections/object/304069",
    "id": 304069,
    "lastupdate": "2018-08-30T04:40:43-0400",
    "colors": [
        {
            "percent": 0.43642857142857,
            "spectrum": "#8c5fa8",
            "color": "#c8c8c8",
            "css3": "#c0c0c0",
            "hue": "Grey"
        },
        {
            "percent": 0.1864880952381,
            "spectrum": "#8c5fa8",
            "color": "#afafaf",
            "css3": "#a9a9a9",
            "hue": "Grey"
        },
        {
            "percent": 0.12803571428571,
            "spectrum": "#2eb45d",
            "color": "#323232",
            "css3": "#2f4f4f",
            "hue": "Grey"
        },
        {
            "percent": 0.092142857142857,
            "spectrum": "#3db657",
            "color": "#4b4b4b",
            "css3": "#2f4f4f",
            "hue": "Grey"
        },
        {
            "percent": 0.06297619047619,
            "spectrum": "#7866ad",
            "color": "#646464",
            "css3": "#696969",
            "hue": "Grey"
        },
        {
            "percent": 0.051964285714286,
            "spectrum": "#955ba5",
            "color": "#e1e1e1",
            "css3": "#dcdcdc",
            "hue": "Grey"
        },
        {
            "percent": 0.0175,
            "spectrum": "#8362aa",
            "color": "#7d7d7d",
            "css3": "#808080",
            "hue": "Grey"
        },
        {
            "percent": 0.014345238095238,
            "spectrum": "#8761aa",
            "color": "#969696",
            "css3": "#a9a9a9",
            "hue": "Grey"
        },
        {
            "percent": 0.010119047619048,
            "spectrum": "#1eb264",
            "color": "#191919",
            "css3": "#000000",
            "hue": "Grey"
        }
    ],
    "contextualtext": [
        {
            "text": "This three-handled water jar, or hydria, is of the kalpis type, which has a continuous curving profile and originated c. 500 BCE, perhaps in Athens. The body was hammered out of a single sheet of bronze to which the cast portions—three handles, the foot, and the rim—were joined with solder. The surface of the vessel is largely a greenish gold, which is reminiscent of its original color, although there are extensive areas of a darker greenish gray. \r\n \r\nThe rim (15.7 cm in diameter) features an overhanging band of egg-and-dart molding. Each egg is surrounded by a single raised ridge. Tiny beads encircle the outside of the flattened rim. The foot (15.5 cm in diameter) displays a concave band of tongues, in between each of which is a narrower convex tongue. \r\n \r\nThe side handles, decorated with four concave flutes with rounded ends, rise from circular plates decorated with concave tongues. The vertical handle, circular in section, bears five flutes separated by narrow ridges divided by fine grooves. The top rises from a base plate situated beneath the rim, identical with the plates of the side handles. \r\n \r\nThe base plate is a siren, whose sickle-shaped wings rise up out of her torso and curve inward symmetrically on either side of her head. Each individual feather, rendered in relief, has a fine incised median line, on either side of which are tiny incisions. The siren’s body is also covered with finely incised scales, which have a median line flanked by tiny incisions. The siren’s feet, each bearing three claws, hang vertically from raised edges below the scales and grasp an oval object, from which a seven-petalled palmette, with concave leaves, projects downward. \r\n \r\nAbove the palmette are two antithetical, concave S-shaped volutes, the smaller ends of which curl under the siren’s wings. The spaces between the volutes, the wings, and the tendrils are left open. The volutes’ centers are filled with small hemispherical oculi, which may be silver (1). Two curls descend in relief, curving symmetrically over the shoulders of the siren. \r\n \r\nThis hydria belongs to a class of vessels with sirens adorning the base plate of the vertical handles (2). They begin c. 480 BCE and continue throughout the rest of the fifth century, perhaps even into the first quarter of the fourth century. The shape of the Harvard hydria suggests that it dates between 430 and 400 BCE. The only intact Greek bronze vessel in the Harvard Art Museums' collection, this vase was used to carry and pour water, as the name hydria implies. Its funerary significance may be inferred from the presence of the siren at the base of this handle. Such expensive metal vases were given as prizes in athletic contests and often later contained the cremated ashes of their owners. Such use probably explains the unusually fine state of preservation of this hydria. Harvard's hydria represents the highest quality of late Classical Greek metalwork.\r\n \r\nNOTES:\r\n \r\n1. For other examples of vessels with silver in the volutes, see E. D. Reeder, Scythian Gold: Treasures from Ancient Ukraine, exh. cat., The Walters Art Gallery (Baltimore, 1999) 193-94, no. 82; and J. M. Padgett, The Centaur’s Smile, exh. cat., Princeton University Art Museum (New Haven, 2003) no. 80.\r\n \r\n2. For comparison, see D. von Bothmer, “Bronze Hydriai,” Bulletin of the Metropolitan Museum of Art 13.6 (1955): 193-200, esp. 197; I. Kouleiman­ē-Vokotopoulou, Chalkai Korinthiourgeis prochoi: Symvolē eis tēn meletēn tēs archaias Hellēnikēs chalkourgias (Athens, 1975) [in Greek]; ead., “Ē hydria tēs Aineias,” in Amētos: Timētikos tomos gia ton kathēgētē Manolē Andronikos 2, eds. M. A. Tiverios, S. Drougou, and Ch. Saatsoglou-Paliadelē (Thessaloniki, 1987) 157-69, esp. pls. 24-26 [in Greek]; L. I. Marangou, Ancient Greek Art: The N. P. Goulandris Collection (Athens, 1985), 162-63; and M. True and K. Hamma, eds., A Passion for Antiquities: Ancient Art from the Collection of Barbara and Lawrence Fleischman, exh. cat., J. Paul Getty Museum, Malibu; Cleveland Museum of Art (Malibu, 1994) 68-70, no. 24.\r\n \r\n \r\nDavid G. Mitten",
            "textiletext": null,
            "context": "Ancient Mediterranean and Near Eastern Bronzes at the Harvard Art Museums",
            "date": null,
            "type": "Published Catalogue Text"
        }
    ],
    "exhibitions": [
        {
            "citation": "<em>Dialogue with Antiquity: The Curatorial Achievement of George M.A. Hanfmann</em>, Fogg Art Museum, 05/07/1982 - 06/26/1982",
            "title": "Dialogue with Antiquity: The Curatorial Achievement of George M.A. Hanfmann",
            "exhibitionid": 4145,
            "enddate": null,
            "begindate": null
        },
        {
            "citation": "<em>Master Bronzes from the Classical World</em>, Fogg Art Museum, Cambridge, 12/04/1967 - 01/23/1968; City Art Museum of St. Louis, St. Louis, 03/01/1968 - 04/13/1968; Los Angeles County Museum of Art, Los Angeles, 05/08/1968 - 06/30/1968",
            "title": "Master Bronzes from the Classical World",
            "exhibitionid": 558,
            "enddate": "1968-06-30",
            "begindate": "1967-12-04"
        },
        {
            "citation": "<em>Greek and Roman Metalware: A Loan Exhibition</em>, Walters Art Gallery, 02/14/1976 - 04/14/1976",
            "title": "Greek and Roman Metalware: A Loan Exhibition",
            "exhibitionid": 4902,
            "enddate": "1976-04-14",
            "begindate": "1976-02-14"
        },
        {
            "citation": "<em>32Q: 3400 Greek</em>, Harvard Art Museums, Cambridge, 11/01/2014",
            "title": "32Q: 3400 Greek",
            "exhibitionid": 4470,
            "enddate": null,
            "begindate": "2014"
        }
    ],
    "gallery": {
        "gallerynumber": "3400",
        "floor": 3,
        "theme": "Ancient Greece in Black and Orange",
        "name": "Ancient Mediterranean and Near Eastern Art",
        "galleryid": 3400,
        "begindate": "2014-11-16"
    },
    "groupings": [
        {
            "name": "Collection Highlights",
            "groupid": 2039923
        },
        {
            "name": "Ancient Bronzes",
            "groupid": 2040129
        },
        {
            "name": "Google Art Project",
            "groupid": 2040174
        }
    ],
    "primaryimageurl": "https://nrs.harvard.edu/urn-3:HUAM:DDC251092_dynmc",
    "images": [
        {
            "date": "2013-05-28",
            "copyright": "President and Fellows of Harvard College",
            "imageid": 427747,
            "idsid": 46585832,
            "format": "image/jpeg",
            "description": null,
            "technique": null,
            "renditionnumber": "DDC251092",
            "displayorder": 1,
            "baseimageurl": "https://nrs.harvard.edu/urn-3:HUAM:DDC251092_dynmc",
            "alttext": null,
            "width": 1909,
            "publiccaption": null,
            "iiifbaseuri": "https://ids.lib.harvard.edu/ids/iiif/46585832",
            "height": 2550
        },
        {
            "date": "2014-06-05",
            "copyright": "President and Fellows of Harvard College",
            "imageid": 440789,
            "idsid": 400097623,
            "format": "image/jpeg",
            "description": null,
            "technique": null,
            "renditionnumber": "LEG252741",
            "displayorder": 2,
            "baseimageurl": "https://nrs.harvard.edu/urn-3:HUAM:LEG252741",
            "alttext": null,
            "width": 2351,
            "publiccaption": null,
            "iiifbaseuri": "https://ids.lib.harvard.edu/ids/iiif/400097623",
            "height": 2450
        },
        {
            "date": "2013-05-28",
            "copyright": "President and Fellows of Harvard College",
            "imageid": 427746,
            "idsid": 47334808,
            "format": "image/jpeg",
            "description": null,
            "technique": null,
            "renditionnumber": "DDC251030",
            "displayorder": 3,
            "baseimageurl": "https://nrs.harvard.edu/urn-3:HUAM:DDC251030_dynmc",
            "alttext": null,
            "width": 685,
            "publiccaption": null,
            "iiifbaseuri": "https://ids.lib.harvard.edu/ids/iiif/47334808",
            "height": 1024
        },
        {
            "date": "2008-02-19",
            "copyright": "President and Fellows of Harvard College",
            "imageid": 291689,
            "idsid": 8385158,
            "format": "image/jpeg",
            "description": null,
            "technique": null,
            "renditionnumber": "DDC105025",
            "displayorder": 4,
            "baseimageurl": "https://nrs.harvard.edu/urn-3:HUAM:DDC105025_dynmc",
            "alttext": null,
            "width": 827,
            "publiccaption": null,
            "iiifbaseuri": "https://ids.lib.harvard.edu/ids/iiif/8385158",
            "height": 1024
        },
        {
            "date": null,
            "copyright": "President and Fellows of Harvard College",
            "imageid": 14371,
            "idsid": 43182772,
            "format": "image/jpeg",
            "description": null,
            "technique": "Super XX",
            "renditionnumber": "46082",
            "displayorder": 5,
            "baseimageurl": "https://nrs.harvard.edu/urn-3:HUAM:46082_dynmc",
            "alttext": null,
            "width": 842,
            "publiccaption": null,
            "iiifbaseuri": "https://ids.lib.harvard.edu/ids/iiif/43182772",
            "height": 1024
        }
    ],
    "places": [
        {
            "placeid": 2037477,
            "type": "Creation Place",
            "displayname": "Ancient & Byzantine World, Europe, Chalke"
        }
    ],
    "publications": [
        {
            "citation": "Christie, Manson and Woods, Ltd., <em>John Edward Taylor Collection of Works of Art</em>, exh. cat., Christie, Manson and Woods, Ltd. (London, 1912)",
            "title": "John Edward Taylor Collection of Works of Art",
            "citationremarks": null,
            "publicationplace": "London",
            "publicationyear": 1912,
            "volumenumber": null,
            "format": "Exhibition Catalogue",
            "publicationid": 20129,
            "publicationdate": "1912",
            "volumetitle": null,
            "pagenumbers": "p. 92, no. 367."
        },
        {
            "citation": "Christie's, London, <em>Catalog of the collection of Egyptian and Roman antiquities, cameos and intaglios formed by the late Henry Oppenheimer</em>, exh. cat., William Clowes and Sons, Ltd. (London, 1936)",
            "title": "Catalog of the collection of Egyptian and Roman antiquities, cameos and intaglios formed by the late Henry Oppenheimer",
            "citationremarks": null,
            "publicationplace": "London",
            "publicationyear": 1936,
            "volumenumber": null,
            "format": "Exhibition Catalogue",
            "publicationid": 20128,
            "publicationdate": "1936",
            "volumetitle": null,
            "pagenumbers": "p. 41, no. 126."
        },
        {
            "citation": "<em>The Notable Art Collection Belonging to the estate of the late Joseph Brummer</em>, auct. cat., Parke-Bernet Galleries, Inc. (New York, NY, April 20 1940-April 23 1949)",
            "title": "The Notable Art Collection Belonging to the estate of the late Joseph Brummer",
            "citationremarks": null,
            "publicationplace": "New York, NY",
            "publicationyear": 1940,
            "volumenumber": null,
            "format": "Auction/Dealer Catalogue",
            "publicationid": 2387,
            "publicationdate": "April 20 1940-April 23 1949",
            "volumetitle": null,
            "pagenumbers": "p. 45, no. 185."
        },
        {
            "citation": "George M. A. Hanfmann, <em>Greek Art and Life, An Exhibition Catalogue</em>, exh. cat., Fogg Art Museum (Cambridge, MA, 1950)",
            "title": "Greek Art and Life, An Exhibition Catalogue",
            "citationremarks": null,
            "publicationplace": "Cambridge, MA",
            "publicationyear": 1950,
            "volumenumber": null,
            "format": "Exhibition Catalogue",
            "publicationid": 2769,
            "publicationdate": "1950",
            "volumetitle": null,
            "pagenumbers": "no. 15."
        },
        {
            "citation": "Erika Zwierlein-Diehl, <em>Die Hydria: Formgeschichte und Verwendung im Kult des Altertums</em>, Verlag Philipp von Zabern (Mainz, 1964)",
            "title": "Die Hydria: Formgeschichte und Verwendung im Kult des Altertums",
            "citationremarks": null,
            "publicationplace": "Mainz",
            "publicationyear": 1964,
            "volumenumber": null,
            "format": "Book",
            "publicationid": 20049,
            "publicationdate": "1964",
            "volumetitle": null,
            "pagenumbers": "p. 35ff, 219, no. B147."
        },
        {
            "citation": "David Gordon Mitten and Suzannah F. Doeringer, <em>Master Bronzes from the Classical World</em>, exh. cat., Verlag Philipp von Zabern (Mainz am Rhein, Germany, 1967)",
            "title": "Master Bronzes from the Classical World",
            "citationremarks": null,
            "publicationplace": "Mainz am Rhein, Germany",
            "publicationyear": 1967,
            "volumenumber": null,
            "format": "Exhibition Catalogue",
            "publicationid": 7820,
            "publicationdate": "1967",
            "volumetitle": null,
            "pagenumbers": "p. 108, no. 108."
        },
        {
            "citation": "Walters Art Gallery, <em>Greek and Roman Metalware: A Loan Exhibition, February 14 - April 14, 1976</em>, exh. cat., Walters Art Gallery (Baltimore, MD, 1976)",
            "title": "Greek and Roman Metalware: A Loan Exhibition, February 14 - April 14, 1976",
            "citationremarks": null,
            "publicationplace": "Baltimore, MD",
            "publicationyear": 1976,
            "volumenumber": null,
            "format": "Exhibition Catalogue",
            "publicationid": 20127,
            "publicationdate": "1976",
            "volumetitle": null,
            "pagenumbers": "no. 18."
        },
        {
            "citation": "David Gordon Mitten and Amy Brauer, <em>Dialogue with Antiquity, The Curatorial Achievement of George M. A. Hanfmann</em>, exh. cat., Fogg Art Museum (Cambridge, MA, 1982)",
            "title": "Dialogue with Antiquity, The Curatorial Achievement of George M. A. Hanfmann",
            "citationremarks": null,
            "publicationplace": "Cambridge, MA",
            "publicationyear": 1982,
            "volumenumber": null,
            "format": "Exhibition Catalogue",
            "publicationid": 2422,
            "publicationdate": "1982",
            "volumetitle": null,
            "pagenumbers": "p. 14, no. 39."
        },
        {
            "citation": "Kristin A. Mortimer and William G. Klingelhofer, <em>Harvard University Art Museums: A Guide to the Collections</em>, Harvard University Art Museums and Abbeville Press (Cambridge and New York, 1986)",
            "title": "Harvard University Art Museums: A Guide to the Collections",
            "citationremarks": null,
            "publicationplace": "Cambridge and New York",
            "publicationyear": 1986,
            "volumenumber": null,
            "format": "Book",
            "publicationid": 9088,
            "publicationdate": "1986",
            "volumetitle": null,
            "pagenumbers": "p. 112, no. 125, ill."
        },
        {
            "citation": "Amy Sowder, \"Greek Bronze Hydriai\" (2009), Emory University",
            "title": "Greek Bronze Hydriai",
            "citationremarks": null,
            "publicationplace": null,
            "publicationyear": 2009,
            "volumenumber": null,
            "format": "Dissertation/Thesis",
            "publicationid": 20098,
            "publicationdate": "2009",
            "volumetitle": null,
            "pagenumbers": "(Ph.D. diss.), p. 189, 543, no. 16.21."
        },
        {
            "citation": "Susanne Ebbinghaus, \"Men of Bronze--Cups of Bronze: Bronze in the Iron Age\", <em>Ancient Bronzes through a Modern Lens: Introductory Essays on the Study of Ancient Mediterranean and Near Eastern Bronzes</em>, ed. Susanne Ebbinghaus, Harvard Art Museums (Cambridge, MA, 2014), 146-69",
            "title": "\"Men of Bronze--Cups of Bronze: Bronze in the Iron Age\"",
            "citationremarks": null,
            "publicationplace": "Cambridge, MA",
            "publicationyear": 2014,
            "volumenumber": "146-69",
            "format": "Article/Essay",
            "publicationid": 20753,
            "publicationdate": "2014",
            "volumetitle": "Ancient Bronzes through a Modern Lens: Introductory Essays on the Study of Ancient Mediterranean and Near Eastern Bronzes",
            "pagenumbers": "pp. 164-65, fig. 7.10."
        },
        {
            "citation": "Susanne Ebbinghaus, ed., <em>Ancient Bronzes through a Modern Lens: Introductory Essays on the Study of Ancient Mediterranean and Near Eastern Bronzes</em>, Harvard Art Museum/Yale University Press (Cambridge, MA, 2014)",
            "title": "Ancient Bronzes through a Modern Lens: Introductory Essays on the Study of Ancient Mediterranean and Near Eastern Bronzes",
            "citationremarks": null,
            "publicationplace": "Cambridge, MA",
            "publicationyear": 2014,
            "volumenumber": null,
            "format": "Book",
            "publicationid": 22172,
            "publicationdate": "2014",
            "volumetitle": null,
            "pagenumbers": "pp. 54, 60, 66, 76, 164-165, fig. 7.10"
        }
    ],
    "details": {
        "technical": [
            {
                "text": "XRF data from Artax 1\r\nAlloy: Bronze\r\nAlloying Elements: copper, tin\r\nOther Elements: lead, iron, arsenic\r\nComments: Silvering and possible gilding were detected on the decorative elements.\r\n \r\nK. Eremin, January 2014",
                "type": "Chemical Composition",
                "formattedtext": "<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'\">XRF data from <SPAN style=\"mso-no-proof: yes\">Artax 1</SPAN><?xml:namespace prefix = \"o\" ns = \"urn:schemas-microsoft-com:office:office\" /><o:p></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'\">Alloy: <SPAN style=\"mso-no-proof: yes\">Bronze</SPAN><o:p></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'\">Alloying Elements: <SPAN style=\"mso-no-proof: yes\">copper, tin</SPAN><o:p></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'\">Other Elements: lead, <SPAN style=\"mso-no-proof: yes\">iron, arsenic<o:p></o:p></SPAN></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-no-proof: yes; mso-ascii-theme-font: major-bidi; mso-hansi-theme-font: major-bidi; mso-bidi-theme-font: major-bidi\">Comments: Silvering and possible gilding were detected on the decorative elements.<o:p></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-theme-font: major-bidi; mso-bidi-theme-font: major-bidi\"><o:p>&nbsp;</o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt; LINE-HEIGHT: normal\"><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-theme-font: major-bidi; mso-bidi-theme-font: major-bidi\"><o:p></o:p></SPAN><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-fareast-font-family: 'Times New Roman'; mso-no-proof: yes\">K. Eremin, January 2014</SPAN></P>"
            },
            {
                "text": "The raised portion of the vessel is mostly covered with green and underlying red corrosion products, some in the form of deep-seated warts. However, about one-fourth of the surface is extremely well preserved, with bright metal showing through a thin brown oxide layer, especially at the rim and mouth. The handle and foot castings are more deeply corroded, and small losses show that the mineralization passes completely through the casting in these areas. Brown burial accretions are present on both the vessel and the attached castings. \r\n \r\nThe surface is well preserved in many areas but deeply corroded in others, with two holes (c. 2 x 3 cm) in the middle of the sides of the vessel. These are filled with a modern resin, visible as a large red blob at the interior. The interior otherwise shows a uniform layer of green corrosion products without the warts visible on the exterior. Portions of the thinner periphery of the cast handles are lost and one loss (1 x 3 cm) in the volutes at the edge of the center handle is restored with a resin. The two side handles have been reattached with a threaded rod secured by nuts at the interior.\r\n \r\nHammer marks are visible at the interior, especially at the mouth, and a deep centering punch mark (2 mm in diameter) at the bottom indicates the vessel was formed using a raising process. The handles and foot are cast, with finer details added by cold working using punches and a tracer tool. The castings each correspond perfectly to faint incised lines pre-dating the surface corrosion, which strongly suggests that they do in fact belong to this vessel. In a few areas, there is a vague correspondence in the corrosion products on the casting and the vessel, which further reinforces the match. Some lead residue at two spots point to the use of lead as the original means of attaching the castings. A gap between the cast foot and the vessel at its bottom, now filled with a modern resin, is the only area imperfectly matched. This is understandable as part of the original fabrication in this less visible location. The volute (3 mm in diameter) centers on either side of the center handle decoration, and the entire chest of the siren shows a thin wash of a white metal. This was analyzed by XRF and determined to be silver. Mercury was detected, but at such a low level that a mercury-silver amalgam process is not clearly indicated.\r\n \r\n \r\nHenry Lie (submitted 2008)",
                "type": "Technical Observations",
                "formattedtext": "<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><FONT size=3><FONT face=\"Times New Roman\">The raised portion of the vessel is mostly covered with green and underlying red corrosion products, some in the form of deep-seated warts. However, about one-fourth of the surface is extremely well preserved, with bright metal showing through a thin brown oxide layer, especially at the rim and mouth. The handle and foot castings are more deeply corroded, and small losses show that the mineralization passes completely through the casting in these areas. Brown burial accretions are present on both the vessel and the attached castings. <?xml:namespace prefix = \"o\" ns = \"urn:schemas-microsoft-com:office:office\" /><o:p></o:p></FONT></FONT></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><o:p><FONT size=3 face=\"Times New Roman\">&nbsp;</FONT></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><FONT size=3><FONT face=\"Times New Roman\">The surface is well preserved in many areas but deeply corroded in others, with two holes (c. 2 x 3 cm) in the middle of the sides of the vessel. These are filled with a modern resin, visible as a large red blob at the interior. The interior otherwise shows a uniform layer of green corrosion products without the warts visible on the exterior. Portions of the thinner periphery of the cast handles are lost and one loss (1 x 3 cm) in the volutes at the edge of the center handle is restored with a resin. The two side handles have been reattached with a threaded rod secured by nuts at the interior.<o:p></o:p></FONT></FONT></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><o:p><FONT size=3 face=\"Times New Roman\">&nbsp;</FONT></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><FONT size=3><FONT face=\"Times New Roman\">Hammer marks are visible at the interior, especially at the mouth, and a deep centering punch mark (2 mm in diameter) at the bottom indicates the vessel was formed using a raising process. The handles and foot are cast, with finer details added by cold working using punches and a tracer tool. The castings each correspond perfectly to faint incised lines pre-dating the surface corrosion, which strongly suggests that they do in fact belong to this vessel. In a few areas, there is a vague correspondence in the corrosion products on the casting and the vessel, which further reinforces the match. Some lead residue at two spots point to the use of lead as the original means of attaching the castings. A gap between the cast foot and the vessel at its bottom, now filled with a modern resin, is the only area imperfectly matched. This is understandable as part of the original fabrication in this less visible location. The volute (3 mm in diameter) centers on either side of the center handle decoration, and the entire chest of the siren shows a thin wash of a white metal. This was analyzed by XRF and determined to be silver. Mercury was detected, but at such a low level that a mercury-silver amalgam process is not clearly indicated.<o:p></o:p></FONT></FONT></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><o:p><FONT size=3 face=\"Times New Roman\">&nbsp;</FONT></o:p></SPAN></P>\r\n<P class=MsoNormal style=\"MARGIN: 0in 0in 3pt\"><SPAN style=\"mso-ascii-font-family: 'Times New Roman'; mso-ascii-theme-font: major-bidi; mso-hansi-font-family: 'Times New Roman'; mso-hansi-theme-font: major-bidi; mso-bidi-font-family: 'Times New Roman'; mso-bidi-theme-font: major-bidi\"><o:p><FONT size=3 face=\"Times New Roman\">&nbsp;</FONT></o:p></SPAN></P><SPAN style=\"FONT-SIZE: 12pt; FONT-FAMILY: 'Times New Roman','serif'; mso-ascii-theme-font: major-bidi; mso-hansi-theme-font: major-bidi; mso-bidi-theme-font: major-bidi; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-bidi-language: AR-SA; mso-ansi-language: EN-US; mso-fareast-language: EN-US\">Henry Lie (submitted 2008)</SPAN>"
            }
        ]
    },
    "terms": {
        "medium": [
            {
                "id": 2028222,
                "name": "Metal"
            },
            {
                "id": 2028223,
                "name": "bronze"
            },
            {
                "id": 2028401,
                "name": "silver"
            },
            {
                "id": 2028692,
                "name": "gold"
            },
            {
                "id": 2040148,
                "name": "copper alloy"
            }
        ],
        "place": [
            {
                "id": 2028220,
                "name": "Ancient & Byzantine World"
            },
            {
                "id": 2028226,
                "name": "Europe"
            },
            {
                "id": 2037477,
                "name": "Chalke"
            }
        ],
        "century": [
            {
                "id": 37525581,
                "name": "5th century BCE"
            }
        ],
        "culture": [
            {
                "id": 37527534,
                "name": "Greek"
            }
        ],
        "topic": [
            {
                "id": 2040173,
                "name": "Artstor Digital Library"
            },
            {
                "id": 2040174,
                "name": "Google Art Project"
            }
        ]
    },
    "title": "Hydria (water jar) with Siren Attachment",
    "titles": [
        {
            "title": "Hydria (water jar) with Siren Attachment",
            "titletype": "Title",
            "displayorder": 1,
            "titleid": 753004
        }
    ],
    "worktypes": [
        {
            "worktypeid": "387",
            "worktype": "vessel"
        }
    ],
    "seeAlso": [
        {
            "id": "https://iiif.harvardartmuseums.org/manifests/object/304069",
            "type": "IIIF Manifest",
            "format": "application/json",
            "profile": "http://iiif.io/api/presentation/2/context.json"
        }
    ]
}
```

### [Galleries](link)
Contains information on physical spaces within the museums’ building at 32 Quincy Street, Cambridge, MA. (Not applicable.)

## Wikidata
Could be used for supplementary information.

Note: ArtIC has [videos](https://api.artic.edu/docs/#videos) but I wasn't able to query any... Is this an issue on my part or is everyone else experiencing this, too?

## Conclusion
