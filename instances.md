# Galleries/Museums
## Art Institute of Chicago
### Scrapable from Artsy
- description: The Art Institute of Chicago is the second largest art museum in the USA housing a world-renowned encyclopedic collection.
- region: North America
- _links:
    - profile:
        - thumbnail: https://d32dm0rphc51dk.cloudfront.net/10igV4wzNgS2Vwm7uYxxmg/square.jpg
        - image: different versions of thumbnail according to image_version
        - cover_image: link to artsy api endpoint with image of building
    - website: http://www.artic.edu/

- Location scraped from google?

## MET Museum
- Artsy doesn't have search for partners(galleries), but it you can try to query by slug(well known name). I couldnt find anything for 'met', 'met-museum' 'metropolitan-museum-of-art', so it may not be affiliated with Artsy, but it could also be that I am not looking for it with the correct phrase.
- Could similarly get location and map from google maps api.
### From Wikipedia
- https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art

## National Gallery of Art
### Info scrapable from Artsy
- name: National Gallery of Art, Washington, D.C.
- email:    (nothing for this instance, but could be present and useful for smaller galleries)
- _links.profile
    - id: 5159dac69a608324390001e5
    - description: The National Gallery of Art preserves, collects, exhibits, and fosters understanding of works of art at the highest possible museum and scholarly standards.
    - image_versions: [...]
    - _links.thumbnail: https://d32dm0rphc51dk.cloudfront.net/YFzRuHBJA6lpANqDum6oCw/square.jpg
    - _links.image: same as thumbnail, but can be sized according to image_versions
    - website: http://www.nga.gov/
    - cover_image: api endpoint for another image of the buidling

---
# Artists
## Grant Wood
### Info Scrapable from ARTIC API
- title: Grant Wood
- alt_titles: ["Grant DeVolson Wood", "格兰特·伍德"]
- birth_date: 1891
- death_date: 1942
- description: "<p>Grant Wood is known for his stylized and subtly humorous scenes of rural people, Iowa cornfields, and mythic subjects from American history—such as the Art Institute’s iconic painting <a href=\"https://www.artic.edu/artworks/6565/american-gothic\" target=\"_blank\"><em>American Gothic</em></a> (1930). Along with other Midwestern Regionalist painters like <a href=\"https://www.artic.edu/artists/40511\" target=\"_blank\">John Steuart Curry</a> and <a href=\"https://www.artic.edu/artists/2137\" target=\"_blank\">Thomas Hart Benton</a>, Wood advocated for a realistic style and recognizable subjects that showed local places and common people, a radically different approach from European modernism and its push toward abstraction. </p><p>Living most of his life in Cedar Rapids, Iowa, Wood studied metalsmithing with Arts and Crafts movement designer Ernest A. Batchelder before moving to Chicago in 1913. There he worked at <a href=\"https://www.artic.edu/artists/35185\" target=\"_blank\">Kalo Silversmiths Shop</a> while taking fine arts classes in the evenings at the School of the Art Institute of Chicago. Inspired by the Northern Renaissance art he saw on a trip to Munich, Germany in 1928, Wood shifted from the free, impressionistic style evident in the Art Institute’s </p><p><a href=\"https://www.artic.edu/artworks/156075/loch-vale\" target=\"_blank\"><em>Loch Vale</em></a><em> </em>(1927) to the highly detailed, tightly painted forms that characterize <em>American Gothic</em>. Exhibited publicly for the first time at the Art Institute in 1930, <em>American Gothic</em> won Wood a $300 prize and instant fame. </p><p>Wood galvanized his success by co-founding the Stone City Colony and Art School in Iowa and also teaching in the art department at the University of Iowa, heralding the message of Regionalism in the face of a move towards increasing abstraction in American art. His later works continued to celebrate, and sometimes satirize, Midwestern values and people. The iconic imagery he created in <em>American Gothic </em>and subsequent works has been adapted and parodied regularly, serving as a reflection of changing American values and ways.</p>"
### Other Info
- Maybe would could find a way to scrape a picture? He has self-portraits and there are photos, there is just no link in ARTIC API directly to these

## Vincent van Gogh
- artistDisplayName: Vincent van Gogh
- artistNationality: Dutch
- artistBeginDate: 1853
- artistEndDate: 1890

## Mary Cassat
### Info Scrapable from Artsy
- name: Mary Cassatt
- biography: One of only three women -- and the only American, woman or man -- invited to exhibit with the Impressionists in Paris, Cassatt spent the majority of her career abroad. In addition to producing her distinctive images of women and children, Cassatt also served as an advisor to important American collectors including Henry and Louisine Havemeyer, whose collection became a cornerstone of New York's Metropolitan Museum of Art. The Philadelphia-born Cassatt studied at the Pennsylvania Academy of the Fine Arts before setting off for Europe, where she eventually became a friend and colleague of Edgar Degas. Widely recognized on both sides of the Atlantic and considered one of the greatest living artists of her time, Cassatt was viewed as a truly \"modern\" woman, and she lent her efforts to help American women earn the right to vote. \nCassatt produced her characteristic figurative works in oil and pastel, and was also a highly accomplished printmaker and etcher. She owned a collection of Japanese prints, and the harmonious colors and flattened forms that characterize her style indicate the influence of Japonisme upon her work. She frequently employed friends and family members as her subjects, and the ensuing works explore themes of family, femininity, and daily life.
- birthday: 1844
- deathday: 1926
- hometown: Philadelphia, PA, USA
- location: Paris, France (not sure what this is the location of)
- nationality: American
---
# Artworks
## American Gothic
### Info Scrapable from ARTIC API
- thumnail.alt_text: "Painting of a woman and an older white man holding a pitchfork, both seen from the waist up. They stand side by side with stern expressions, in front of a white house with a peaked roof."
- is_on_view: true;
- gallery_title: Gallery 263 (link to ARTIC museum)
- artist_id: 37343 (links to agent object in ARTIC API)
- artist_title: Grant Wood
- artwork_type_title: Painting
- style_title: Realism
- style_titles: [Realism, Modernism]
- image_id: b272df73-a965-ac37-4172-be4e99483637 (link to picture)
- date_start: 1930
- date_end: 1930
- medium_display: Oil on Beaver Board

## Wheat Field with Cypresses
### Info Scrapable from MET Museum API
- objectID: 436535 (can be used to query if it is on display, maybe if there is no gallery number) 
- title: Wheat Field with Cypresses
- primaryImage: https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg
- primaryImageSmall: https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg
- More image links
- objectName: Painting
- artistDisplayName: Vincent van Gogh
- artistWikidata_URL: https://www.wikidata.org/wiki/Q5582
- objectBeginDate: 1889
- objectEndDate: 1889
- medium: Oil on canvas
- objectWikidata_url: https://www.wikidata.org/wiki/Q18689458
- GalleryNumber: 822

## Little Girl In a Blue Armchair
### Info Scrapable from Artsy
- title: Little Girl In a Blue Armchair
- category: Painting
- medium: Oil on canvas
- date: 1878
- _links
    - thumbnail: https://d32dm0rphc51dk.cloudfront.net/SZE_u5S28g7l96EvNvEUsA/medium.jpg
    - image: allows getting images according to image_version