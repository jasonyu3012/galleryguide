# Motivation
We wanted to create GalleryGuide so that art entusiasts could easily learn about, and locate, interesting pieces of art and their artists.

---
# User Stories

## Developer Stories
- Design and document RESTful API using Postman
    - Developer says: GalleryGuide.me will eventually have collected a mountain of information on our 3 models: artists, artworks, and galleries. We would like to provide a way for users and developers to have access to this data. We will design and document a proposed API that can be reached at galleryguide.me/api
    - Development team designed an API and used the built-in documentation tooling of Postman to publish [the documentation](https://documenter.getpostman.com/view/18824630/2s93CExHF3). More information can be found in the API section of this report.

**TOOD**: Need five of these
## Customer Stories
- Sorting by Artist's Home Country
    - Customer says: As a business owner, it would be useful to be able to sort artists by their home cities or countries. This way I could easily feature several artists from the same place. Or I could find out if artists from the same area make similar art.
    - Marked issue as Phase 3 milestone
- Sorting by material or style
    - Customer says: Art Style:
    It would be nice to be able to sort on art style as well since it could be used as inspiration for artists wanting to break into or see certain styles of brushing or paint material like acryllic.
    - Marked issue as Phase 3 milestone
- Adding artists who have collaborated together as a connection
    - Customer says: As a business owner, I love learning more about the ways in which different artists interacted with one another and displaying that information through collaborated art pieces. I would love it if there could be a connection between different artists who have collaborated together. It would make for a great attribute.
    - While this could potentially be feasible, informed the customer that we had not incorporated an API with this data in the propsal, so it is out of scope.
- Copyright Info
    - Customer says: As a business owner, I take copyright very seriously, and don't want to accidentally break any laws. It would be helpful for my purposes to include the copyright status of an artwork on its instance page. Additionally, it would help to make this a sortable label in a search.
    - Informed the customer that this feature would be prioritized for implementation in Phase 1.
---
# RESTful API

Link: https://documenter.getpostman.com/view/18824630/2s93CExHF3
**TODO**: Not really sure how much we can say about this. I just kinda did the bare minimum

---
# Models
Following is the data, and sources, of our first three instances of each model
## Galleries/Museums
### Art Institute of Chicago
#### Scrapable from Artsy
- description: The Art Institute of Chicago is the second largest art museum in the USA housing a world-renowned encyclopedic collection.
- region: North America
- _links:
    - profile:
        - thumbnail: https://d32dm0rphc51dk.cloudfront.net/10igV4wzNgS2Vwm7uYxxmg/square.jpg
        - image: different versions of thumbnail according to image_version
        - cover_image: link to artsy api endpoint with image of building
    - website: http://www.artic.edu/

- Location scraped from google?

### MET Museum
- Artsy doesn't have search for partners(galleries), but you can try to query by slug(well known name). I couldnt find anything for 'met', 'met-museum' 'metropolitan-museum-of-art', so it may not be affiliated with Artsy, but it could also be that I am not looking for it with the correct phrase.
- Could similarly get location and map from google maps api.
#### From Wikipedia
- https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art

### National Gallery of Art
#### Info scrapable from Artsy
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

## Artists
### Grant Wood
#### Info Scrapable from ARTIC API
- title: Grant Wood
- alt_titles: ["Grant DeVolson Wood", "格兰特·伍德"]
- birth_date: 1891
- death_date: 1942
- description: "<p>Grant Wood is known for his stylized and subtly humorous scenes of rural people, Iowa cornfields, and mythic subjects from American history—such as the Art Institute’s iconic painting <a href=\"https://www.artic.edu/artworks/6565/american-gothic\" target=\"_blank\"><em>American Gothic</em></a> (1930). Along with other Midwestern Regionalist painters like <a href=\"https://www.artic.edu/artists/40511\" target=\"_blank\">John Steuart Curry</a> and <a href=\"https://www.artic.edu/artists/2137\" target=\"_blank\">Thomas Hart Benton</a>, Wood advocated for a realistic style and recognizable subjects that showed local places and common people, a radically different approach from European modernism and its push toward abstraction. </p><p>Living most of his life in Cedar Rapids, Iowa, Wood studied metalsmithing with Arts and Crafts movement designer Ernest A. Batchelder before moving to Chicago in 1913. There he worked at <a href=\"https://www.artic.edu/artists/35185\" target=\"_blank\">Kalo Silversmiths Shop</a> while taking fine arts classes in the evenings at the School of the Art Institute of Chicago. Inspired by the Northern Renaissance art he saw on a trip to Munich, Germany in 1928, Wood shifted from the free, impressionistic style evident in the Art Institute’s </p><p><a href=\"https://www.artic.edu/artworks/156075/loch-vale\" target=\"_blank\"><em>Loch Vale</em></a><em> </em>(1927) to the highly detailed, tightly painted forms that characterize <em>American Gothic</em>. Exhibited publicly for the first time at the Art Institute in 1930, <em>American Gothic</em> won Wood a $300 prize and instant fame. </p><p>Wood galvanized his success by co-founding the Stone City Colony and Art School in Iowa and also teaching in the art department at the University of Iowa, heralding the message of Regionalism in the face of a move towards increasing abstraction in American art. His later works continued to celebrate, and sometimes satirize, Midwestern values and people. The iconic imagery he created in <em>American Gothic </em>and subsequent works has been adapted and parodied regularly, serving as a reflection of changing American values and ways.</p>"
#### Other Info
- Maybe would could find a way to scrape a picture? He has self-portraits and there are photos, there is just no link in ARTIC API directly to these

### Vincent van Gogh
- artistDisplayName: Vincent van Gogh
- artistNationality: Dutch
- artistBeginDate: 1853
- artistEndDate: 1890

### Mary Cassat
#### Info Scrapable from Artsy
- name: Mary Cassatt
- biography: One of only three women -- and the only American, woman or man -- invited to exhibit with the Impressionists in Paris, Cassatt spent the majority of her career abroad. In addition to producing her distinctive images of women and children, Cassatt also served as an advisor to important American collectors including Henry and Louisine Havemeyer, whose collection became a cornerstone of New York's Metropolitan Museum of Art. The Philadelphia-born Cassatt studied at the Pennsylvania Academy of the Fine Arts before setting off for Europe, where she eventually became a friend and colleague of Edgar Degas. Widely recognized on both sides of the Atlantic and considered one of the greatest living artists of her time, Cassatt was viewed as a truly \"modern\" woman, and she lent her efforts to help American women earn the right to vote. \nCassatt produced her characteristic figurative works in oil and pastel, and was also a highly accomplished printmaker and etcher. She owned a collection of Japanese prints, and the harmonious colors and flattened forms that characterize her style indicate the influence of Japonisme upon her work. She frequently employed friends and family members as her subjects, and the ensuing works explore themes of family, femininity, and daily life.
- birthday: 1844
- deathday: 1926
- hometown: Philadelphia, PA, USA
- location: Paris, France (not sure what this is the location of)
- nationality: American

## Artworks
### American Gothic
#### Info Scrapable from ARTIC API
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

### Wheat Field with Cypresses
#### Info Scrapable from MET Museum API
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

### Little Girl In a Blue Armchair
#### Info Scrapable from Artsy
- title: Little Girl In a Blue Armchair
- category: Painting
- medium: Oil on canvas
- date: 1878
- _links
    - thumbnail: https://d32dm0rphc51dk.cloudfront.net/SZE_u5S28g7l96EvNvEUsA/medium.jpg
    - image: allows getting images according to image_version

---
# Tools
---
## Postman
A Postman team workspace was set up to test the functionality of our chosen APIs. A collection was made for each API and in each collection can be found HTTP requests to unique endpoints of that API. Some of these requests rely on an authentication token. In those cases, the request must be made from the "Standard" environment, which stores those tokens as variables.

Documentation of the proposed API for GalleryGuide was also created using the Postman documentation features.
## Flask
Our page is served by a Python Flask application. In order to serve a single-page application (SAP), we needed to configure a Flask route that served the same static page if the user requested a route that did not need be served in any special manner.
## Gunicorn
Since Flask is a Python application, it uses WSGI. In order to deliver requests to our Flask app, we setup Gunicorn to handle the conversion from HTTP/S to WSGI.
**TODO**
## Nginx
Finally, we use Nginx as a reverse-proxy that handles HTTP/S requests and forwards them to Gunicorn. **TODO**

---
# Hosting
We decided to use [AWS EC2](https://aws.amazon.com/ec2/) to host our website. We decided to use EC2 because it will eventually allow us to serve our website and API from the same machine. Additionally, having an EC2 instance will give us extra flexibility when deploying.
## Setup
For our EC2 Instance, we decided to use an Amazon Machine Image running Ubuntu 22.04, t2.micro instance type, with default storage.

As for our security groups, we configured 3:

Note that all of these are using TCP protocol and allow all source connections (0.0.0.0/0)
- SSH on port 20
- HTTPS on 443
- HTTP on 80

Also, during this step, a key pair is created. For my Windows system WSL2, the private key must be moved / copied from the mounted Windows drive to ~/.ssh using 

`cp /mnt/<Windows Drive Letter>/<path>/<privatekey.pem> ~/.ssh`

Another thing you might have to do if you're on WSL like me is to change the permissions of the `.pem` file in case it's too open. When that happens, you'll get this when you try to ssh into your instance.

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions <permission> for '/path/.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
```

If that's the case, then:

`chmod 600 ~/.ssh/<name_of_pem>`

This makes it so that it is only read-writable by you.

You can also do `chmod 400` instead, which makes it only readable by you (thus blocking your write access). 600 is typically better in most cases.

[More information with ssh'ing into your instance using WSL can be found here.](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide//WSL.html)

>Another note: Amazon doesn't grant root access to EC2 instances by default (for seecurity purposes). Use the sudo command to obtain elevated privileges

Next, start your EC2 Instance and grab the IPv4 Address from the running instance.

---
### Adding DNS Records using Route53
---

> Route53 is Amazon's Domain Naming System (DNS) webservice

1. Create a hosted zone. A hosted zone is simply a container that holds information about how you want to route traffic for a domain.
2. Quick create an Apex Record with `www.<yourdomainname>` and set the value (what it points to) to the IP Address of your instance.
   
> Note that: A Records: A records map a domain name to an IPv4 address. When a client requests a website, the DNS resolver looks up the A record for the domain name, and returns the associated IP address to the client. The client then uses the IP address to access the website.
> 
> CNAME Records: CNAME records map a domain name to another domain name, instead of an IP address. When a client requests a website, the DNS resolver looks up the CNAME record for the domain name and returns the associated domain name. The resolver then repeats the process for the new domain name, until it finds the A record that maps the domain name to an IP address. The client uses the IP address to access the website.

3. Create another `A` alias record for just your `<domainname>` and set your alias target to your `www.<yourdomainname>` so that both records will hit the same target when entered in a web browser.

---

### Configuring your name servers if you purchased your domain from else where. 
---

If you bought your domain from a third party domain registrar and want yo use Route53 to manage your DNS for your domain, then you have to change the nameservers for your domain to the ones provided by Route53.

1. Copy the NS record values from your hosted zone for your domain. For Route53, these usually look something like

```
ns-592.awsdns-18.net.
ns-1532.awsdns-34.org.
ns-1237.awsdns-42.co.uk.
ns-48.awsdns-89.com.
```
2. Go to your domain registar, and under Nameservers or DNS management, or something similar, and replace whatever nameservers already present with the ones from your hosted zone.
3. Note that changes can take 24 - 48 hours to propagate.

> After this, you should be able to ssh into your instance by using 
> 
> `ss -i ~/.ssh/<pem_file> <user>@<domain_name>`
> and in our case it would be
>
> `ss -i ~/.ssh/<pem_file> ubuntu@galleryguide.me`


