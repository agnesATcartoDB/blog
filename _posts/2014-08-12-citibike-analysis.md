---
title: 'Mapping the invisible: transforming Citi Bike data into new insights'
date: '2014-08-12T15:55:00+01:00'
tags:
- cartodb
- New York maps
categories:
- 'Mapping the invisible'
---

<div class="wrap"><p class="wrap-border"><img src="http://i.imgur.com/vYgFb41.jpg" alt="" /></p></div>

CartoDB is more than just a useful tool for visualizing spreadsheets. When you use CartoDB you have the ability to tap into powerful data manipulation and GIS tools as well. To showcase these capabilities, we are creating a short series, _Mapping the invisible_. As the title may suggest, we'll be exploring different datasets, doing analysis and visualizations to tell stories that are hidden in that data, so you can learn and get inspired to work with CartoDB.

<!--more-->

In our first installment, we're going to dig through some publically available data from [Citi Bike](https://www.citibikenyc.com/). The data are all recorded bike trips over a short period of time. Like many datasets that governments and businesses publish, there is often more than meets the eye. Here we are going to show you how you can transform data into entirely new and insightful visualizations. If you work with data and find this interesting, stay tuned and follow us on [Twitter](http://twitter.com/cartodb) to stay on top of the series. Let's go!

### Mapping the invisible Part I

