---
title: 'Map of the Week: A personal analysis of 1 year of Citybike'
date: '2014-08-07T15:55:00+01:00'
tags:
- cartodb
- New York maps
categories:
- 'Map of the Week'
---

<div class="wrap"><p><a href="http://jeffjenkins.cartodb.com/viz/bc7b4ea6-48d7-11e3-8446-172a249aaded/embed_map?title=true&description=true&search=false&shareable=true&cartodb_logo=true&layer_selector=true&legends=true&scrollwheel=true&sublayer_options=1%7C1%7C1&sql=&sw_lat=40.721859850258966&sw_lon=-74.05128479003906&ne_lat=40.780963881442055&ne_lon=-73.89198303222656" class="wrap-border"><img src="/img/posts/2014-08-07-map-of-the-week/cover.png" alt=""></a></p></div>

Welcome [Miles Grimshaw](@milesgrimshaw) to our Map of the Week series. Miles has used Kimono Labs and CartoDB to visualize one year of his Citibike trips (the bike service in New York City). Here is the result. 

<!--more-->

<hr>

<p>Thanks in large part to the NSA, we are increasingly aware  of the extent to which our digital lives are being tracked, recorded and analyzed. But it is easy to forget that our seemingly analogue activities can leave just as significant of a digital footprint as digital services. </p>

<p>Citibike is a fine example. Over the past 10 months I made 268 trips on Citibike, and like all Citibike trips, each of these  was meticulously recorded and stored away online by the Citi service. Unfortunately Citibike does not currently have an API, nor any export functionality, making it difficult for anyone (NSA or otherwise) to explore their data.</p>

<iframe width="100%" height="520" frameborder="0" src="http://team.cartodb.com/viz/2b2a9d4c-0c8d-11e4-80e6-0e73339ffa50/embed_map?title=false&amp;description=false&amp;search=false&amp;shareable=true&amp;cartodb_logo=true&amp;layer_selector=false&amp;legends=false&amp;scrollwheel=true&amp;fullscreen=true&amp;sublayer_options=1|1&amp;sql=&amp;sw_lat=40.68089838511525&amp;sw_lon=-74.08493041992186&amp;ne_lat=40.773261878622634&amp;ne_lon=-73.86520385742188" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen=""></iframe>

<p>Enter Kimono Labs, to the rescue!</p>

<p>Kimono recently released released <a href="https://www.kimonolabs.com/learn/create-auth-api">Authenticated API creation</a>. This new tool makes it incredibly simple to scrape  data from behind log-in portals. In less than 5 minutes I set one up to extract my Citibike trips. </p>

<p>With the raw data in hand, I turned to CartoDB to visualize it. <a href="http://cartodb.com/">CartoDB is the best product</a> I have found for visualizing geo-temporal data. I teamed up with <a href="http://andrewxhill.com/">Andrew Hill</a>, developer evangelist at CartoDB, to make a beautiful moving map of my life zipping around NYC. </p>

<p>Looking at the trips and parsing the data it becomes clear that de Blasio could easily figure out things like: where I live and work, if I lost my job, if I was dating someone (or having an affair if I was listed as married in the census). </p>

<h2 id="animation-of-my-roommate-bay-grosshttpbaygrosscom-trips">Animation of My Roommate <a href="http://baygross.com/">Bay Gross’</a> Trips</h2>

<iframe width="100%" height="520" frameborder="0" src="http://team.cartodb.com/viz/657d3f6c-1ce7-11e4-b595-0e230854a1cb/embed_map?title=false&amp;description=false&amp;search=false&amp;shareable=true&amp;cartodb_logo=true&amp;layer_selector=false&amp;legends=false&amp;scrollwheel=true&amp;fullscreen=true&amp;sublayer_options=1|1&amp;sql=&amp;sw_lat=40.68089838511525&amp;sw_lon=-74.08493041992186&amp;ne_lat=40.773261878622634&amp;ne_lon=-73.86520385742188" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen=""></iframe>

<h2 id="static-maps-of-our-trips">Static Maps of Our Trips</h2>

<iframe width="100%" height="520" frameborder="0" src="http://team.cartodb.com/viz/2927add2-0c88-11e4-b81f-0edbca4b5057/embed_map?title=false&amp;description=false&amp;search=false&amp;shareable=true&amp;cartodb_logo=true&amp;layer_selector=false&amp;legends=false&amp;scrollwheel=true&amp;fullscreen=true&amp;sublayer_options=1|1&amp;sql=&amp;sw_lat=40.701463603604594&amp;sw_lon=-74.06536102294922&amp;ne_lat=40.752848878227404&amp;ne_lon=-73.88477325439453" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen=""></iframe>

