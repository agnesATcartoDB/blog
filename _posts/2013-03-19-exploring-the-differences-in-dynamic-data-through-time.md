---
title: Exploring the differences in dynamic data through time
date: '2013-03-19T12:51:00+01:00'
tags:
- smartcity
- comparing
- real-time
categories:
- 'How-to guides'
redirect_from:
- "/post/47054808317/guest-post-michael-keller-from-newsbeast-labs/"
---

We often find ourselves exploring what interesting things can be found in data that changes through time. In recent blog posts about the Mobile World Congress (MWC), we have published a couple interesting experiments with temporal data. In the first, we showed how CartoDB could be used to map traffic in Barcelona.

<a href="http://blog.cartodb.com/post/42847998810/real-time-maps#_=_" title="BCN Traffic"><img alt="image" src="http://media.tumblr.com/2fc136e493742171cc656bbb43c15018/tumblr_inline_mjx9kcZm8s1qz4rgp.png" width="637px"/></a>

The map was built to automatically update every 15 minutes through the day. In the second map, we show a <a href="http://blog.cartodb.com/post/43975515359/a-cartodb-and-bbva-visualization-on-the-economic-impact#_=_" title="MWC">fun visualization of credit card purchases</a> in Barcelona during MWC compared to purchases over a similar period not during the MWC.During the development of the second example, we realized how important it can be to show two maps simultaneously, side-by-side. In the credit card transaction example, each map show the view what happened at a different point in time.

The side-by-side technique can be really useful. For example, here we have recreated the Barcelona traffic map, now showing the traffic during the start of MWC and the traffic exactly one week later. 

<a href="http://cartodb.github.com/cartodb-publishing-templates/doublemap/" title="TWO BCN Traffic"><img alt="image" src="http://media.tumblr.com/dfd758a7d2e991663377d21702fd4fa3/tumblr_inline_mjx9l81Krv1qz4rgp.png" width="637px"/></a>

The utility of the side-by-side map example is that you can allow users to zoom and pan into areas of interest. While traffic may not appear immediately different, if you are driving in Barcelona, you may want to explore the map close to discover the intricacies and maybe learn how large crowds influence the flows in that city. These insights are already helping some CartoDB users to build data dashboards to support their missions of creating <a href="http://en.wikipedia.org/wiki/Smart_city" title="smart city">smart cities</a>.

We feel that a lot of CartoDB users will find an easy to use dual map visualization helpful for telling stories about their data. For that reason, we have developed an example as an easy to use template in our templates library. <a href="http://cartodb.github.com/cartodb-publishing-templates/doublemap/" title="Side by side template">Grab a copy</a> and start using it immediately with your CartoDB data!
