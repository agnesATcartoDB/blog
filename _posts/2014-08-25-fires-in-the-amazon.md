---
title: 'Two Years of Fires in the Amazon Rainforest'
tags:
- cartodb
- Torque
categories:
- 'Map of The Week'
---

<div class="wrap"><p><a href="http://infoamazonia.org/projects/fire/"><img src="/img/posts/2014-08-25-fires-in-the-amazon/firesintheamazon1.png" alt=""></a></p></div>

We welcome [Laura Kurtzberg](https://twitter.com/laurakurtzberg), Data Intern at ecoLab, to our Map of the Week series. Kurtzberg work on the InfoAmazonia project along with other online undertakings. She cares about using Internet technology for humanitarian and environmental causes. 

<!--more-->

[InfoAmazonia](http://infoamazonia.org) is a news project that combines data, maps, journalism, and citizen reports to improve the public's perception of issues in the Amazon region. Data is updated frequently and is freely available for download.

Laura Kurtzberg tells us how InfoAmazonia has created a map that represents two years of fires in the Amazon rainforest.  

### Why we decided to make this map
Fires in the Amazon, both purposefully and accidentally started by people, along with naturally occurring fires, are a serious problem with implications for global climate change.

Many environmentalists are relieved about the decreased rate of deforestation in the Amazon, but deforestation is only one of many pressures that the “lungs of the earth” must endure. A Lancaster University [study](http://www.scientificamerican.com/article/human-lit-fires-can-pose-threat-to-amazon-rainforest) has shown that fires in the Amazon causes stored carbon to be lost into the atmosphere. Meanwhile, researchers at Penn State [found](http://www.eurekalert.org/pub_releases/2014-04/ps-daf041714.php) that fires and drought are a deadly combination for Amazon trees. 

The Fires in the Amazon map puts two years worth of forest fires into perspective. You can watch the fires raging during the dry season, and you can see which areas suffer from fires year-round. The map makes it clear that fires are no small issue.


### Data
The data came from NASA's FIRMS (Fire Information for Resource Management System), a part of EOSDIS (Earth Observing Observing System Data and Information System). NASA's FIRMS has worldwide information on fires freely available for [download](https://firms.modaps.eosdis.nasa.gov/download/) from the year 2000 to the present in shapefile or comma-separated text format. 


### Process
Using CartoDB made creating this map a simple process. The first step was to create a table using the CartoDB dashboard and upload the data in geoJson format. The date column's type had to be redefined as “date”, which was simple to do in Data View by selecting the column and then “Change Data Type”.

For the baselayer, a custom Mapbox layer with a heatmap of fire density was added quickly using the map's id. 

<div class="wrap"><p class="wrap-border"><img src="/img/posts/2014-08-25-fires-in-the-amazon/firesintheamazon2.png" alt=""></p></div>

I wanted the data visualization to mimic the movement of a fire as it grows and sputters, and so, using the visualization wizard, I chose the 'Torque' animated visualization, chose the “date” column to visualize the data over time, and played with the blend mode and trails to get the effect I wanted. Finally, we inserted a custom HTML legend, and we were done!

### Final Result
Here you can see a screenshot of our [final result](http://infoamazonia.org/projects/fire) on InfoAmazonia:

<div class="wrap"><p><a href="http://infoamazonia.org/projects/fire/"><img src="//img/posts/2014-08-25-fires-in-the-amazon/firesintheamazon3.png" alt=""></a></p></div>


### Thanks
Thank you to my mentors, including Vitor George, Gustavo Faleiros, VJ Pixel, and Miguel Peixe.


To see what you can create using our platform go to our [gallery](http://cartodb.com/gallery). And jump into [CartoDB](http://cartodb.com/), sign up for an account and start building your own maps.  