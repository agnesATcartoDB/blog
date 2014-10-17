---
title: 'Map of the Week: Pulse Plotting, the Vital Signs of Water Gauging in TZA'
tags:
- cartodb
- team
categories:
- 'Map of the Week'
---

<div class="wrap"><p><a href="http://auremoser.github.io/VitalSigns-water/" class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_full-screen.jpg" alt="" /></a></p></div>

Welcomer [Aurelia Moser (@auremoser)](https://twitter.com/auremoser) to our Map of the Week series. She is a developer for [Knight Mozilla Open News](http://opennews.org/fellowships/2014meet.html) in Brooklyn, NY. She has worked on projects for [Ushahidi](http://www.ushahidi.com/) and [Internews Kenya](http://internewskenya.org/), building interactive visualizations to support data journalism and crisis mapping globally. Find her at [algorhyth.ms](http://algorhyth.ms/), and listen in for her radio show based on the semantic web at [Stereo Semantics](http://www.stereosemantics.com/). 

<!--more-->

<hr>

There's a part of Paul Ford's talk [10 Timeframes](http://contentsmagazine.com/articles/10-timeframes/), where he goes over the various incrementations we apply to our daily lives and how our understanding of time with the advent of computers has become progressively more infintessimal, down now to the nanosecond. Eventually, he settles on the "heartbeat" as the most genuine temporal segment, selected for its consistency in tenor-ing time, and for its humanity. 

Often when we build digital things, I think we emphasize the mechanics of them over the human expressive potential they enable. There's a humanism to making maps, human-designed guides for global navigation, and sometimes I get the opportunity to plot data to a map like the thumpthump of a heartbeat on our planet; somehow feebily expressive of the natural breath and health of our globe as it grows. I work for a tech company that builds open source tools to crowdsource mapping accross the planet; we're called [Ushahidi](http://www.ushahidi.com/), a word that means "witness"" in Swahili. Occasionally, we dabble in plugging sensor data into deployments of our [self-titled mapping platform](https://github.com/ushahidi/platform). 

The resulting projections are a kind of crowdsourcing, like the reports and UGC we generally port to populate our maps, but with sensor data, you get an objective read on the natural wealth and environmental health of a place, from weather gauging, to temperature and chemical readings to seismic conditions that fuse in a larger planetary pulse. [Vital Signs](http://vitalsigns.org/) is an NGO whose objective is to do just that: read the pulse of east African argriculture and sustainability in sensor data collected across Tanzania, and this blog post is about a map we built for their team to help monitor that water gauging stations in the SAGCOT district of TZA.

I used CartoDB to build this mapping project, you can find the [code here](https://github.com/auremoser/VitalSigns-water) and the [demo here](http://auremoser.github.io/VitalSigns-water/).

### Sensor Data In The Sagcot Region: Origin Of The Data

Vital Signs has been collecting water gauging information with sensors embedded in over 170 stations throughout SAGCOT (Southern Agricultural Growth Corridor) region of Tanzania for decades. They've been analyzing these data sets and readings for anomolies that can contribute to the corpus of information they have about agricultural health in portions of Tanzania. Of late, we've been partnering with them to develop a dashboard or larger platform that can aggregate and make sense of the mass of data they've assembled, and this project was a pilot to prototype that effort for water data. 

VS measures water security and quality via water flow rate [dmf], temperature, rainfall level, waterlevel data, and this usually takes the form of text files with a collection date and a sensor reading. The data can be pretty variable and messy, and in some cases the sensors have been taking daily readings for more than 40 years, so contextual analsis of those data can be tough. This [Water Availability visualization](http://auremoser.github.io/VitalSigns-water/) was meant to apply data to geo-locations for the sensor stations and assess their coverage and concentration of study moving forward.

My task was to build something that would map those station locations with some other relevant geo-context like [river locations](http://www.fao.org/geonetwork/srv/en/metadata.show?id=37333), the boundaries of the SAGCOT region, and collection clusters, all of which figure as visible layer toggles in the resulting map. 

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_riversRemoved.jpg" alt="" /></p></div>

To compliment the map, we had a corpus of [station-level datasets as .txt files](https://github.com/auremoser/VitalSigns-water/tree/gh-pages/data/stations) and our goal was to connect them to the actual locations of the gauging stations. Much of the work went into connecting those data sets to the plotted points and enabling a "pop-up" graph or pair of graphs to render, filter, and scroll above the page fold.

### Massaging The Pulses: Data Processing

Processing the data required both a scrub of the raw data sets and some scripting to coordinate the map and the data graphs. 

Like a lot of public data, the [raw data sets](https://github.com/auremoser/VitalSigns-water/tree/gh-pages/data/stations-raw) were variable in format and content due to the range of manual and automagic collection practices for the past 40+ years of data assemblage.

For the pre-visualization data processing, I wrote something that could shape the data for consistent rendering. This needed to be a process that might be potentially repeatable since we created this preliminary visualization as a pilot with only a portion of the datasets collected. Presumably, the incoming (new) data would also need to be standardized to suit our current schema, so [fix-csv.js](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/js/fix-csv.js) is a node script that runs through the raw station files datasets in [this directory](https://github.com/auremoser/VitalSigns-water/tree/gh-pages/data/stations-raw), cleans them of inconsistent dates and null reading values, and maps them to a unique station ID that can then match the rendered stations on the Carto map. 

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_hoverdatas.jpg" alt="" /></p></div>

Part of the complication in building the map to match the datasets, is that each station was equipped with multiple sensors, so we had multiple collected data files for certain stations; this script also groups partner data sets to that same station ID, outputing them as [mapping.json](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/data/mapping.json) and enabling multi-data set graph-render on-click.

Full Script [here](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/js/fix-csv.js):

{% highlight javascript %}  

var data = fs.readFileSync(originalCsvFile, 'UTF-8');
var originalCsv = dsv.csv.parse(data);
// Assign a unique ID if the scn is missing
_.each(originalCsv, function(d) {
	d.scn = d.scn || _.uniqueId('unknown');
	if ('name' === d.Datatype) {
		d.Datatype = null;
	}
});
var groupedBySCN = _.groupBy(originalCsv, function(d) {
	return d.scn;
});
var mapping = {};
// Group files by station name (SCN); let multiple files link to same point on map
_.each(groupedBySCN, function(stations, scn) {
	var tmp = []
	_.each(stations, function(station) {
		var filename = station['basin water office data filename']
		if (filename) {
			tmp.push({
				file: filename,
				lastDataPoint: lastDataPoints[filename],
				datatype: station['Datatype']
			})
		}
	})
	if (tmp.length) {
		mapping[scn] = tmp
	}
});`

{% endhighlight %}

For the visualization, Vital Signs wanted to be to view both the location of the stations, their associated data types, and then peruse the actual data collected at those points. To this end, [waterdata.js](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/js/water_data.js) sets all of the parameters for the chart rendering using Highstock, a library affiliated with HighCharts but with a much faster render-time presumably because it's built to accommodate financial data. The mapping portion of the code is pretty abbreviated thanks to much of the automagic that Carto affords, but you can find all those details in [main.js](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/js/main.js).

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_graph2.jpg" alt="" /></p></div>

### Simple Styles

Styling was based on the existing [Vital Signs design guide](http://vitalsignstanzania.org/atlas/), favoring yellows, greens and Helvetica. To unify the overall UI, I appended the carto default legend (which coded the points as with or without data) to a #key div along with the "visible layers" dropdown and some general definitions of the domain-specific acronyms in the charts. I set the lat/log center and zoom to focus pretty tightly on the region of interest in Tanzania and made the map the main page feature on load to enable some initial exploration of the terrain before diving into the data.

Most of the interaction for the app is explained in the respository [readme](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/README.md) along with screenshots if you want to delve. 

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_graph1.jpg" alt="" /></p></div>

In brief, the visualization lets you view station information and toggle between geo layers as well line graphs for datasets affliated with those stations. 

* On hovering over a point on the map, you get some more specific geo information for that station: basin, location, and region names, as well as the station id (if there was one) and the datasets associated with that station). 

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_hoverdata.jpg" alt="" /></p></div>

* On selecting a dark blue point on the map (one with datasets), you get a fancy graph or pair of graphs that load in the lower register of the page.

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_transition.jpg" alt="" /></p></div>

* The map has a preloader PNG that loads a blank map while the rest of the map is processing, because users seemed to be impatient with the load time in the initial visualization, so there's a placeholder cheat that you can find in [main.js](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/js/main.js).


### NoSQL (not [*that*](http://en.wikipedia.org/wiki/NoSQL) kind): Geospatial Queries

Since most posters are SQL supermen, I'm embarrassed to say on this blog that I didn't run any fancy SQL to make this work. There's a column in my [gauging station data set](https://github.com/auremoser/VitalSigns-water/blob/gh-pages/data/TZA_SAGCOT_cleaned.csv) where I log the data sets associated with station locations, and at some point I SELECT from WHERE'd in Carto to sort the locations by the types of data they had, and created a binary column that would prioritize those stations that had data, eventually color the points according to this TRUE/FALSE. This was mostly an aesthetic move, since many of the stations did not have data for the proof of concept version of this map, so there needed to be some visual indication of which stations would render a chart on-click (hint: the dark blue ones) and which ones were as-yet "empty" (light blue).

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_true.jpg" alt="" /></p></div>

### Pulse Plotting in Sum

For now, the visualization iframes into a Vital Signs site designed to audit their data processing and plan for future visualizations. As a pilot that took about one week to prototype and a few more days to tweek, it's a pretty-o.k. rendering of the sensor pulse in a portion of the TZA water landscape. Limited training was necessary to communicate the UI and utility of the app to the Vital Signs team, and that was the goal. With more thought, maybe a custom D3 visualization or graph might be worthwhile, something that illustrates what water level *means* and not just the numerical value of a gauging reading. 

When I make stuff, I think a lot, and rather dramatically, about the Paul Ford's thoughts in [10 Timeframes](http://contentsmagazine.com/articles/10-timeframes/):

> If we are going to ask people, in the form of our products, in the form of the things we make, to spend their heartbeats—if we are going to ask them to spend their heartbeats on us, on our ideas, how can we be sure, far more sure than we are now, that they spend those heartbeats wisely?

And think about how I can make something that gives data some kind of kinetics or interactive pulse, without wasting anyone's heartbeats. And with this, I had the chance to do that :). 

<div class="wrap"><p class="wrap-border"><img src="https://raw.githubusercontent.com/auremoser/images/master/AM_half-screen.jpg" alt="" /></p></div>

