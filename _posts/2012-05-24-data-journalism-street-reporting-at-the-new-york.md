---
title: Data journalism & street reporting at The New York World
date: '2012-05-24T01:02:00+02:00'
tags:
- The New York World
- Columbia Journalism School
- Michael Keller
- Data Journalism
categories:
- 'Customer stories'
redirect_from:
- "/post/23634690189/data-journalism-street-reporting-at-the-new-york/"
---

Which are the blocks in New York City that had the most New York Police Department stops in 2011? 

Columbia Journalism School's <a href="http://www.thenewyorkworld.com/">The New York World</a> has published this week a nice feature combining data journalism and street reporting that offers a new insight on this issue. 

Here you can read the piece by Alice Brennan: <a href="http://www.thenewyorkworld.com/2012/05/18/nypd-stop-frisk-hotspots">The NYPD’s hottest stop-and-frisk spots</a>. And this is the <a href="http://thenewyorkworld.com/public/2012/may/nyw-hotspots-map/index.php">interactive map</a>, using CartoDB. It shows the number of incidents recorded for every block in NYC throughout 2011.

<a href="http://thenewyorkworld.com/public/2012/may/nyw-hotspots-map/index.php" target="_blank"><img src="http://cartodb.s3.amazonaws.com/tumblr/posts/stop.png"/></a>

We emailed the team behind the project to gather info about their work and the use of CartoDB for data journalism. 

One of the goals was to show the analysis of the data alongside personal interviews of people living in hotspots or involved in any New York Police Department stop, says data journalist <a href="http://mhkeller.com/">Michael Keller</a>.

Reporter Alice Brennan and Keller worked together to clean the data. Brian Abelson, a graduate student at Columbia University's applied statistics program Quantitative Methods for the Social Sciences, helped to identify the hotspots.

Keller also worked on the map code &#8212; at the bottom of the map there's the full list of contributors, including Mike Sullivan, deputy editor at The New York World, who worked on the map and the interface.  

The Spanish elections map from CartoDB, available <a href="https://github.com/Vizzuality/eleccionesandaluzas">here</a>, was used as a template for the mouseovers. To mashup the stop-and-frisk counts with the census blocks data, Keller did a ST_Intersects query. You can check <a href="http://www.postgis.org/documentation/manual-svn/ST_Intersects.htm">here</a> for the PostGIS documentation about this function. 

The data is fetched from CartoDB through the SQL API and displayed using <a href="https://github.com/Vizzuality/cartodb-leaflet">CartoDB library for Leaflet</a>. 

The resulting map shows 685,724 stops throughout the city and allows users to visually browse all the data. Hovering over each block reveals the number of stops that took place there. The top 50 hotspots are highlighted in pink with the top six hotspot blocks listed on the left by their general location. Clicking on each of the top six will show the number of arrests for that block along with the number of stops.

Personal stories and reporting give a new, compelling perspective of the data. We love the approach. Great work!
