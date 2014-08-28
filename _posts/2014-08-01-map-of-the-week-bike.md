---
title: 'Map of the Week: Bike Lanes and Truck Routes in NYC'
date: '2014-08-01T15:55:00+01:00'
tags:
- cartodb
- New York maps
categories:
- 'Map of the Week'
---

<div class="wrap"><p><a href="http://jeffjenkins.cartodb.com/viz/bc7b4ea6-48d7-11e3-8446-172a249aaded/embed_map?title=true&description=true&search=false&shareable=true&cartodb_logo=true&layer_selector=true&legends=true&scrollwheel=true&sublayer_options=1%7C1%7C1&sql=&sw_lat=40.721859850258966&sw_lon=-74.05128479003906&ne_lat=40.780963881442055&ne_lon=-73.89198303222656" class="wrap-border"><img src="/img/posts/2014-08-01-map-of-the-week-bike/bikelane.png" alt="" /></a></p></div>

We welcome [Jeff Jenkins](https://twitter.com/jeffwjenkins) to our Map of the Week series. Jenkins is a cyclist, board gamer, and software engineer living in New York City. 

He decided to take NYC’s data on truck routes and overlayed it onto a map with bike lanes to prove that there is a need for better southbound bike lanes in central or eastern Manhattan. 

<!--more-->

We asked Jeff how he created his map and he tells us all about it here: 

### Choosing the Project

When I first got my CartoDB account I was really excited about how easy it would be to create visualizations. I decided that I'd try to find a project which I could use to help the New York bicycle community.

New York City publishes copious amounts of interesting data highlighting the functioning of the city. They also maintain a portal to access this data at [data.cityofnewyork.us](https://data.cityofnewyork.us/). After browsing through the transportation-related data sets, I discovered map data on what NYC's truck routes were. Because of their size and the drivers' poor visibility, trucks are known to be especially dangerous for cyclists.

It turned out that the data for trucks was in kml format and didn't have all of the metadata I wanted, but the department of transportation has a [data feeds page](http://www.nyc.gov/html/dot/html/about/datafeeds.shtml) which has the same thing as shape files.

### Trimming the Data

Since CartoDB has limits on how much data you can store, it's a good idea to trim anything you don't need. It's so easy to drag the raw data back in that you aren't really losing anything. My map only dealt with Manhattan, so I used the boro column in truck data to delete anything I didn't care about. Here is a before and after:

<div class="wrap"><p class="wrap-border"><img src="/img/posts/2014-08-01-map-of-the-week-bike/imagebikelanes.png" alt="" /></p></div>

The data size went from 14MB to 2MB, which leaves lots of extra space in my plan for additional visualizations. I didn't need to do it, but I could have also deleted some of the many columns which I wasn't using to further reduce the data size. I also decided to leave all of Manhattan even though most of it wasn't needed since I thought the context would be useful. I also imported the NYC bike lane data, but it was quite small so I didn't do any trimming.

### The Visualization

I created a new visualization and created layers for each of the truck and bike tables. The most difficult part of the process turned out to be figuring out how make both of the lines visible. Since both data sets were dealing with the city streets they overlapped each other at exactly the places I wanted to call out. I played with the line opacity, width, and different colors but it wasn't possible to make it so that you could really see both.
After a while of failing to make both visible I checked a [CartoCSS](https://www.mapbox.com/tilemill/docs/manual/carto/)  reference and discovered line-offset, which moves a line to the side. I added this style to my visualization and it worked perfectly:

{% highlight scss%}
#truck_routes {
  line-color: #B81609;
  line-width: 3;
  line-opacity: 0.8;
  line-offset: 3;
}
{% endhighlight %}

<div class="wrap"><p class="wrap-border"><img src="/img/posts/2014-08-01-map-of-the-week-bike/imagebikelanes2.png" alt="" /></p></div>

I also needed lines on the map denoting the southbound bike lanes. I added a manual layer to accomplish this. The button can be hard to see, but it's in the menu on the right side.

Lastly, I added a legend explaining what each color was. Once I had tweaked everything to my liking I published the visualization on my blog using the embed iframe option. Other than my not knowing about line-offset, the whole process only took a few hours.

If you want to be part of our [Map of the Week](http://blog.cartodb.com/categories/map-of-the-week/) and create beautiful maps like this one, go to [CartoDB](http://cartodb.com/) and sign up for a free account. 
