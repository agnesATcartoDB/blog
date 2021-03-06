---
title: 'Map of the Week: Folk to Folk'
date: '2014-05-28T20:28:47+02:00'
tags:
- cartodb
categories:
- 'Map of the Week'
redirect_from:
- "/post/87119672064/map-of-the-week-folk-to-folk/"
---

Welcome Emma from Folk to Folk in this new installment of our Map of the Week. <a href="http://folk-to-folk.com">Folk to Folk</a> is an independent documentary project exploring how the inclusive spirit of folk music helps build communities and creates accessible, participatory spaces across America today. We are happy to see how people are using CartoDB to create story-telling sites - and stay tuned because we'll have news in this front soon! Meanwhile, enjoy the story of how Folk to Folk was made.

When we decided to use a map to tell the stories we’d collected as part of Folk to Folk, **we had no idea how to make it a reality**. Then we found <a href="http://castudi.journalism.cuny.edu/">Carla Astudillo</a>, a data-investigative and interactive journalist who’s used CartoDB to create data driven maps for Patch.com, USA Today and other clients. We’d traveled across the U.S. – Southeast from Boston to New Orleans and back, then from Boston to the West Coast and back, stopping in cities and towns to speak to musicians and community facilitators about how the folk music ethos impacts their lives and work, creating short webisode style videos along the way.

All the shorts are <a href="http://vimeo.com/folktofolk">hosted on Vimeo</a>, and we’d been keeping a running <a href="http://folktofolk.tumblr.com">blog</a> of our progress, but because the travel part of our project was so integral to its story, a map seemed like the only way to display these aggregated snapshots.

<img src="http://i.imgur.com/PpevDp7.png" alt=""/>

**We plotted out the points we’d traveled within the US and added these to one table**, “Points.” Carla did some query magic to call up the videos we’d already hosted on Vimeo, as well as place-specific slideshows on Flickr.

She also created a new layer and table for our two “Routes,” which drew lines between our stops.

<img src="http://i.imgur.com/XOgLgQj.png" alt=""/><img src="http://i.imgur.com/R3cbMWB.png" alt=""/>

I edited the Geometry of the lines using the Map View tool in CartoDB, zooming all the way in and selecting GMaps Roadmap to drag and drop segments to be (almost) identical to the roads we took on our journeys.

<img src="http://i.imgur.com/BS2BXMY.jpg" alt=""/>

I used TileMill to replicate the AAA map we followed on both of our trips, from the colors, to the folded look of the paper.

<img src="http://i.imgur.com/CVj6DOg.jpg" alt=""/>

<img src="http://i.imgur.com/NyetPGH.png" alt=""/>

<img src="http://i.imgur.com/xMMcggk.png" alt=""/>

**We wanted to give a sneak-peek feel when users hovered over the points for each place we visited**, and modeled pop up windows after exit signs. When you click on a Point in the “Points” table, a pop up road sign with all videos from that stop appears. Using Vimeo’s embeds, you can watch the video either within the road sign menu, or as a full screen view.

<img src="http://i.imgur.com/dxZAGkm.png" alt=""/>

**CartoDB’s interface makes it extremely easy for us to add new videos as we finish editing them**. Each time we’re ready to add a new point to the map, we simply view the “Points” table, find the “Cities” column and add in a new video’s information, and the Exit sign immediately shows a new video.

Check out our previous <a href="http://blog.cartodb.com/tagged/map-of-the-week">Maps of the Week</a>, and <a href="http://www.cartodb.com/pricing">signup for a free CartoDB</a> account to start mapping stories like this.
