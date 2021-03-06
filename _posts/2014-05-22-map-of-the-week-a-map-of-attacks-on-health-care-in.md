---
title: 'Map of the Week: A Map of Attacks on Health Care in Syria'
date: '2014-05-22T16:29:00+02:00'
tags:
- cartodb
- phrusa
- syria
- nonprofits
categories:
- 'Map of the Week'
redirect_from:
- "/post/86503685434/map-of-the-week-a-map-of-attacks-on-health-care-in/"
---

Physicians for Human Rights (<a href="http://www.twitter.com/P4HR">@P4HR</a>) is an independent organization that uses medicine and science to stop mass atrocities and severe human rights violations. They are supported by the expertise and passion of health professionals and concerned citizens alike. We welcome <a href="http://www.twitter.com/elise__baker">Elise Baker</a> to tell us about how they have created this comprehensive map.

<a href="http://physiciansforhumanrights.org/syria-map"><img src="http://i.imgur.com/wEmrbGR.png"/></a>

Physicians for Human Rights (PHR) released a <a href="http://physiciansforhumanrights.org/syria-map">new interactive map</a> that tracks the systematic attack on health care in Syria. Documenting 150 attacks on 124 separate medical facilities and the deaths of 468 medical personnel since March 2011, PHR’s map presents the most comprehensive data on Syria’s war on the country’s health system. While government forces committed 90 percent of the 150 attacks on facilities, 9 of the 10 total attacks committed by anti-government armed groups have occurred since March 2013. The governorates of Rif Dimashq and Aleppo reported the highest numbers of facility attacks, with 35 each, and Rif Dimashq and Homs governorates reported the highest numbers of medical personnel killed, with 78 and 77 respectively.  Of the 468 medical personnel killed, at least 157 were doctors, followed by 94 nurses, 84 medics, and 45 pharmacists. At least 186 medical workers were specifically targeted for killing through execution, torture, or death in the line of duty.

### The map’s inception

Reports of attacks on hospitals and medical personnel began circulating soon after the protests started in Syria in March 2011. By the end of 2012, reports of attacks became more frequent, but did not receive adequate attention. PHR created this map to convey the magnitude and widespread nature of attacks on medical care in Syria and to promote accountability for these violations of international humanitarian law. PHR chose the CartoDB platform because it allows us to continually update the map in real time; the Dropbox sync feature updates the data and the user platform enables us to seamlessly create new visualizations.

PHR selected an interactive map because it presents viewers with a clear illustration of the systematic nature and geographic spread of attacks. It can also enable humanitarian organizations to understand which areas are hardest hit and deliver aid to those locations.

### Data collection + processing

The data displayed in this map comes from a variety of open sources, including UN, governmental, and nongovernmental organization (NGO) reports; news articles; social media posts; YouTube videos; and photographs. PHR researchers conducted Arabic- and English-language open source searches on the internet and corroborated attacks from medical field sources, specifically Syrian medical personnel working in and around Syria.

Each member of the three-person PHR team independently and collectively reviewed and evaluated every source. Reports of attacks were reviewed for clarity and consistency, and all sources were triangulated and compared against each other to identify inconsistencies that would raise concerns about authenticity or veracity. Once individual sources were deemed credible, the PHR team assessed the combination of sources for each incident to determine whether we had “reasonable belief” that the attack occurred as reported. After reviewing over a thousand open sources and communicating frequently with field sources throughout Syria, Jordan, and Turkey, PHR ultimately corroborated 150 attacks on medical facilities between March 2011 and March 31, 2014 and linked to 200 sources on the map.

While analyzing reports of facility attacks, PHR attempted to confirm the location of each medical facility on <a href="http://wikimapia.org/">Wikimapia</a> and obtain the GPS coordinates. The team was able to locate exact coordinates for 70 of the 150 attacks, and used coordinates for the reported city, town, or neighborhood to map the remaining 80 attacks. These coordinates were loaded into a spreadsheet along with the rest of the data – governorate name, city/town name, attack description, attack date (both written out and in timestamp format), type of facility (public hospital, private hospital, field hospital, clinic, etc.), perpetrator, weapons used, type of attack (discriminate vs. indiscriminate), images, videos, and all other sources. The spreadsheet was then loaded onto CartoDB using the Drobox sync feature and the locations were automatically geocoded.

<img src="http://i.imgur.com/vw4dVA1.jpg" alt=""/>

In addition to attacks on medical facilities, PHR conducted research on medical personnel who have been killed during the war. PHR consulted open source data from the English-language website for the Violations Documentation Center of Syria (VDC), media accounts, and social media networks, and supplemented these sources with information gathered from medical field sources. Reports on medical workers of all professions (including doctors, nurses, medics, pharmacists, ambulance workers, dentists, veterinarians, medical students, dental students, and pharmacy students) were considered. For all medical personnel reported dead , the name of the deceased, medical specialty, date of death, governorate of origin, location of death, cause of death, source of report, and any other notes were recorded. All names and dates of death were compared against each other to eliminate duplication across sources.

