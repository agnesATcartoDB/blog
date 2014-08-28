---
title: 'Map of the Week: The Spatial Distribution of Swiss Soccer Fans'
date: '2014-07-28T17:35:00+02:00'
tags:
- cartodb
- Map of the Week
categories:
- 'Map of the Week'
---

<div class="wrap"><p><a href="http://www.tagesanzeiger.ch/extern/interactive/2014/fankarte/" class="wrap-border"><img src="http://i.imgur.com/EXLJ188.png" alt="" /></a></p></div>

We welcome [Timo Grossenbacher](https://twitter.com/wnstns) to our Map of The Week. He’s currently working as Interactive News Developer at the Swiss daily newspaper [Tages-Anzeiger](http://www.tagesanzeiger.ch/), based in Zurich.

<!--more-->

Tages-Anzeiger published a couple of week ago their newest data driven journalism project built with CartoDB: An interactive map of spatial distribution of Swiss soccer fans. The map shows where the fans of [Swiss Football League](http://sfl.ch) soccer clubs reside, ready for the start of this year's "Super League" tournament. 

Tages-Anzeiger published a couple of weeks ago their newest data driven journalism project built with CartoDB: <a href="http://www.tagesanzeiger.ch/extern/interactive/2014/fankarte/">An interactive map of spatial distribution of Swiss soccer fans</a>. The map shows where the fans of [Swiss Football League](http://sfl.ch) soccer clubs reside, ready for the start of this year's "Super League" tournament. 

This blog post summarizes the kind of data utilized by the developers, how they made use of the CartoDB Editor to style the map and how they built a full-blown Javascript application on top of the [CartoDB.js API](http://docs.cartodb.com/cartodb-platform/cartodb-js.html). 

<hr />

### Data collection and pre-processing

It all started when one of the journalists I work with had the idea to ask Swiss soccer clubs for data on where their fans live. Surprisingly, at least to me, most of the clubs store detailed data about the holders of their **season tickets** (which allow those to watch all the games in the club's home stadium). So my colleague tediously phoned each of the ten top-flight clubs and got provided with spreadsheets showing the amount of season ticket holders per **zip code** for as many as 9 clubs (one club would not give us the data because of data privacy concerns, although it is technically impossible to reidentify people based on such data). Another colleague pre-processed the data, and specifically, matched the zip codes with **actual municipalities** (as the map shows municipality borders, not zip code areas). 

### Data classification and styling

He then provided me, the developer of the map, with a CSV showing the amount of ticket holders for each of the somewhat 2,400 municipalities of Switzerland, which I imported into the [CartoDB editor](http://docs.cartodb.com/cartodb-editor.html). I quickly merged it with the most recent polygon boundaries of the municipalities, available from [the Swiss Federal Office of Topography](http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/landscape/vector200.html). 

As I didn't need the polygons of foreign countries and as some cantons (Swiss institutional units, something like provinces) needed to be excluded because we didn't have data on their "native" Soccer clubs, I used the following query to only show the relevant polygons on the map:

{% highlight sql %}
SELECT * FROM sg_2014_07_fussballfans_merge 
WHERE canton IN ('BE','VD','AG','ZH','GR','SO','LU','BL','SG','TG','JU','GE','NE','SZ','SH','AR','UR','ZG','NW','AI','OW','BS','GL') 
AND kt IS NOT NULL
{% endhighlight %}

Concerning the styling, the final map has two different modes. One shows all the 9 clubs together, and the municipalities are colored according to the dominant one (the one selling the most season tickets). In the other mode, only one club, which the user can choose, is shown. For the first mode, the following CSS was set in the CartoDB editor:

{% highlight scss %}
/** category visualization */

#sg_2014_07_fussballfans_merge {
  polygon-opacity: 1;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
}
#sg_2014_07_fussballfans_merge[best="keine"] {
  polygon-fill: #FFFFFF;
}
#sg_2014_07_fussballfans_merge[best="FCB"] {
  polygon-fill: #db4140;
}
#sg_2014_07_fussballfans_merge[best="YB"] {
  polygon-fill: #FFCC00;
}
#sg_2014_07_fussballfans_merge[best="FCLS"] {
  polygon-fill: #b0764e;
}
#sg_2014_07_fussballfans_merge[best="FCSG"] {
  polygon-fill: #4ab969;
}
#sg_2014_07_fussballfans_merge[best="FCL"] {
  polygon-fill: #0091d0;
}
#sg_2014_07_fussballfans_merge[best="FCZ"] {
  polygon-fill: #9f6eaf;
}
#sg_2014_07_fussballfans_merge[best="unentschieden"] {
  polygon-fill: #a7a9ac;
}
#sg_2014_07_fussballfans_merge[best="GCZ"] {
  polygon-fill: #f7941d;
}
#sg_2014_07_fussballfans_merge[best="FCT"] {
  polygon-fill: #f49ac1;
}
#sg_2014_07_fussballfans_merge[best="FCA"]{
  polygon-fill: #163479;
}
#sg_2014_07_fussballfans_merge [ dom2 <= 79.4726803182168] {
  polygon-opacity: 1;
}
#sg_2014_07_fussballfans_merge [ dom2 <= 9.03346994535519] {
  polygon-opacity: 0.8;
}
#sg_2014_07_fussballfans_merge [ dom2 <= 3.69344413665743] {
  polygon-opacity: 0.6;
}
#sg_2014_07_fussballfans_merge [ dom2 <= 1.96850393700787] {
  polygon-opacity: 0.4;
}
#sg_2014_07_fussballfans_merge [ dom2 <= 0.931181269953885] {
  polygon-opacity: 0.2;
}
#sg_2014_07_fussballfans_merge[best="keine"] {
  polygon-opacity: 0;
}
{% endhighlight %}