<iframe width="100%" height="520" frameborder="0" src="http://team.cartodb.com/viz/a6f50f7a-1ce6-11e4-b838-0e73339ffa50/embed_map?title=false&amp;description=false&amp;search=false&amp;shareable=true&amp;cartodb_logo=true&amp;layer_selector=false&amp;legends=false&amp;scrollwheel=true&amp;fullscreen=true&amp;sublayer_options=1|1&amp;sql=&amp;sw_lat=40.701463603604594&amp;sw_lon=-74.03051376342773&amp;ne_lat=40.752848878227404&amp;ne_lon=-73.92065048217773" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen=""></iframe>

<h2 id="some-fun-facts">Some Fun Facts</h2>

<ul>
  <li>324 Miles traveled (that’s the equivalent to biking to Boston from New York and half way back again)</li>
  <li>1,963 minutess spent biking (thats over 31 hours on my toush!)</li>
  <li>Average distance traveled per trip: 1.26 miles (max:  3.68 min: 0.27)</li>
  <li>Average trip time: 7mins and 49secs</li>
  <li>Average trip speed: 10.57 mph</li>
  <li>Weekday morning commute average speed: 12.10mph  (oh shit, i’m late!)</li>
  <li>Weekday evening commute average speed: 8.97mph</li>
  <li>Weekday average speed: 10.87mph</li>
  <li>Weekend average speed: 9.68mph</li>
  <li>Average Speed vs. Google Estimate	e: 1.81% faster</li>
  <li>Average arrival time to work: 8:42 (28.8% of the time I arrive after 9am and 10.58% of the time I arrive before 8am)</li>
  <li>Evening weekday trips that begin outside our office start on average at 7:36pm (31.57% start after 8pm)</li>
  <li>For weekday trips that finish at the station closest to my apartment end on average at 8:50pm (31.03% end after 10pm)</li>
</ul>

<p>In the graph below you can easily see how much faster I bike during morning commute relative to other trips, how my weekend rides tend to start later in the day, and also the handful of late night bikes home. </p>

<p><img src="http://milesgrimshaw.com/Data/Citibike/Plot_Time_Speed_Weekday.jpg" alt="" /></p>

<h2 id="your-data" class="decoration">Your Data</h2>

<h3>Data Collection</h3>

<ul>
  <li>Set up an API with Kimono</li>
  <li>Name each of the four fields: Start_Station, Start_Time, End_Station, End_Time</li>
  <li>Get the API credentials and add to the Ruby script</li>
  <li>Sign up for a Google API account and turn on Google Distance Matrix API and add the API key to the ruby script</li>
  <li>Download a copy of the <a href="http://www.citibikenyc.com/stations/json">station JSON feed to geocode the station names</a></li>
  <li><a href="https://gist.github.com/milesgrimshaw/818bfd7c1f8b762563dd">Run this ruby script</a> as <code>ruby citibike.rb</code></li>
</ul>

<h3>Analysis</h3>

<ul>
  <li><a href="https://gist.github.com/milesgrimshaw/67d26ffa50a6f9c4f5ef">I wrote this R script</a></li>
</ul>

<h3>Visualization</h3>

<ul>
  <li>Upload the CSV to CartoDB</li>
  <li>Create linestrings: UPDATE table_name SET the_geom = ST_MakeLine(cdb_latlng(start_station_lat::numeric, start_station_lon::numeric), cdb_latlng(end_station_lat::numeric, end_station_lon::numeric))</li>
  <li><a href="https://team.cartodb.com/u/andrew/tables/andrew.new_york_osm_line_clean/public/table">Download and upload the OSM street data</a></li>
  <li>Load Andrew’s <a href="https://gist.github.com/andrewxhill/7a8776f03821f1f71794">SQL functions into the SQL Editor</a></li>
  <li>Snap the linestrings to roads: UPDATE tablename SET the_geom = axh_blend_lines(the_geom)</li>
  <li>Generate points for a Torque map: WITH a AS (SELECT (axh_linetime_to_points(the_geom, start_time, end_time, 20)).* FROM table)
SELECT geom as the_geom, when_at FROM a</li>
  <li>Run ‘Table from Query’ in the interface to create a table for the Torque map</li>
</ul>

<p><strong>Thanks</strong>: A big thanks for Andrew Hill for doing things in PostGIS I have no idea about, and to Bay Gross for his edits. </p>