PHR stored and sorted the medical personnel data in a spreadsheet, aggregated the total number of deaths for each of the 14 governorates in Syria, and created graphs for each governorate displaying deaths by profession and cause of death. PHR downloaded a shapefile containing the administrative boundaries in Syria from the <a href="http://www.gadm.org/countryhttp:/www.gadm.org/country">Global Administrative Areas</a> dataset and uploaded it to CartoDB (where it was automatically geocoded), along with the governorate-specific personnel data.

### Creating the visuals

PHR used the “cluster” visualization on CartoDB’s user interface to represent attacks on medical personnel. This design allows the viewer to see the most affected areas without cluttering the map with too many points, while still providing detail when zooming in on the map. PHR used special CartoCSS to customize point colors and size, text colors and size, and transparency. The points were loaded in three different layers – showing attacks by government forces, anti-government armed groups, and unknown forces. This allowed each perpetrator to have its own color – blue for government, yellow for anti-government, green for unknown – to allow viewers to easily distinguish between attacks committed by different groups.

<img src="http://i.imgur.com/ASVEre0.png" alt=""/>

Because the cluster visualization does not provide infowindows on the user interface, we created a fourth layer from the “simple” visualization capturing all attacks, made the points entirely transparent, and then loaded all the data into the infowindows on that layer. The infowindows were customized to accommodate the large amount of data we wanted to display for each point – a description of the attack with date and location, embedded images, embedded YouTube videos, links to additional media, and links to our various sources.

<img src="http://i.imgur.com/GYSxWMD.png" alt=""/>

PHR used the choropleth visualization to map the data on medical personnel killed, shading in each governorate’s polygon region according to how many medical workers were killed there. PHR used special CartoCSS to customize colors, outlines, and transparency. Within each governorate, PHR placed a medical worker icon that opens to an infowindow displaying medical personnel data specific to each governorate.

<img src="http://i.imgur.com/sKLaKf8.png" alt=""/>

Once the data was loaded onto CartoDB and the basic visualizations created, PHR worked with designers at Beveridge Seay, Inc. to further customize the map. We loaded our medical personnel visualization onto a Google Maps basemap, and then overlayed our facility attack visualization. We then added a customized title bar (with links to our <a href="https://s3.amazonaws.com/PHR_syria_map/methodology-findings.pdf">methodology</a>, a <a href="http://physiciansforhumanrights.org/library/other/syrias-medical-community-under-assault.html">fact sheet</a> about health care in Syria, and a <a href="http://phrusa.cartodb.com/viz/d60182c6-af8b-11e3-a346-0e73339ffa50/embed_map?title=true&amp;description=true&amp;search=false&amp;shareable=true&amp;cartodb_logo=true&amp;layer_selector=false&amp;legends=false&amp;scrollwheel=true&amp;fullscreen=true&amp;sublayer_options=1%7C1&amp;sql=SELECT%20*%20FROM%20city_locations%20WHERE%20city_name%20IN%20(%27Aleppo%27%2C%27Damascus%27%2C%27Daraa%27%2C%27Deir%20ez%20Zor%27%2C%27Hama%27%2C%27Homs%27%2C%27Idlib%27%2C%27Latakia%27%2C%27Raqqa%27)&amp;sw_lat=32.9798681550055&amp;sw_lon=31.887130737304688&amp;ne_lat=36.91366629380525&amp;ne_lon=42.51091003417969">time lapse</a> visualization of attacks on facilities), as well as an interactive legend (hosting additional graphs).

The time lapse was created solely on CartoDB’s user interface using the “torque” visualization. Because every incident was time stamped, we were able to easily create a torque visualization showing a time-lapsed heat map of attacks on facilities. This visualization is useful in understanding the progress of these attacks over the course of the conflict and the geographic spread of attacks.

CartoDB’s extensive documentation and tutorials, example maps, and staff support were a great asset to us in our mapping project and helped us produce a multi-layered map that can be easily updated, added to, and altered to reflect the ongoing attacks on the health community in Syria.

You can read more <a href="http://physiciansforhumanrights.org/press/press-releases/new-map-shows-government-forces-deliberately-attacking-syrias-medical-system.html">about this map by Physicians for Human Rights in their website</a>.

In CartoDB we are proud that our tool supports this kind of organization to tell stories that matter. Learn more about <a href="http://cartodb.com/industries/non-profits/">how CartoDB can help your organization to visualize data and communicate effectively</a>.

<a href="http://www.cartodb.com/pricing">Signup today for a free trial</a> to start creating visualizations.