As you can see, the polygons' opacity is set according to a variable called `dom2`, which basically takes into consideration the size of the municipality (in terms of inhabitants) and the percentage of tickets the dominant clubs has sold. 

We classified this variable into five classes using the CartoDB editor's quantile method, and manipulated the generated CartoCSS. Other than that, we took print-friendly colors (as the map also appeared in the printed edition) from [Colorbrewer.org](http://colorbrewer.org) to visualize the dominant club. The challenge here was to pick a color for each club so that "neighboring" clubs are easily distinguishable. 

For the second mode, I also used the editor's ability to calculate quantiles of a variable, but only imported the generated CSS into the code of our application. In fact, our frontend does not actually switch between layers (of the CartoDB visualization) but updates the CSS as soon as somebody chooses a club.

<div class="wrap"><p><a href="http://www.tagesanzeiger.ch/extern/interactive/2014/fankarte/" class="wrap-border"><img src="http://i.imgur.com/Cpk2rIE.png" alt="" /></a></p></div>

### Building the application

As mentioned before, I used the CartoDB.js API to build a full-blown standalone app. To initialize the map, only a few lines of code were necessary: 

{% highlight javascript %}
var initializeMap = function() {
  // map initialization
  cartodb.createVis('map', VIZAPI, {
    shareable: false,
    title: false,
    description: false,
    search: true,
    tiles_loader: false,
    center_lat: 47,
    center_lon: 8.5,
    zoom: (isMobile ? 7 : 9),
    cartodb_logo: true
  })
  .done(function(vis, layers) {
    // remove spinner
    $('#map .spinner').remove();
    // layer 0 is the base layer, layer 1 is cartodb layer
    // setInteraction is disabled by default
    window.layers = layers;
    window.vis = vis;
    layers[1].setInteraction(true);
    // layers[1] is "all"
    layers[1].on('featureOver', function(e, pos, latlng, data) {
      if (isMobile) {
        updateClubInfo(data.cartodb_id);
      }
    });
    layers[1].on('featureClick', function(e, latlng, pos, data) {
      if (isMobile) {
        updateClubInfo(data.cartodb_id);
      } else {
        // open popup
        showMuniPopup(pos, data.cartodb_id);
      }
    });

    // save original map css
    clubs['all'].css = layers[1].getSubLayer(0).getCartoCSS();

    // custom google map styles
    vis.getNativeMap().setOptions(gmapstyles);

    // take search and append it to panelBody
    if (!isMobile) {
      var searchBox = $('.cartodb-searchbox').detach();
      $('#ui .panel-body').append(searchBox);
    }

    $('.cartodb-searchbox').find('input.text').attr('placeholder', 'Nach Gemeinde suchen');
  })
  .error(function(err) {
      console.log(err);
  });
};
{% endhighlight %}

As you can see, in line 39, the original CSS (the one that is used when all clubs are displayed together) is stored in a variable so it can be restored whenever the user switches back from the single-club-mode to the overview (see below for further explanation). 

