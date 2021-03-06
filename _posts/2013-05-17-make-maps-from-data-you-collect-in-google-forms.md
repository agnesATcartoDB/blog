---
title: Make maps from data you collect in Google Forms
date: '2013-05-17T16:27:00+02:00'
tags:
- cartodb
- google forms
- google
- data collection
- mapping
categories:
- 'How-to guides'
redirect_from:
- "/post/50652990859/make-maps-from-data-you-collect-in-google-forms/"
---

While many CartoDB users arrive to the service with data on hand others look to use CartoDB to host and map data from ongoing collection. For those users, we offer a number of useful <a href="http://developers.cartodb.com/documentation/sql-api.html#cartodb_clients">client libraries</a> and <a href="http://developers.cartodb.com/tutorials.html">tutorials</a> for using our APIs. For businesses, scientists, and students that still want a little easier way to collect data, we thought we would put together this tutorial covering how to collect data with <a href="http://www.google.com/drive/apps.html">Google Forms</a> and have it inserted directly into a CartoDB table.

<iframe frameborder="0" height="360" src="http://player.vimeo.com/video/66332891" width="650"></iframe>

In our example, we create a simple <a href="https://docs.google.com/a/vizzuality.com/forms/d/1KmHy6EBmwdBHrPHfIvRiZgwZxVNj7_fjSk6Um2EHENM/viewform?pli=1">form</a> to collect people’s favorite color and their location in the world. Using Google Forms plus a small Google App Script, we then insert those results into our CartoDB table where we have a <a href="http://cdb.io/10CHWsD">live map</a> that shows the latest and greatest results to the world. Be sure to fill the <a href="https://docs.google.com/a/vizzuality.com/forms/d/1KmHy6EBmwdBHrPHfIvRiZgwZxVNj7_fjSk6Um2EHENM/viewform?pli=1">form</a> out yourself and see your vote show up on the <a href="http://bl.ocks.org/andrewxhill/raw/5579335/">map</a>!

<iframe frameborder="0" height="360px" src="http://viz2.cartodb.com/tables/color_world/embed_map?title=true&amp;description=true&amp;search=false&amp;shareable=false&amp;cartodb_logo=true&amp;scrollwheel=true&amp;sql=&amp;zoom=2&amp;center_lat=33.284619968887675&amp;center_lon=-46.40625" width="650px"></iframe>

We have included <a href="http://bl.ocks.org/andrewxhill/5579335">all the code</a> plus the screencast for you to create your own forms for data collection. It only takes about 5 minutes! Have fun and remember to share the cool things you come up with!
