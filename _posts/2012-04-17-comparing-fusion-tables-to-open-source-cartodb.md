---
title: Comparing Fusion Tables to Open Source CartoDB
date: '2012-04-17T13:40:00+02:00'
tags:
- Fusion Tables
- cartodb
- open source
categories:
- 'How-to guides'
redirect_from:
- "/post/21264086445/comparing-fusion-tables-to-open-source-cartodb/"
---

It is not a secret that one of the reasons we created CartoDB was the lack of alternatives for geospatial data visualizations. For several years we developed our own custom solutions to visualize large amounts of dynamic data, or to develop location aware applications. Many geospatial applications run on top of the fantastic <a href="http://postgis.refractions.net/">PostgreSQL/PostGIS</a> database, but most of the software built to use them on the web end up being slow or don't access the full potential of PostGIS. Also, a lot of them are proprietary and include very tough terms of service. We wanted to create a software that would explode the possibilities of PostGIS while keeping it Open Source, scalable, customizable and leaving you the owner of your own data.

<iframe frameborder="0" height="300" src="http://cartodb.s3.amazonaws.com/FusionTables-vs-CartoDB/roads.html" width="639"></iframe>

So, one of the most common questions we get on conferences is: How does CartoDB compare to <a href="http://www.google.com/fusiontables/Home/">Fusion Tables</a>. Today, we want to write about the comparisons and show you some examples. We will try to be as fact based as we can, but if you find any questionable items please let us know.

### How are Fusion Tables and CartoDB similar

Both projects allow users to upload geospatial data and then use that data to create visualizations. If the data changes in the table, the maps automatically update on the website where they have been embedded. This is really powerful. Additionally, both products allow you to programmatically access data via a set of APIs.

### How are Fusion Tables and CartoDB different

There is a lot to be said based on different licenses and different terms of use. For example, <a href="https://developers.google.com/terms/">Google reserves the right to include advertisement in your maps</a>, and obviously it is not Open Source. Also, according to the license, Fusion Tables probably can only be used with Google Maps API (need confirmation), and therefore make it very hard to use together with <a href="http://www.openstreetmap.org/">OpenStreetMap</a>.

**UPDATE:** This is not entirely correct. You can use Fusion Tables via KML or API queries without a restriction on it being displayed along with a Google Map. The <a href="https://developers.google.com/maps/documentation/javascript/layers#FusionTables">FusionTablesLayer</a>, which is part of the Google Maps API, then applies the terms of the API of course.

But we want to focus more on the limits of both projects to help people understand the differences from a technical point of view.

### Amount of data limits

<div class="table">
  <div class="row">
    <p>Fusion Tables</p>
    <p>CartoDB</p>
  </div>

  <div class="row">
    <p>You can use the Maps API to add up to five Fusion Tables layers to a map, one of which can be styled with up to five styling rules.</p>
    <p>No limitation on the amount of layers you display or the amount of styles you apply.</p>
  </div>

  <div class="row">
    <p>Only the first 100,000 rows of data in a table are mapped or included in query results.</p>
    <p>No limit on the amount of rows to query on the SQL API or to display on maps.</p>
  </div>

  <div class="row">
    <p>500 vertices per tile limit.</p>

    <p>No limit.</p>
  </div>

  <div class="row">
    <p>250 MB size limit.</p>

    <p>On dedicated servers you can go as much as 500GB of data (soft limit). That does not mean we have the capacity to display on a map 500GB of data, biggest limitation is RAM, which on dedicated instances is 32GB.</p>
  </div>

  <div class="row">
    <p>Fusion Tables layers are made available as part of the Google Maps API. We've seen that the cost of using the Maps API can quickly <a href="https://plus.google.com/118383351194421484817/posts/foj5A1fURGt">grow out of hand</a> for businesses.</p>

    <p>CartoDB comes for various prices from our free _Newbie server_ to our $300 fully dedicated instances.</p>
  </div>
</div>

The limitation on amount of data in Fusion Tables are described <a href="https://developers.google.com/maps/documentation/javascript/layers#FusionTables">here</a>. And this is how they compare to CartoDB.

<iframe frameborder="0" height="300" src="http://cartodb.s3.amazonaws.com/FusionTables-vs-CartoDB/interactivity.html" width="639"></iframe>

Now, to see the implication of some of this limits we loaded the same dataset on Fusion Tables and CartoDB. A total of 100,851 points from our <a href="http://www.oldweather.org/">OldWeather</a> project. These are within the limits of Fusion Tables, but because of the restrictions on the amount of vertices per tile, the data does not look the same.

On the left is Fusion Tables, on the Right CartoDB for the EXACT same dataset. You can see how Fusion Tables remove points at low zoom levels due to the 500 limit per tile.

### Map customization limits

But this map in any case is wrong. You should not visualize on a map 100,000 points like this because the size of the marker is so big that does not allow you to really understand the data. In Fusion Tables you are very limited to how you want the marker to look like, it's just a circle in different colors, like in the example. But in CartoDB, because we support a full styling language like Carto CSS, you can do many more things, like changing the opacity, using a symbol, or more important, changing how it looks at different zoom levels. Compare that previous map with this one with a custom style in CartoDB, again, the same dataset.

<iframe frameborder="0" height="300" src="https://viz2.cartodb.com/tables/coverage_oldweather_new_style/embed_map" width="639"></iframe>

Now you can really see the trends on the data, and the more you zoom in, the bigger the dots become.

The next example is a dump of all roads from Belarus in OpenStreetMap. It is an <a href="http://download.geofabrik.de/osm/europe/">18MB shapefile</a> downloaded from Geofabrik. You can see straight away how Fusion Tables does not show all features. Unlike the last case it would almost never make sense to use dots to represent the roads. Zoom out one zoom level and you will see how Fusion Tables automatically turns the roads into points.

<iframe frameborder="0" height="300" src="http://cartodb.s3.amazonaws.com/FusionTables-vs-CartoDB/roads.html" width="639"></iframe>

### Conclusion

We have only covered a small subset of the differences between Fusion Tables and CartoDB. But essentially: CartoDB is Open Source, does not impose data size limits, you can use full SQL from PostGIS, usage of Carto CSS to style your map, are the main reasons why we created CartoDB and that differentiate it from Fusion Tables.

If you want to comment on this, do it on twitter mentioning <a href="http://twitter.com/cartodb" title="CartoDB" target="_self">@cartodb</a>.
