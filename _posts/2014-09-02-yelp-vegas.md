#Mapping the invisible: under the covers of Sin City Yelp reviews

Today, we're going to look into [publicly available data from Yelp](http://www.yelp.com/dataset_challenge), specifically, from Las Vegas. The data includes reviews on businesses, mostly restaurants, all around the Greater Las Vegas area. We thought this data would be interesting to build our latest installment of [Mapping the Invisible](http://blog.cartodb.com/categories/mapping-the-invisible/). Using this data has some restrictions from Yelp, so we suggest you look over their use agreement before going too deep But we do think the methods we show you here could inspire you to extract new understanding from your own data.

Here, we will show you how you can transform reviews into insightful visualizations. Using the Yelp data itself may be a bit tricky, as the format of the associations takes a small bit of munging. If you are curious how we did this specific bit of work, you can take a look at a [some notes here](https://gist.github.com/andrewxhill/8555086907bd7b06f9f3). For now, we'll focus a bit on some neat insights from the data!

### The New Modern City

Over the last 20 years, the population of metropolitan Las Vegas has exploded from 770,000 in 1990 to over [2 million in 2013](http://www.lvcva.com/includes/content/images/MEDIA/docs/Population-2013.pdf). This infusion of people is expected to continue as the growth is largely due to [people finding work or moving to retire in the area](http://www.reviewjournal.com/business/economic-report-shows-las-vegas-growth-optimism-are-rise). This has changed the culture of Las Vegas from a tourist town focused on casinos and poker tables to one that is attracting new industries to properly service its booming population. 

Even in the face of the recent turnover, Las Vegas still hosts 40 million visitors every year. Inspired by many maps before us, we thought it would be interesting to take a closer look at the interaction of the city between the tourists and the locals.

### Where the Tourists Prefer to Roam

To make this map, we assume users that post less than 20% of their reviews in Vegas are tourists. With this simple division of the data, into tourists and locals, we then calculate what percentage of reviews posted by each category. This can all be done with a small bit of SQL. Next, we make a map to show how the two categories spread out over the city. What pops out is something you might already expect: tourists love to spend time and review businesses on the Strip, whereas the rest of the city is filled with locals.   

<iframe width='100%' height='520' frameborder=‘4’ src='http://team.cartodb.com/u/timchung/viz/417db55c-219b-11e4-89ab-0e10bcd91c2b/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

While the map is simple, it is a good starting point to dig deeper. For example, if we focus on just the tourists, we can start pulling interesting information about how they interact with the city. One thing we can do is look at the hotels the tourists review, or more directly, we can assume that if a tourist reviews a hotel that the tourist stayed in that hotel. That could be interesting! So armed with this little insight into our tourists, let's look at how visitors of different hotels look at the city. 

<iframe width='100%' height='520' frameborder=‘4’ src='http://team.cartodb.com/u/timchung/viz/8d4e3c74-225c-11e4-9a80-0e73339ffa50/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

We take a closer look into the strip, by doing a similar kind of analysis on the tourists. We look into tourists that reviewed the hotels and see what else they reviewed. 

We then breakdown the reviews by the hotels to get a general idea of where these tourists also frequent. From the visualization, we can easily see that most of the establishments were frequented by people who also reviewed the hotel nearby, suggesting that many of the guests may not venture very far from their hotel. This also suggests that if someone were to start a business on the strip, they should also be very sensitive to what kind of guests each hotel attracts.



It’s also interesting to look into the price range of the general vegas area, to indicate where things might be considered pricer than others. The visualization below shows that upscale shops tend to be in the southwest area of the strip, whereas more affordable institutions are located on the northern part. 

<iframe width='100%' height='520' frameborder=‘4’ src='http://team.cartodb.com/u/timchung/viz/28fec582-32c3-11e4-8de5-0e73339ffa50/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

We generated the price hexagons through the following code. One can easily transform this code to also indicate other trends in the data, such as where highly rated institutions are or where the institutions are generally populated.

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

### But What Happens In Vegas, Happens In Phoenix?

The recent rapid growth of Vegas begs the question of whether basic institutions have popped up fast enough to serve the local populace. Here, we compare with Phoenix in two regards — Mexican restaurants and dentists. Mexican restaurants serve whenever the locals like, making their demand relatively variable; whereas dentists require regular visits to sustain their business. 

In the visualizations below, we show a distance map by neighborhood to both of these institutions for Phoenix and Las Vegas. The institutions are distinguished by their ratings; red dots indicate stores that are now closed and orange indicates places that don’t have enough ratings, indicating that it’s likely a newer store. From the chart of Mexican restaurants, it seems that no neighborhood is very far from one; however, many new stores have opened up in Sunrise Manor and Charleston Heights. We also see that many of the failed restaurants are also located in the Charleston Heights area, indicating that it may not be as an attractive as a place to start a restaurant. We see a similar tendency in Phoenix, where Tucson shows a larger density of failed Mexican restaurants, whereas higher rated ones are foxed in the Central Phoenix area.

<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/7f86aae6-294a-11e4-a745-0e230854a1cb/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/ddf9d4fa-32cc-11e4-88ee-0edbca4b5057/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Using similar logic, we look into the distribution of dentists. Here we note that, in general, the coverage seems better in Vegas than in Phoenix. However, in places like North Las Vegas and Sunrise Manor, there could be some opportunities to open a successful dentist. Given that we haven’t taken a closer look into demographic data, one would have to understand these aspects before starting a business; however, this could give some insight on where opportunities could exist in the future.

<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/224e6bf6-294b-11e4-8e16-0e10bcd91c2b/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/timchung/viz/451b4274-32d0-11e4-9d34-0e230854a1cb/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

The maps above were created using the following SQL. Please note that this code could take a long time to execute.

	select * from (
		select the_geom as the_geom_webmercator, 
			min(ST_Distance_Sphere(st_transform(st_centroid(the_geom), 4326), st_transform(otherGeom, 4326)))/1600 as minDist 
		from (
    			select grids.the_geom, st_collect(st_transform(timchung.allbusiness.the_geom, 3857)) as otherGeom
			from (
				SELECT CDB_HexagonGrid(
					ST_SetSRID(
						ST_Envelope(
							ST_Collect(
								st_transform(the_geom, 3857)
							)
						),
					3857),
				500) as the_geom
				from timchung.allbusiness
				where state in ('AZ')

				union
				
				SELECT CDB_HexagonGrid(
					ST_SetSRID(
						ST_Envelope(
							ST_Collect(
								st_transform(the_geom, 3857)
							)
						),
					3857),
				500) as the_geom
				from timchung.allbusiness
				where state in ('NV')) as grids
	
		where position('Mexican' in categories)>0
		and open
		group by grids.the_geom
	
	) as gridsPoints
	
	group by the_geom) as allGrid 
	where minDist<7

This is just another simple example of how you can use CartoDB to turn data into insights. If you’re interested in checking it out [create a free account](http://cartodb.com/) and start mapping your own data today.


