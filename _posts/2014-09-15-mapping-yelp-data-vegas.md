---
title: 'Mapping the invisible: under the covers of Sin City Yelp reviews'
tags:
- cartodb
- webinar
- visual data discovery
- analytics
categories:
- 'Mapping the invisible'
layout_color: 'http://i.imgur.com/1rs017u.jpg'
---



Today, we're going to look into [publicly available data from Yelp](http://www.yelp.com/dataset_challenge), specifically, from Las Vegas. The data includes reviews on businesses, mostly restaurants, all around the Greater Las Vegas area. We thought this data would be interesting to build our latest installment of [Mapping the Invisible](http://blog.cartodb.com/categories/mapping-the-invisible/). Using this data has some restrictions from Yelp, so we suggest you look over their use agreement before going too deep. But we do think the methods we show you here could inspire you to extract new understanding from your own data.

Here, we will show you how you can transform reviews into insightful visualizations. Using the Yelp data itself may be a bit tricky, as the format of the associations takes a small bit of munging. If you are curious how we did this specific bit of work, you can take a look at a [some notes here](https://gist.github.com/andrewxhill/8555086907bd7b06f9f3). For now, we'll focus a bit on some neat insights from the data!

### The New Modern City

Over the last 20 years, the population of metropolitan Las Vegas has exploded from 770,000 in 1990 to over [2 million in 2013](http://www.lvcva.com/includes/content/images/MEDIA/docs/Population-2013.pdf). This infusion of people is expected to continue as the growth is largely due to [people finding work or moving to retire in the area](http://www.reviewjournal.com/business/economic-report-shows-las-vegas-growth-optimism-are-rise). This has changed the culture of Las Vegas from a tourist town focused on casinos and poker tables to one that is attracting new industries to properly service its booming population. 

Even in the face of the recent turnover, Las Vegas still hosts 40 million visitors every year. Inspired by many maps before us, we thought it would be interesting to take a closer look at the interaction of the city between the tourists and the locals.

### Where the Tourists Prefer to Roam

To make this map, we assume users that post less than 20% of their reviews in Vegas are tourists. With this simple division of the data, into tourists and locals, we then calculate what percentage of reviews posted by each category. This can all be done with a small bit of SQL. Next, we make a map to show how the two categories spread out over the city. What pops out is something you might already expect: tourists love to spend time and review businesses on the Strip, whereas the rest of the city is filled with locals.   

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/417db55c-219b-11e4-89ab-0e10bcd91c2b/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>


While the map is simple, it is a good starting point to dig deeper. For example, if we focus on just the tourists, we can start pulling interesting information about how they interact with the city. One thing we can do is look at the hotels the tourists review, or more directly, we can assume that if a tourist reviews a hotel that the tourist stayed in that hotel. That could be interesting! So armed with this little insight into our tourists, let's look at how visitors of different hotels look at the city. 

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/8d4e3c74-225c-11e4-9a80-0e73339ffa50/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

From the visualization, we can quickly see that most of the establishments were frequented by people who stayed in hotels nearby. Vegas is hot, so maybe it makes sense! For new businesses in Vegas, this is a small insight that could help you decide where you will place your business to attract just the right crowd. In particular, you could dig in further to see exactly what types of reviewers frequent each hotel. 
Next, we wanted to look at how price range shifted across the Vegas area. Understand price might help uncover what types of clients move in different neighborhoods. The visualization below shows the average price (more read means more expensive) of businesses in each hexagon across the city. 

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/28fec582-32c3-11e4-8de5-0e73339ffa50/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

The most obvious pattern in the map above is that the strip is just plain expensive compared to the rest of the city. You can also see that there might be a slight pattern of more expensive shops on the southwest end of the strip and slightly cheaper shops in the northeast.

We generated the price hexagons using the following SQL. If you are interested, you can transform this code to also visualize other trends in the data (e.g. where highly rated institutions are or where the institutions are generally populated).

{% highlight sql %}
select * from (
	select the_geom_webmercator, count(points) as shopcount, avg(stars) as avgStars, avg(price) as avgPrice
	from (
		select a.*, st_transform(the_geom, 3857) as points, price, stars
		from(
			select st_transform(
				CDB_HexagonGrid(
					st_setsrid(
						st_envelope(
							st_collect(the_geom)
						), 4326),
				.005), 3857) as the_geom_webmercator
			from vegas_pricegrid ) as a

			left join vegas_pricegrid
				on st_contains(a.the_geom_webmercator, st_transform(the_geom, 3857))
		where the_geom is not null ) as b
	group by the_geom_webmercator) as c
where shopcount >= 7
{% endhighlight %}


### But What Happens In Vegas, Happens In Phoenix?

In contrast to all the tourism, the recent rapid growth of Vegas's local population opens the door to a few other questions. One in particular we were interested on was whether new shops, restaurants, and services have been built fast enough for the new locals. To explore the idea, we compared Las Vegas with Phoenix in two specific categories — Mexican restaurants and dentists. 

In the visualizations below, we show a distance map by neighborhood to both of these institutions for Phoenix and Las Vegas. The institutions are distinguished by their ratings; red dots indicate stores that are now closed and orange indicates places that don’t have enough ratings, hinting that it could be a newer business. From the chart of Mexican restaurants, it seems that no neighborhood is very far from one (thank goodness!); however, many new stores have opened up in Sunrise Manor and Charleston Heights. We also see that many of the failed restaurants are also located in the Charleston Heights area, leaving us wondering, is Charleston Heights not as attractive a place to start a restaurant? We see a similar tendency in Phoenix, where Tucson shows a larger density of failed Mexican restaurants, whereas higher rated ones are clustered in the Central Phoenix area.

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/7f86aae6-294a-11e4-a745-0e230854a1cb/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/ddf9d4fa-32cc-11e4-88ee-0edbca4b5057/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

Using a similar approach, we look into the distribution of dentists. Here we note that, in general, the coverage seems better in Vegas than in Phoenix. However, in places like North Las Vegas and Sunrise Manor, there could be some opportunities to open a successful dentist. Given that we haven’t taken a closer look into demographic data, one would have to understand these aspects before starting a business; however, this could give some insight on where opportunities could exist in the future.

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/224e6bf6-294b-11e4-8e16-0e10bcd91c2b/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

<div class="wrap">
	<iframe width='100%' height='620' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/451b4274-32d0-11e4-9d34-0e230854a1cb/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

The maps above were created using some advanced SQL that [we encourage you to explore](https://gist.github.com/andrewxhill/d29de6b4fc1b6951125a). 

This is just a few more examples of how you can use CartoDB to explore your data. If you’re interested in checking it out [create a free account](http://cartodb.com/) and start mapping your own data today.


