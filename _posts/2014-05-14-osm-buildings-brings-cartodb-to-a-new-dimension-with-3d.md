---
title: OSM Buildings brings CartoDB to a new dimension with 3D Highlighted maps
date: '2014-05-14T15:25:00+02:00'
tags:
- cartodb
- osmbuildings
- berlin
categories:
- 'New hires'
redirect_from:
- "/post/85719060234/osm-buildings-brings-cartodb-to-a-new-dimension-with-3d/"
---

<img alt="" src="http://i.imgur.com/AdDtMGF.png"/>

**OSM Buildings** is an Open Source library developed by <a href="http://blog.cartodb.com/post/85117772814/jan-marsch-creator-of-osm-buildings-joins-cartodb">Jan Marsch</a> to visualize OpenStreetMap buildings in 3D using HTML5. Using HTML5 has the benefit that the library runs on most browsers, computer and mobile devices of today.

We announced last week at CartoDB that Jan was joining our team, which is really exciting for us. That means that OSM Buildings now have also support from us, and Jan will devote parts of his time to maintain and further develop the library. At the same time we have been thinking on how to integrate OSM Buildings and CartoDB further, and we have plenty of ideas for the future. Right now we want to highlight some product ideas coming from this, if you have other ideas please let us know!

### Introducing 3D highlighted maps

We are all used to maps highlighting important buildings on maps. It is a great technique to make those places stand out and help people get to them. But although we have seen many of those maps on paper, is been traditionally very hard to make those as interactive online maps.

With OSM Buildings and CartoDB we want to show you how easy is to make these maps so that you can do them for your next event, or your city. As an example check out this visualization of The Long Night of the Museum in Berlin. By highlighting the buildings where there is an event going that night, visitors get a much more clear idea on where to go and what to visit.

<iframe frameborder="0" height="720" src="http://cartodb.github.io/showcase-maps/nightofmuseums/" width="100%"></iframe>

Grab this code to embed it in your blog or web:

{% highlight html %}
<iframe width='100%' height='720' frameborder='0' src='http://cartodb.github.io/showcase-maps/nightofmuseums/' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
{% endhighlight %}

We have <a href="https://github.com/CartoDB/showcase-maps/tree/master/nightofmuseums">published this visualization as an Open Source</a> project so that anybody else can take it to develop their own map. There is also <a href="mailto:sales@cartodb.com">commercial support</a> available for the creation of these maps.

This 3D highlighted map has been created using only Open Data from <a href="http://www.openstreetmap.org">OpenStreetMap</a>, but same technology can be used with commercial providers such as Nokia HERE.

So next time you want to highlight events over a day in a city, make a tourist map for your city, highlight the location of all your shops in a city or just make your office stand out from the rest on your company website, think on 3D Highlighted maps.

This is just a first preview of what this technology can do, but the future is bright with mixing of data visualizations with buildings, volumetric visualizations and in general use of 3D in maps. We cant wait to see what people builds with it.

<em><a href="http://blog.cartodb.com/post/85513787334/cartodb-ist-ein-berliner-cartodb-opens-office-in">CartoDB is opening an office in Berlin</a>, and we will be celebrating next Thursday in Kreuzberg. Join <a href="http://www.twitter.com/osmbuildings">@osmbuildings</a> and <a href="http://www.twitter.com/jatorre">@jatorre</a> for some CartoDBeers and discuss the future of mapping with them. We look forward to see you there.<em>