From line 24 to line 36 I also defined custom actions to be taken whenever the user hovers over a municipality or clicks on it. Based on whether he or she uses a mobile device, different actions are taken -mobile detection and other responsiveness goodness are provided by [Bootstrap](http://getbootstrap.com)-. In order to filter the data to be displayed upon these interactions, I give the respective functions the CartoDB-ID of the element that was interacted with. 

<div class="wrap"><p><a href="http://www.tagesanzeiger.ch/extern/interactive/2014/fankarte/" class="wrap-border"><img src="http://i.imgur.com/oaCz1rV.png" alt="" /></a></p></div>

In line 42, by the way, I set a custom Google Map style which is very light and does hardly interfere with the different transparency values of the CartoDB layer.

As a last step in the `done`-callback, the search box is taken (as it does not exist prior to map loading) and "moved" to the custom UI panel I added (not visible in mobile mode). 

Speaking of the data that needs to be displayed in the tooltip ("featureClick") or upon touch on mobile devices ("featureOver"), i.e., information about each club and each municipality: As I am only provided with the CartoDB-ID in the callbacks I specify to these events and as I didn't specify info windows or anything in the editor, I needed to separately load the data from CartoDB, using the [SQL API](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#getting-data-with-sql):

{% highlight javascript %}
var loadData = function() {
  var sql = new cartodb.SQL({
    user: 'wnstnsmth'
  });

  var overallDataPromise = sql.execute("SELECT cartodb_id,fca,fcb,fcls,fcl,fcsg,fct,fcz,gcz,yb,name,total,kt,einwohner FROM sg_2014_07_fussballfans_merge where kt is not null and kt != 'VS' and kt != 'FL' and kt != 'TI'");

  var teamDataPromise = sql.execute("SELECT ct,gj,mt,mw,n,sk,stgr,team,zs FROM s_2014_07_vereine ORDER by team ASC");

  // CartoDB promises need to be transformed
  var jQueryPromise1 = $.Deferred();

  var jQueryPromise2 = $.Deferred();

  teamDataPromise
    .done(function(data) {
      var teams = data.rows;
      window.teamData = {};
      $.each(teams, function(index, item) {
        window.teamData[item.team.toLowerCase()] = item;
      })
      jQueryPromise1.resolve();
    })
    .error(function(errors) {
      console.log("errors:" + errors);
      jQueryPromise1.reject();
    });

    overallDataPromise
      .done(function(data) {
        window.allData = data.rows;
        jQueryPromise2.resolve();
      })
      .error(function(errors) {
        console.log("errors:" + errors);
        jQueryPromise2.reject();
      });

    $.when(jQueryPromise1, jQueryPromise2).done(function() {
      $(window).trigger('dataLoaded');
    });
}
{% endhighlight %}

As you can see, I specified two SQL calls, one for the season ticket counts of each club in each municipality, and one for general information about each club (such as name, overall tickets sold, stadium capacity), etc. 

The interesting part in this code snippet is that I have to wait for both calls to be done, so I transformed the [promises](http://en.wikipedia.org/wiki/Promise_%28programming%29) given by both calls into jQuery promises, which in turn allow me to specify a callback that should be executed only when both SQL calls have succeeded (line 38). Unfortunately, I didn't know what kind of promises are used by CartoDB, but jQuery was readily available anyway (with Bootstrap). 

Now, what happens exactly whenever a user picks a club? As mentioned above, nothing else than the CartoCSS is changed (for this reason, I needed to store the original CSS: 

{% highlight javascript %}
var updateUi = function() {
  // update carto css
  window.layers[1].getSubLayer(0).setCartoCSS(clubs[window.currentTeam].css);
  // clean ui panel
  // ...
  // update ui panel
  // ...
  }
};
{% endhighlight %}

In this function, the only interesting part is line 3, where I specify the CSS to be applied according to `window.currentTeam`, which is set upon changing the club selector. 

As I said above, the clubs' individual CSS styles are hardcoded into the application, like such:

{% highlight javascript %}
clubs['gcz'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width:
0.5; line-opacity: 1; polygon-fill: #f7941d; } #fussballfans_merge [ dom2_gcz <= 
32.3844125609574] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_gcz <= 
0.789733464955576] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_gcz <= 
0.368822227686255] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_gcz <= 
0.123331597563727] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_gcz <= 
0.0289901288611228] { polygon-opacity: 0.2;} #fussballfans_merge [ dom2_gcz = 0] { 
polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }'
{% endhighlight %}

Which is just the CSS copied from the editor. This might not be the most maintainable and elegant architecture, but did the best job for my use case, as it was, in my opinion, easier than specifying a separate layer for each club in the editor.

### Summary

In this project, CartoDB was a very helpful foundation for our application, not only in terms of its API but also because we could easily style the municipality polygons in the editor. This helped us in deciding what colors to use for the clubs, and in generating the opacity classes with CartoDB's overlay wizards.

<hr />

Check our other [Maps of the Week](http://blog.cartodb.com/tagged/map-of-the-week), and create your free [CartoDB.com](http://cartodb.com/) account to start building your own map-based projects.