Since its inception last year, Citi Bike has been an active participant in the open data movement, prompting data enthusiasts to engage in analyzing the granular data taken from each of their 7.5 million rides. However, despite its popularity with the data community and bike riders, the company has been going through higher-than-expected costs as it [considers rate hikes](http://www.nydailynews.com/new-york/citi-bike-rates-spike-50-save-bike-sharing-program-article-1.1853120) and [additional outside investments](http://online.wsj.com/news/articles/SB10001424052702304178104579536212429157936). Although it is difficult to know the breakdown of the costs of running the program, the cost of transporting bikes between stations is likely to be significant.
Here's a closer look at how Citi Bike transfers their bikes from one location to another using some simple analysis of the information through maps.

### Oh, the Places You'll Go!

Being a bike share, Citi Bike allows their riders to pick up and drop off a bike from any of their stations. Although this may seem obvious to many, car shares (i.e. Zipcar) generally require the users to return vehicles to the original pickup location. As a result, to make sure bikes are available where needed, Citi Bike needs to move bikes from one location to another depending on the availability and demand of bikes as each station. In general, one would expect to have fewer costs the less often the company needs to move the bikes. 

### Getting to know a bike

Bike #17310 is the most widely used bike among all the bikes in the bike share, with over 1,600 rides as of May. The visualization below shows all the rides taken with the bike: red indicating trips by a rider and blue indicating trips done by a Citi Bike truck. In general, it looks like the bike is moved around without any extra help in the western part of Manhattan, but frequently needs to be moved by truck in the East Village and Brooklyn. 

<div class="wrap">
  <div class="wrap-border">
    <iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/viz/205862b2-1e55-11e4-a972-0e73339ffa50/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
  </div>
</div>

While the original data only records when the bike was riden by a user, you can use SQL to identify gaps in the network of Bike #17310's movement: 

{% highlight sql %}
select 
a.bikeid, a.endstation,
a.starttime + interval '1 second' * a.tripdur as actreturntime,
b.startstation, 
b.starttime as pickuptime,
extract(epoch from (b.starttime - a.starttime)) as timediff,
a.whichday, a.whichhour
 
from test2.testtable as a 
 
left join test2.testtable as b 
	on (a.bikeid = b.bikeid) and (a.bikeuserank + 1 = b.bikeuserank) 
 
where b.startstation != a.endstation
and extract(epoch from (b.starttime - a.starttime)) < 3600;
{% endhighlight %}

This is the SQL we used to create the blue lines above. Our analysis assumes that all unrecorded moves are relocation events, but clearly there could be cases where the bike needed to be taken in for maintainance or other factors. Assumptions aside, this simple SQL statement let's us start to look at the efficiency of the system. 

To minimize costs, it would be important to find ways for the riders to do the majority of the moving, while the trucks move as few bikes as possible. On the other hand, the worst case scenario is where bikes need to be constantly ferried across the city. If this is spread among many stations, this will cost Citi Bike a significant amount of money to run their program. This begs the question, where should one place a station to minimize management effort? 

### Bikes Go In, Bikes Go Out

The visualization below shows the commuter flow over various periods of time (use the layer toggle for different time periods), generated by this SQL

{% highlight sql %}
select *, st_transform(the_geom, 3857) as the_geom_webmercator from
 
(
  select startstation, start_name, start_lon, start_lat,
  coalesce(a.departures, 0) as departures,
  coalesce(arrivals, 0) as arrivals,
  coalesce(a.departures, 0) - coalesce(arrivals, 0) as netdeps,
  st_setsrid(st_point(start_lon, start_lat), 4326) as the_geom
 
  from (
    select count(startstation) as departures, startstation, start_name, start_lon, start_lat 
    FROM citibike_finished
    where extract(epoch from (pickuptime -  returntime)) > 300
    and whichday <= 5 and whichhour between 17 and 20
    group by startstation, start_name, start_lon, start_lat 
    order by departures desc) as a
 
  left join (
    select count(endstation) as arrivals, endstation, end_name, end_lon, end_lat 
    FROM citibike_finished
    where extract(epoch from (pickuptime -  returntime)) > 300
    and whichday <= 5 and whichhour between 17 and 20
    group by endstation, end_name, end_lon, end_lat 
    order by arrivals desc) as b
 
  on a.startstation = b.endstation
 
  order by netdeps desc) as aa
{% endhighlight %}

The map helps demonstrate the general trends of where bikes are flowing from one locaton to another, minus maintenance work.

Not surprisingly we can see that the largest flows are the morning and evening weekday commute from Times Square, Penn Station, and Grand Central Station. What is surprising is Bryant Park, a major hub of work commuters and very close to Grand Central and Port Authority, generated bike flow in the opposite directions. We wonder if there could be simple solutions for this cluster.

<div class="wrap">
  <div class="wrap-border">
    <iframe width='100%' height='700' frameborder='0' src='http://team.cartodb.com/viz/71381978-1d8f-11e4-82da-0e10bcd91c2b/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
  </div>
</div>

### Where's The Action?

...which is not exactly what is happenening in the chart below. The visualization below shows actual pickup and dropoff times...

{% highlight sql %}
select  *, st_transform(the_geom, 3857) as the_geom_webmercator from
 
(SELECT cartodb_id, 1 as dropoff,
  st_setsrid(st_point(start_lon, start_lat), 4326) as the_geom, 
  date '2014-01-01' + pickuptime::time as starttime
 
FROM citibike_finished
 
where extract(epoch from (pickuptime -  returntime)) > 300 and whichday < 6
and pickuptime > date '2014-05-30'
 
union
 
SELECT cartodb_id, 2 as dropoff,
  st_setsrid(st_point(end_lon, end_lat), 4326) as the_geom, 
  date '2014-01-01' + returntime::time as starttime
 
FROM citibike_finished
 
where extract(epoch from (pickuptime -  returntime)) > 300 and whichday < 6
and pickuptime > date '2014-05-30'
 
) as a
 
where starttime between '2014-01-01 07:30:00' and '2014-01-01 09:30:00'
{% endhighlight %}

...highlighting a surprisingly large number of blinking lights in many of the stations. One notable example is the stations around Grand Central Station, around 42nd and Park Avenue. If this really is trucks ferrying bikes, wow! There, you can see alternating red and blue lights indicating constant ferring of bikes in and out of a single station by vans or other non-riders. It makes us want to dig deeper to find out which of these are vans and which are oddities in the data. 

<div class="wrap">
  <div class="wrap-border">
    <iframe width='100%' height='700' frameborder='0' src='http://team.cartodb.com/viz/003bb518-1d99-11e4-9877-0edbca4b5057/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
  </div>
</div>

This is just a simple example of how you can use CartoDB to turn data into insights. If you're interested in checking it out [create a free account](http://www.cartodb.com) and start mapping your own data today.
