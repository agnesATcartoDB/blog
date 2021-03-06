---
title: 'Map of the Week: Private Contributions in Argentinian Elections'
date: '2014-04-29T10:00:50+02:00'
tags:
- argentina
- elections
- how-to
categories:
- 'Map of the week'
redirect_from:
- "/post/84208848560/map-of-the-week-private-contributions-in-argentinian/"
---

Welcome Andy Tow for this new Map of the Week. Andy is an adviser in the Argentinian Senate, and blogs relentlessly about elections and politics with a focus on quantitative information and analysis. In this map he shows extensive information about the private contributions in the 2013 primary legislative elections.

<a href="http://andytow.cartodb.com/viz/cc3abe0a-c57b-11e3-b67f-0e10bcd91c2b/public_map">Check out the map</a>, and read how it was done:

This map depicts private contributions at the Argentine primary legislative elections of 2013. The original data was taken from the Cámara Nacional Electoral (national electoral court) <a href="http://www.electoral.gov.ar">http://www.electoral.gov.ar</a>, which published in Excel Online.

<img src="http://i.imgur.com/aHj89YC.png" alt=""/>

As the original data came with a name and address for each private contribution, I geocoded it. Then I created a CartoDB table with fields from the original data merged with a national party aggregation, the geocoded lat/lon and formatted address.

<img src="http://i.imgur.com/p75Ysle.png" alt=""/>

I created a CartoDB visualization based in a custom basemap taken from a Mapbox customization by the Mozilla Foundation, with four layers from the above table, using a Custom SQL query SELECT * FROM" WHERE " for each party aggregation.

<img src="http://i.imgur.com/2uh2joM.png" alt=""/>

In the CartoDB Wizard, I chose bubble using the amount of money for each contributor field, with Jenks quantification, a min-max radius of 5 to 30, a bubble fill from a color palette for party aggregations I used in my Electoral Hack 2013 <a href="http://elecciones.andytow.com">http://elecciones.andytow.com</a>, and a white stroke of 1.5.

<img src="http://i.imgur.com/73oVZAn.png" alt=""/>

In the CartoCSS editor, I copied the same series of marker widths for each layer, for scale normalization. I also gave all the layers the same bubble parameters, except for the color, used to identify party aggregation.

<img src="http://i.imgur.com/Y8wchrC.png" alt=""/>

I cleared all legends except for one, which I entirely customized in HTML, using a .png with bubble size for all party aggregations, with a scale. In the infowindow I put the district party name, the district name, the name of the contributor and the amount given.

<img src="http://i.imgur.com/2P55XOx.png" alt=""/>

Finally I added a link for each contributor to an external site which returns tax registration from an official tax ID which was also in the original data.

<img src="http://i.imgur.com/Rd7ZTWq.png" alt=""/>

Start creating maps like this today, <a href="http://www.cartodb.com">sign up for a free trial</a>.
