---
title: 'Developer interviews: John Braningan from Azavea'
tags:
- cartodb
- webinar
- visual data discovery
- analytics
categories:
- 'Marketplace'
tech_newsletter: true
---

<div class="wrap"><p class="wrap-border"><img src="http://i.imgur.com/IttBnBL.png" alt=""></p></div>


After the great reception at FOSS4G where we presented our [CartoDB Developers Program](http://cartodb.com/marketplace) we want to show developers and companies what it entails to develop on top of the [CartoDB Platform](http://docs.cartodb.com/) and why its the best place to develop and commercialize geospatial products. And what better way to do it that having developers who are already using CartoDB to make business explain their experience using CartoDB. 

For this first post, welcome [John Branigan](http://twitter.com/johnbranigan) from [Azavea](http://www.azavea.com/). Azavea is a CartoDB [partner](http://www.cartodb.com/partners) specialized in the creation of geographic web and mobile software, as well as geospatial analysis services to enhance decision-making. John has over 13 years experience working in geographic information systems, database design and analysis, web development and design, and has focused for the last two years on managing large scale web application development projects. 

<div class="wrap"><p class="wrap-border"><img src="http://i.imgur.com/tEEsXP0.jpg" alt=""></p></div>

### What are your CartoDB powered projects?

- **[Visualization of oil producing countries](http://sandbox.azavea.com/cartodbvisualization/)** This was a proof-of-concept, and was my first experience using CartoDB (2012)
- **[Philadelphia election results](http://www.fels.upenn.edu/voter-map)** (2013)
- **Maplight**: [Vote Map](http://maplight.org/us-congress/bill/113-hr-4413/4392363/vote-map), a map for every bill in Congress, and [Legislator Contributions](http://maplight.org/us-congress/legislator/155-john-a-boehner/contributions-map), one for every legislator
- **Citizen Science Inventory**: A browsable inventory of citizen science projects, in development for Woodrow Wilson Center for Scholars (2014)
- **Community Disadvantage Index**: Provides an index of social disadvantage, in development for Department of Justice (2014)
- Several pending contracts, and personal apps, too.


### Why did you choose CartoDB for your geospatial projects?

Initially, it was a recommendation from a colleague. I’ve been working with JavaScript mapping libraries since around 2006, and was always hosting my own data in one form or another. Now I rely on CartoDB to handle the data storage and pull it into my applications via the API. The flexibility of pulling tiles that are pre-rendered and designed or pulling GeoJSON and working with it client-side is really great.


### What other geospatial technologies do you use, and how does them compare to the CartoDB Platform?

I started working in GIS in an ESRI shop, so all of the Arc software is my background. I am comfortable with their desktop software as well as the web services and web servers. Today, I pretty much use QGIS, PostGIS, TileMill, and CartoDB.

So one potential workflow for a project would be to load my spatial data initially into a local PostGIS database. I do this because SQL is one of my preferred methods of understanding a dataset (sometimes I go straight to CartoDB). I can load this directly into QGIS for basic visualization. If there are auxiliary attribute tables, I can ask questions in PostGIS to discover interesting trends and relationships among the data. I may or may not use TileMill to play with cartographic styling - the CartoCSS can be directly transferred to CartoDB, which is great. All of the aforementioned tools are available even without an internet connection, which can be convenient. 

Once my data is prepped, and the story I want to tell is structured, I load the data into CartoDB and configure everything to be ready to share. Then it’s either published directly from CartoDB, or more likely, incorporated into a web application using the CartoDB.js or Leaflet.js library. 

<div class="wrap"><p class="wrap-border"><img src="http://i.imgur.com/71NDm0p.png" alt=""></p></div>


### What, as a developer, is what you value most about CartoDB?

Having the option to use CartoDB as a PostGIS-enabled data store is incredibly valuable. Spinning up and maintaining my own database server is unnecessary now, and this accelerates project development cycles significantly. I’m also relying quite a bit on the APIs for pulling data into my apps.

### If you would have to explain to a fellow dev what are CartoDB's 3 best things, what would they be? 

A hosted, open source, spatial database. Save (at least) days of DevOps.

CartoDB.js - This is a great way to integrate data stored on CartoDB with a lightweight JS mapping library. Leaflet has been my go-to for years, and CartoDB.js provides a lot of freebies in the way it can load preconfigured visualizations in just a few lines, and wrap API requests in predefined functions.

CartoCSS and styling wizards - I’ve spent a lot of time doing cartography in desktop software. My maps look better more quickly using CartoDB - especially with the different styles available in the interface (and Torque!). I also love how the CartoCSS gets updated - I usually will set things up close to how I want them, then tweak the CSS until it’s just right. 

<hr>

We thank John and Azavea for taking the time to share their experience with CartoDB. If you are interested in creating geospatial products using the CartoDB Platform, take a look at this intro presentation: [CartoDB for Developers](http://cartodb.com/webinars/2014-07-23-cartodb-for-developers.html).

If you are already developing geospatial products using CartoDB, take a look at our [Developers Program](http://cartodb.com/marketplace). Stay tuned for more developer interviews. And if you want to share your experience, write to stories@cartodb.com



