---
title: 'WhirlyGlobe + CartoDB: Carto3D!'
date: '2012-04-13T09:57:00+02:00'
tags:
- WhirlyGlobe
- cartodb
- Carto3D
- WhereCamp
categories:
- 'How-to guides'
redirect_from:
- "/post/21015598565/whirlyglobe-cartodb-carto3d/"
---

Last Wherecamp in SF was very fruitful. We met Steve Gifford, an experienced software developer and the creator of <a href="http://code.google.com/p/whirlyglobe/">WhirlyGlobe</a>, an Open Source 3D globe engine for iPad. WhirlyGlobe take cares of managing the globe with the performance of OpenGL, and allows you to overlay data on top of it.

The <a href="WhirlyGlobe%20+%20CartoDB:%20Carto3D!">integration</a> with CartoDB was obvious. CartoDB is a great backend to manage geospatial data and then use it dynamically on applications, so WhirlyGlobe can retrieve the data from CartoDB and present it for interaction on its 3D globe. Check out this video to see it in action:

<iframe frameborder="0" height="354" src="http://www.youtube.com/embed/4KEuWYyQoss?rel=0" width="637"></iframe>

In this demo, CartoDB was used as a remote source to store data from UN recognized protected areas. Once the data is fetched, it is displayed on top of WhirlyGlobe. The result is a nice 3D thematic map suitable for use in an iPad. Obviously this is just a proof of concept of the type of applications that can be developed with WhirlyGlobe and CartoDB. This was implemented in a few hours during Wherecamp!

Steve Gifford, the man behind <a href="http://www.mousebirdconsulting.com/">Mousebird Consulting</a>, has written a <a href="http://mousebirdconsulting.blogspot.com.es/2012/04/whirlyglobe-cartodb.html">post</a> with a full explanation of how to work with CartoDB and WhirlyGlobe. You can read it <a href="http://mousebirdconsulting.blogspot.com.es/2012/04/whirlyglobe-cartodb.html">here</a>. 

"CartoDB was nice and easy to use", Steves writes. "The returns were more or less what I was expecting and tweaking the query was quite easy if you have a GIS background. I could see making some interesting apps with this".

We are happy to see this kind of creative uses of CartoDB and we look forward to share more tips on how to use CartoDB on mobile devices.

