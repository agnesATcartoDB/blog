---
title: 'Liam Densley, Geoplex: CartoDB is a very attractive solution for our clients who have little to no exposure of GIS'
tags:
- cartodb
- analytics
- developer interviews
categories:
- 'Marketplace'
tech_newsletter: true
---

<div class="wrap"><p class="wrap-border"><img src="http://i.imgur.com/EvOQeIH.jpg" alt=""></p></div>


Second installment of our [Developer Interview](/tagged/developer%20interviews/) series. How are developers using CartoDB to develop geospatial applications? They tell you. Today we welcome [Liam Densley](http://www.twitter.com/stringbig). Liam is a Data Analyst at [Geoplex](http://geoplex.com.au/), a company based out in Sydney creating some advanced projects with CartoDB. 

<!--more-->

### What are your CartoDB powered projects?

* [TripRisk](http://cartodb.com/case-studies/trip-risk/) - Public facing website presenting road crashes and their characteristics
* [REA](http://cartodb.com/case-studies/rea-group/) - Public facing website that reports housing market information such as, property listings,  average house prices, sale counts, historic trends...
* [CrashStats](http://crash-stats.azurewebsites.net/) - Website used for road trauma article in national newspaper.

We've also used CartoDB on a series of non public projects including traffic data visualization and analysis, a system which the delivery of vector data to mobile field devices, visualisation of demographic data in the education sector and tracking vehicle sensor activity in near real time.


### Why did you choose CartoDB for your geospatial projects?

In general we choose CartoDB for the following factors:

* Quick to setup and produce visualizations
* Cost effective for small to medium scale projects
* SQL API and PostGIS meets spatial analysis requirements in the browser
* Subscription model easy to understand
* Cloud ready

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='https://geoplexmaps.cartodb.com/u/geoplex/viz/97a3b836-bbb2-11e3-83d6-0e230854a1cb/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

### What other geospatial technologies do you use, and how do they compare to the CartoDB Platform?

We use a broad spectrum of geospatial technologies including desktop packages such as ArcMap, QGIS, Mapinfo, and server products like ArcGIS Server and GeoServer.  Additionally, we use Postgres/Postgis extensively, and open source libraries such as GDAL/OGR.  

Currently we still use desktop products for large data volume processing and the more complicated analysis workflows. CartoDB fills the data server/visualization space on web delivery projects.  We tend to use CartoDB to support online transactional spatial operations on the web, but still use PostGIS locally for the high volume data processing if required.

CartoDB is a very attractive solution for our clients who have little to no exposure of GIS or spatial data and analysis. It's also useful for those organisations who are still heavily desktop focussed yet have a need to quickly and easily share their work with the public or a wider audience. CartoDB is not as fully featured as other larger GIS servers, such as ArcGIS Server, however the financial investment is significantly less. 

In those organisations which have a mature capability and need we're still seeing adoption of the larger traditional GIS technology, in our view solutions such as ArcGIS are still compelling when you need a high level of frictionless integration, but this space is rapidly changing. Rapid development of tools like QGIS and Mapbox's Studio are gradually eroding this difference.


### What, as a developer, do you value most about CartoDB?

* Ability to use a PostGIS backend for spatial DB transactions accessible via a simple API.
* Dynamic fast server side rendering of spatial data as tiles.
* Cloud based subscription model makes it easy to get things off the ground without expensive outlay of hardware/software in house
* Simplicity
* [SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html) Performance
* Web console for admin tasks
* Examples and documentation on website
* Regular feature updates (e.g. clustering)

### If you would have to explain to a fellow dev what CartoDB's 3 best things are, what would they be?

* SQL API, PostGIS accessible via a simple REST based API
* Dynamic rendering capabilities of map tiles using CartoCSS
* Freedom to integrate into client side javascript map framework e.g. Leaflet or Google Maps

<hr>

We thank Liam and Geoplex for taking the time to share their experiences. If you are a geospatial developer interested in a modern platform to develop on, take a look at this intro presentation: [CartoDB for Developers](http://cartodb.com/webinars/2014-07-23-cartodb-for-developers.html).

If you are already developing geospatial products using CartoDB, take a look at our [Developers Program](http://cartodb.com/marketplace), and stay tuned for more developer interviews. And if you'd like to share your experiences, please write to stories@cartodb.com.



